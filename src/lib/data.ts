import Fuse from 'fuse.js';
import { createClient } from '@/lib/supabase/server';
import type { Tables } from '@/lib/types';
import { parseRegistrationEndDate } from './utils';

import { getProvinces } from 'idn-area-data';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Build-safe client for generateStaticParams. This client does not use cookies
// and is safe to use in build-time functions like generateStaticParams.
const buildSafeSupabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type LombaTable = Tables<'lomba'>
type BeasiswaTable = Tables<'beasiswa'>
type MagangTable = Tables<'magang'>

// Map table names to their corresponding data types
export type TableDataMap = {
  lomba: LombaTable;
  beasiswa: BeasiswaTable;
  magang: MagangTable;
};

const ITEMS_PER_PAGE = 12

// --- TEXT UTILITY FUNCTIONS ---

function normalizeText(text: string): string {
  return text.trim().toLowerCase();
}

function splitAndClean(text: string): string[] {
  if (!text) return [];
  const delimiters = [',', ';', '/', '|', '&', ' dan ', ' and ', ' or ', ' atau '];
  let parts = [text];
  for (const delimiter of delimiters) {
    parts = parts.flatMap(part => part.split(delimiter));
  }
  return parts
    .map(part => part.trim())
    .filter(part => part.length > 0)
    .map(part => part.replace(/\b\w/g, l => l.toUpperCase()));
}

interface PriceRange {
  min: number;
  max: number;
}

function parsePrice(priceText: string): PriceRange {
  if (!priceText) return { min: -1, max: -1 };
  
  const text = priceText.toLowerCase().trim();
  
  // Handle free/gratis cases
  if (text.includes('gratis') || text.includes('rp 0')) {
    return { min: 0, max: 0 };
  }
  
  // Extract all numbers from the text
  const numbers = text.match(/\d+(?:\.\d+)?/g);
  if (!numbers || numbers.length === 0) {
    return { min: -1, max: -1 };
  }
  
  // Convert to integers (remove decimal points for Indonesian currency format)
  const parsedNumbers = numbers.map(num => parseInt(num.replace('.', ''), 10));
  
  if (parsedNumbers.length === 1) {
    // Single price
    return { min: parsedNumbers[0], max: parsedNumbers[0] };
  } else if (parsedNumbers.length >= 2) {
    // Price range - take first two numbers
    const [first, second] = parsedNumbers.slice(0, 2);
    return { min: Math.min(first, second), max: Math.max(first, second) };
  }
  
  return { min: -1, max: -1 };
}

function categorizeParticipant(participantText: string): string[] {
  if (!participantText) return ['Lainnya'];
  const text = participantText.toLowerCase();
  const categories: string[] = [];
  if (text.includes('mahasiswa') || text.includes('d3') || text.includes('d4') || text.includes('s1')) {
    categories.push('Mahasiswa');
  }
  if (text.includes('sma') || text.includes('smk')) {
    categories.push('Siswa SMA / Sederajat');
  }
  if (text.includes('smp') || text.includes('mts')) {
    categories.push('Siswa SMP / Sederajat');
  }
  if (text.includes('sd') || text.includes('mi')) {
    categories.push('Siswa SD / Sederajat');
  }
  if (text.includes('umum')) {
    categories.push('Umum');
  }
  if (text.includes('gapyear') || text.includes('gap year')) {
    categories.push('Gapyear');
  }
  return categories.length > 0 ? categories : ['Lainnya'];
}

// --- FILTER CHECKING FUNCTIONS ---

function checkParticipantCategory(participant: string, category: string): boolean {
  if (!participant || !category) return false;
  const participantCategories = categorizeParticipant(participant);
  return participantCategories.includes(category);
}

function checkPriceInRange(priceText: string, range: string): boolean {
  const priceRange = parsePrice(priceText);
  
  // If parsing failed, exclude from results
  if (priceRange.min === -1 || priceRange.max === -1) return false;
  
  switch (range) {
    case 'gratis':
      return priceRange.min === 0 && priceRange.max === 0;
    
    case '1-50000':
      // Include if any part of the price range falls within 1-50000
      return priceRange.min <= 50000 && priceRange.max >= 1;
    
    case '50001-100000':
      // Include if any part of the price range falls within 50001-100000
      return priceRange.min <= 100000 && priceRange.max >= 50001;
    
    case '100001-200000':
      // Include if any part of the price range falls within 100001-200000
      return priceRange.min <= 200000 && priceRange.max >= 100001;
    
    case '>200000':
      // Include if the minimum price is greater than 200000
      return priceRange.min > 200000;
    
    default:
      return false;
  }
}

function checkEducationLevel(educationLevelText: string, targetLevel: string): boolean {
  if (!educationLevelText || !targetLevel) return false;
  const levels = splitAndClean(educationLevelText);
  return levels.some(level => 
    level.toLowerCase().includes(targetLevel.toLowerCase()) ||
    targetLevel.toLowerCase().includes(level.toLowerCase())
  );
}

function checkLocation(locationText: string, targetLocation: string): boolean {
  if (!locationText || !targetLocation) return false;
  const locations = splitAndClean(locationText);
  return locations.some(location => 
    location.toLowerCase().includes(targetLocation.toLowerCase()) ||
    targetLocation.toLowerCase().includes(location.toLowerCase())
  );
}

function checkField(fieldText: string, targetField: string): boolean {
  if (!fieldText || !targetField) return false;
  const fields = splitAndClean(fieldText);
  return fields.some(field => 
    field.toLowerCase().includes(targetField.toLowerCase()) ||
    targetField.toLowerCase().includes(field.toLowerCase())
  );
}

// --- LOMBA (COMPETITIONS) DATA FETCHING ---

export async function getCompetitionsTotalPages(
  query: string,
  participantCategory?: string,
  priceRange?: string
) {
  
  const supabase = buildSafeSupabase;

  try {
    const { data, error } = await supabase
      .from('lomba')
      .select('participant, price_text, date_text, title, organizer, description');

    if (error) {
      console.error('Database Error fetching total pages:', error);
      throw new Error('Failed to fetch total pages for competitions.');
    }

    if (!data) return 0;

    // Apply filters
    let filteredData = data.filter(item => {
      const participantMatch = participantCategory ? 
        checkParticipantCategory(item.participant || '', participantCategory) : true;
      const priceMatch = priceRange ? 
        checkPriceInRange(item.price_text || '', priceRange) : true;
      const endDate = parseRegistrationEndDate(item.date_text);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateMatch = endDate && endDate >= today;
      
      return participantMatch && priceMatch && dateMatch;
    });

    // Apply fuzzy search if query exists
    if (query) {
      const fuse = new Fuse(filteredData, {
        keys: [
          { name: 'title', weight: 0.6 },
          { name: 'organizer', weight: 0.3 },
          { name: 'description', weight: 0.1 },
        ],
        threshold: 0.4,
      });
      filteredData = fuse.search(query).map(result => result.item);
    }

    return Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Error in getCompetitionsTotalPages:', error);
    throw new Error('Failed to fetch total pages for competitions.');
  }
}

export async function getCompetitionsTotalCount(
  query: string,
  participantCategory?: string,
  priceRange?: string
) {
  
  const supabase = buildSafeSupabase;

  try {
    const { data, error } = await supabase
      .from('lomba')
      .select('participant, price_text, date_text, title, organizer, description');

    if (error) {
      console.error('Database Error fetching total count:', error);
      throw new Error('Failed to fetch total count for competitions.');
    }

    if (!data) return 0;

    // Apply filters
    let filteredData = data.filter(item => {
      const participantMatch = participantCategory ? 
        checkParticipantCategory(item.participant || '', participantCategory) : true;
      const priceMatch = priceRange ? 
        checkPriceInRange(item.price_text || '', priceRange) : true;
      const endDate = parseRegistrationEndDate(item.date_text);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateMatch = endDate && endDate >= today;
      
      return participantMatch && priceMatch && dateMatch;
    });

    // Apply fuzzy search if query exists
    if (query) {
      const fuse = new Fuse(filteredData, {
        keys: [
          { name: 'title', weight: 0.6 },
          { name: 'organizer', weight: 0.3 },
          { name: 'description', weight: 0.1 },
        ],
        threshold: 0.4,
      });
      filteredData = fuse.search(query).map(result => result.item);
    }

    return filteredData.length;
  } catch (error) {
    console.error('Error in getCompetitionsTotalCount:', error);
    throw new Error('Failed to fetch total count for competitions.');
  }
}

export async function getCompetitions(
  query: string,
  currentPage: number,
  participantCategory?: string,
  priceRange?: string
) {
  
  const supabase = buildSafeSupabase;

  try {
    const { data, error } = await supabase.from('lomba').select('*');

    if (error) {
      console.error('Database Error fetching competitions:', error);
      throw new Error('Failed to fetch competitions.');
    }

    if (!data) return [];

    // Apply filters
    let filteredData = data.filter(item => {
      const participantMatch = participantCategory ? 
        checkParticipantCategory(item.participant || '', participantCategory) : true;
      const priceMatch = priceRange ? 
        checkPriceInRange(item.price_text || '', priceRange) : true;
      
      return participantMatch && priceMatch;
    });

    // Apply fuzzy search if query exists
    if (query) {
      const fuse = new Fuse(filteredData, {
        keys: [
          { name: 'title', weight: 0.6 },
          { name: 'organizer', weight: 0.3 },
          { name: 'description', weight: 0.1 },
        ],
        includeScore: true,
        threshold: 0.4,
      });
      filteredData = fuse.search(query).map(result => result.item);
    }

    // Process, sort by date, and paginate
    const processedData = filteredData
      .map(item => ({
        ...item,
        registrationEndDate: parseRegistrationEndDate(item.date_text),
      }))
      .filter(item => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return item.registrationEndDate && item.registrationEndDate >= today;
      })
      .sort((a, b) => {
        if (query) return 0; // Rely on Fuse.js score order if searching
        return a.registrationEndDate!.getTime() - b.registrationEndDate!.getTime();
      });

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedData.slice(offset, offset + ITEMS_PER_PAGE);

  } catch (error) {
    console.error('Error in getCompetitions:', error);
    throw new Error('Failed to fetch competitions.');
  }
}

export async function getCompetitionBySlug(slug: string) {
  
  const supabase = buildSafeSupabase;
  try {
    const { data, error } = await supabase
      .from('lomba')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      return null;
    }

    return data as TableDataMap['lomba'];
  } catch (error) {
    console.error('Error in getCompetitionBySlug:', error);
    throw new Error('Failed to fetch competition.');
  }
}

export async function getCompetitionById(id: string) {
  
  const supabase = buildSafeSupabase;
  try {
    const { data, error } = await supabase
      .from('lomba')
      .select(`*`)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Database Error fetching competition by ID:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Database Error fetching competition by ID:', error)
    return null
  }
}

// --- BEASISWA DATA FETCHING ---

export async function getBeasiswaTotalPages(
  query: string,
  education?: string,
  location?: string
) {
  
  const supabase = buildSafeSupabase;

  try {
    const { data, error } = await supabase
      .from('beasiswa')
      .select('title, organizer, description, education_level, location, deadline_date');

    if (error) {
      console.error('Database Error fetching total pages for beasiswa:', error);
      throw new Error('Failed to fetch total pages for beasiswa.');
    }

    if (!data) return 0;

    let filteredData = data.filter(item => {
      const educationMatch = education ? 
        checkEducationLevel(item.education_level || '', education) : true;
      const locationMatch = location ? 
        checkLocation(item.location || '', location) : true;
      const deadline = new Date(item.deadline_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateMatch = !isNaN(deadline.getTime()) && deadline >= today;
      
      return educationMatch && locationMatch && dateMatch;
    });

    if (query) {
      const fuse = new Fuse(filteredData, {
        keys: [
          { name: 'title', weight: 0.6 },
          { name: 'organizer', weight: 0.3 },
          { name: 'description', weight: 0.1 },
        ],
        threshold: 0.4,
      });
      filteredData = fuse.search(query).map(result => result.item);
    }

    return Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Error in getBeasiswaTotalPages:', error);
    throw new Error('Failed to fetch total pages for beasiswa.');
  }
}

export async function getBeasiswaTotalCount(
  query: string,
  education?: string,
  location?: string
) {
  
  const supabase = buildSafeSupabase;

  try {
    const { data, error } = await supabase
      .from('beasiswa')
      .select('title, organizer, description, education_level, location, deadline_date');

    if (error) {
      console.error('Database Error fetching total count for beasiswa:', error);
      throw new Error('Failed to fetch total count for beasiswa.');
    }

    if (!data) return 0;

    let filteredData = data.filter(item => {
      const educationMatch = education ? 
        checkEducationLevel(item.education_level || '', education) : true;
      const locationMatch = location ? 
        checkLocation(item.location || '', location) : true;
      const deadline = new Date(item.deadline_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateMatch = !isNaN(deadline.getTime()) && deadline >= today;
      
      return educationMatch && locationMatch && dateMatch;
    });

    if (query) {
      const fuse = new Fuse(filteredData, {
        keys: [
          { name: 'title', weight: 0.6 },
          { name: 'organizer', weight: 0.3 },
          { name: 'description', weight: 0.1 },
        ],
        threshold: 0.4,
      });
      filteredData = fuse.search(query).map(result => result.item);
    }

    return filteredData.length;
  } catch (error) {
    console.error('Error in getBeasiswaTotalCount:', error);
    throw new Error('Failed to fetch total count for beasiswa.');
  }
}

export async function getBeasiswa(
  query: string,
  currentPage: number,
  education?: string,
  location?: string
) {
  
  const supabase = buildSafeSupabase;

  try {
    const { data, error } = await supabase
      .from('beasiswa')
      .select('id,created_at,title,education_level,location,deadline_date,source_url,organizer,description,image_url,slug,booklet_url');

    if (error) {
      console.error('Database Error fetching beasiswa:', error);
      throw new Error('Failed to fetch beasiswa.');
    }

    if (!data) return [];

    let filteredData = data.filter(item => {
      const educationMatch = education ? 
        checkEducationLevel(item.education_level || '', education) : true;
      const locationMatch = location ? 
        checkLocation(item.location || '', location) : true;
      return educationMatch && locationMatch;
    });

    if (query) {
      const fuse = new Fuse(filteredData, {
        keys: [
          { name: 'title', weight: 0.6 },
          { name: 'organizer', weight: 0.3 },
          { name: 'description', weight: 0.1 },
        ],
        threshold: 0.4,
      });
      filteredData = fuse.search(query).map(result => result.item);
    }

    const processedData = filteredData
      .map(item => ({
        ...item,
        deadlineDate: new Date(item.deadline_date),
      }))
      .filter(item => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return !isNaN(item.deadlineDate.getTime()) && item.deadlineDate >= today;
      })
      .sort((a, b) => {
        if (query) return 0; // Rely on Fuse.js score order if searching
        return a.deadlineDate.getTime() - b.deadlineDate.getTime();
      });

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedData.slice(offset, offset + ITEMS_PER_PAGE);

  } catch (error) {
    console.error('Error in getBeasiswa:', error);
    throw new Error('Failed to fetch beasiswa.');
  }
}

export async function getBeasiswaBySlug(slug: string) {
  
  const supabase = buildSafeSupabase;
  try {
    const { data, error } = await supabase
      .from('beasiswa')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      return null;
    }

    return data as TableDataMap['beasiswa'];
  } catch (error) {
    console.error('Error in getBeasiswaBySlug:', error);
    throw new Error('Failed to fetch beasiswa.');
  }
}

export async function getBeasiswaLocations() {
  
  const supabase = buildSafeSupabase;
  try {
    const { data, error } = await supabase.from('beasiswa').select('location');
    if (error) {
      console.error('Database Error fetching beasiswa locations:', error);
      throw new Error('Failed to fetch beasiswa locations.');
    }
    if (!data) return [];

    const locations = data.map(item => item.location).filter(Boolean) as string[];
    return [...new Set(locations)].sort();

  } catch (error) {
    console.error('Error in getBeasiswaLocations:', error);
    throw new Error('Failed to fetch beasiswa locations.');
  }
}

export async function getLombaParticipantCategories(): Promise<string[]> {
  
  const supabase = buildSafeSupabase;
  try {
    const { data, error } = await supabase.from('lomba').select('participant');
    if (error) {
      console.error('Database Error fetching participant categories:', error);
      throw new Error('Failed to fetch participant categories.');
    }
    if (!data) return [];

    const categoriesSet = new Set<string>();
    data.forEach(item => {
      if (item.participant) {
        const categories = categorizeParticipant(item.participant);
        categories.forEach(cat => categoriesSet.add(cat));
      }
    });

    return Array.from(categoriesSet).sort();
  } catch (error) {
    console.error('Error in getLombaParticipantCategories:', error);
    throw new Error('Failed to fetch participant categories.');
  }
}

export async function getLombaPriceRanges(): Promise<{ key: string; label: string }[]> {
  // 
  // const supabase = buildSafeSupabase;
  // try {
  //   const { data, error } = await supabase.from('lomba').select('price_text');
  //   if (error) {
  //     console.error('Database Error fetching price ranges:', error);
  //     throw new Error('Failed to fetch price ranges.');
  //   }
  //   if (!data) return [];

  //   const priceRangesSet = new Set<string>();
  //   data.forEach(item => {
  //     if (item.price_text) {
  //       const price = parsePrice(item.price_text);
  //       if (price.min === 0 || price.max === 0) priceRangesSet.add('Gratis');
  //       else if (price.min > 0 && price.max <= 50000) priceRangesSet.add('Rp 1 - Rp 50.000');
  //       else if (price.min > 50000 && price.max <= 100000) priceRangesSet.add('Rp 50.001 - Rp 100.000');
  //       else if (price.min > 100000 && price.max <= 200000) priceRangesSet.add('Rp 100.001 - Rp 200.000');
  //       else if (price.min > 200000) priceRangesSet.add('> Rp 200.000');
  //     }
  //   });

  //   const priceRangeMap: { [key: string]: string } = {
  //     'Gratis': 'gratis',
  //     'Rp 1 - Rp 50.000': '1-50000',
  //     'Rp 50.001 - Rp 100.000': '50001-100000',
  //     'Rp 100.001 - Rp 200.000': '100001-200000',
  //     '> Rp 200.000': '>200000',
  //   };

  //   return Array.from(priceRangesSet).map(label => ({
  //     key: priceRangeMap[label],
  //     label: label,
  //   })).sort((a, b) => {
  //     if (a.label === 'Gratis') return -1;
  //     if (b.label === 'Gratis') return 1;
  //     return a.label.localeCompare(b.label);
  //   });

  // } catch (error) {
  //   console.error('Error in getLombaPriceRanges:', error);
  //   throw new Error('Failed to fetch price ranges.');
  // }

  return [
    {
      key: "gratis",
      label: "Gratis",
    },
    {
      key: "1-50000",
      label: "Rp 1 - Rp 50.000",
    },
    {
      key: "50001-100000",
      label: "Rp 50.001 - Rp 100.000",
    },
    {
      key: "100001-200000",
      label: "Rp 100.001 - Rp 200.000",
    },
    {
      key: ">200000",
      label: "> Rp 200.000",
    },
  ];
}

export async function getBeasiswaEducationLevels() {
  
  const supabase = buildSafeSupabase;
  
  try {
    const { data, error } = await supabase
      .from('beasiswa')
      .select('education_level')
      .not('education_level', 'is', null);
    
    if (error) throw error;
    
    const educationLevelsSet = new Set<string>();
    
    data?.forEach(item => {
      if (item.education_level) {
        const levels = splitAndClean(item.education_level);
        levels.forEach(level => educationLevelsSet.add(level));
      }
    });
    
    return Array.from(educationLevelsSet).sort();
  } catch (error) {
    console.error('Error fetching beasiswa education levels:', error);
    // Fallback to hardcoded options
    return [
      'S1', 'S2', 'S3', 'D3', 'D4', 'SMA', 'SMP', 'Gap Year', 'Non-Degree'
    ];
  }
}

// --- MAGANG DATA FETCHING ---

export async function getMagangTotalPages(
  query: string,
  field?: string,
  location?: string
) {
  
  const supabase = buildSafeSupabase;

  try {
    const { data, error } = await supabase
      .from('magang')
      .select('intern_position, company, description, field, location, created_at');

    if (error) {
      console.error('Database Error fetching total pages for magang:', error);
      throw new Error('Failed to fetch total pages for magang.');
    }

    if (!data) return 0;

    let filteredData = data.filter(item => {
      const fieldMatch = field ? 
        checkField(item.field || '', field) : true;
      const locationMatch = location ? 
        checkLocation(item.location || '', location) : true;
      
      return fieldMatch && locationMatch;
    });

    if (query) {
      const fuse = new Fuse(filteredData, {
        keys: [
          { name: 'intern_position', weight: 0.5 },
          { name: 'company', weight: 0.3 },
          { name: 'description', weight: 0.2 },
        ],
        threshold: 0.4,
      });
      filteredData = fuse.search(query).map(result => result.item);
    }

    return Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Error in getMagangTotalPages:', error);
    throw new Error('Failed to fetch total pages for magang.');
  }
}

export async function getMagangTotalCount(
  query: string,
  field?: string,
  location?: string
) {
  
  const supabase = buildSafeSupabase;

  try {
    const { data, error } = await supabase
      .from('magang')
      .select('intern_position, company, description, field, location, created_at');

    if (error) {
      console.error('Database Error fetching total count for magang:', error);
      throw new Error('Failed to fetch total count for magang.');
    }

    if (!data) return 0;

    let filteredData = data.filter(item => {
      const fieldMatch = field ? 
        checkField(item.field || '', field) : true;
      const locationMatch = location ? 
        checkLocation(item.location || '', location) : true;
      
      return fieldMatch && locationMatch;
    });

    if (query) {
      const fuse = new Fuse(filteredData, {
        keys: [
          { name: 'intern_position', weight: 0.5 },
          { name: 'company', weight: 0.3 },
          { name: 'description', weight: 0.2 },
        ],
        threshold: 0.4,
      });
      filteredData = fuse.search(query).map(result => result.item);
    }

    return filteredData.length;
  } catch (error) {
    console.error('Error in getMagangTotalCount:', error);
    throw new Error('Failed to fetch total count for magang.');
  }
}

export async function getMagang(
  query: string,
  currentPage: number,
  field?: string,
  location?: string
) {
  
  const supabase = buildSafeSupabase;

  try {
    const { data, error } = await supabase.from('magang').select('*');

    if (error) {
      console.error('Database Error fetching magang:', error);
      throw new Error('Failed to fetch magang.');
    }

    if (!data) return [];

    let filteredData = data.filter(item => {
      const fieldMatch = field ? 
        checkField(item.field || '', field) : true;
      const locationMatch = location ? 
        checkLocation(item.location || '', location) : true;
      
      return fieldMatch && locationMatch;
    });

    if (query) {
      const fuse = new Fuse(filteredData, {
        keys: [
          { name: 'intern_position', weight: 0.5 },
          { name: 'company', weight: 0.3 },
          { name: 'description', weight: 0.2 },
        ],
        threshold: 0.4,
      });
      filteredData = fuse.search(query).map(result => result.item);
    }

    const processedData = filteredData
      .sort((a, b) => {
        if (query) return 0; // Rely on Fuse.js score order if searching
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedData.slice(offset, offset + ITEMS_PER_PAGE);

  } catch (error) {
    console.error('Error in getMagang:', error);
    throw new Error('Failed to fetch magang.');
  }
}

export async function getMagangBySlug(slug: string) {
  
  const supabase = buildSafeSupabase;
  try {
    const { data, error } = await supabase
      .from('magang')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      return null;
    }

    return data as TableDataMap['magang'];
  } catch (error) {
    console.error('Error in getMagangBySlug:', error);
    throw new Error('Failed to fetch magang.');
  }
}

export async function getMagangFields() {
  
  const supabase = buildSafeSupabase;
  try {
    const { data, error } = await supabase.from('magang').select('field');
    if (error) {
      console.error('Database Error fetching magang fields:', error);
      throw new Error('Failed to fetch magang fields.');
    }
    if (!data) return [];

    const fields = data.map(item => item.field).filter(Boolean) as string[];
    return [...new Set(fields)].sort();

  } catch (error) {
    console.error('Error in getMagangFields:', error);
    throw new Error('Failed to fetch magang fields.');
  }
}

export async function getMagangLocations() {
  
  const supabase = buildSafeSupabase;
  
  try {
    // Fetch locations from database
    const { data, error } = await supabase.from('magang').select('location');
    if (error) {
      console.error('Database Error fetching magang locations:', error);
      throw new Error('Failed to fetch magang locations.');
    }
    if (!data) return [];

    // Get unique locations from database
    const locations = data.map(item => item.location).filter(Boolean) as string[];
    const uniqueLocations = [...new Set(locations)];

    // Get all provinces from the package
    const provinces = await getProvinces();

    // Filter provinces that match the locations in database
    const matchingProvinces = provinces.filter(province => {
      return uniqueLocations.some(location => 
        location.toUpperCase().includes(province.name.toUpperCase()) ||
        province.name.toUpperCase().includes(location.toUpperCase())
      );
    });

    // Return sorted province names
    return matchingProvinces.map(province => province.name).sort();

  } catch (error) {
    console.error('Error in getMagangLocations:', error);
    throw new Error('Failed to fetch magang locations.');
  }
}

// --- GENERIC DATA FETCHING ---

// Function overloads for type safety
export async function getDataBySlug(table: 'lomba', slug: string): Promise<LombaTable | null>
export async function getDataBySlug(table: 'beasiswa', slug: string): Promise<BeasiswaTable | null>
export async function getDataBySlug(table: 'magang', slug: string): Promise<MagangTable | null>
export async function getDataBySlug(
  table: 'lomba' | 'beasiswa' | 'magang', 
  slug: string
): Promise<LombaTable | BeasiswaTable | MagangTable | null> {
  
  const supabase = buildSafeSupabase;
  try {
    let selectQuery = '*';
    switch (table) {
      case 'lomba':
        selectQuery = 'id,created_at,title,organizer,participant,location,date_text,price_text,source_url,poster_url,slug,description,registration_url';
        break;
      case 'beasiswa':
        selectQuery = 'id,created_at,title,education_level,location,deadline_date,source_url,organizer,description,image_url,slug,booklet_url';
        break;
      case 'magang':
        selectQuery = 'id,created_at,title,company_name,location,duration,source_url,description,logo_image_url,slug,field';
        break;
    }

    const { data, error } = await supabase
      .from(table)
      .select(selectQuery)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Database Error fetching data by slug:', error);
      return null;
    }

    return data as unknown as LombaTable | BeasiswaTable | MagangTable | null;
  } catch (error) {
    console.error('Error in getDataBySlug:', error)
    return null
  }
}

// --- SLUGS ---
export async function getAllLombaSlugs(): Promise<{ slug: string }[]> {
  const { data, error } = await buildSafeSupabase.from('lomba').select('slug');
  if (error) {
    console.error('Error fetching lomba slugs:', error);
    return [];
  }
  return data || [];
}

export async function getAllBeasiswaSlugs(): Promise<{ slug: string }[]> {
  const { data, error } = await buildSafeSupabase.from('beasiswa').select('slug');
  if (error) {
    console.error('Error fetching beasiswa slugs:', error);
    return [];
  }
  return data || [];
}

export async function getAllMagangSlugs(): Promise<{ slug: string }[]> {
  const { data, error } = await buildSafeSupabase.from('magang').select('slug');
  if (error) {
    console.error('Error fetching magang slugs:', error);
    return [];
  }
  return data || [];
}