import Fuse from 'fuse.js';
import { createClient } from '@/lib/supabase/server';
import { unstable_noStore as noStore } from 'next/cache';
import type { Database, Tables } from '@/lib/types';
import { checkParticipantCategory, checkPriceInRange, parseRegistrationEndDate } from './utils';

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

export async function getCompetitionsTotalPages(
  query: string,
  participantCategory?: string,
  priceRange?: string
) {
  noStore();
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('lomba').select('participant, price_text, date_text, title, organizer, description');

    if (error) {
      console.error('Database Error fetching total pages:', error);
      throw new Error('Failed to fetch total pages for competitions.');
    }

    if (!data) return 0;



    // 1. Pre-filter by category first
    let filteredData = data.filter(item => {
      const participantMatch = participantCategory ? checkParticipantCategory(item.participant || '', participantCategory) : true;
      const priceMatch = priceRange ? checkPriceInRange(item.price_text || '', priceRange) : true;
      const endDate = parseRegistrationEndDate(item.date_text);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateMatch = endDate && endDate >= today;
      return participantMatch && priceMatch && dateMatch;
    });



    // 2. Apply fuzzy search if query exists
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
  noStore();
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('lomba').select('participant, price_text, date_text, title, organizer, description');

    if (error) {
      console.error('Database Error fetching total count:', error);
      throw new Error('Failed to fetch total count for competitions.');
    }

    if (!data) return 0;

    // 1. Pre-filter by category first
    let filteredData = data.filter(item => {
      const participantMatch = participantCategory ? checkParticipantCategory(item.participant || '', participantCategory) : true;
      const priceMatch = priceRange ? checkPriceInRange(item.price_text || '', priceRange) : true;
      const endDate = parseRegistrationEndDate(item.date_text);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateMatch = endDate && endDate >= today;
      return participantMatch && priceMatch && dateMatch;
    });

    // 2. Apply fuzzy search if query exists
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
  noStore();
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('lomba').select('*');

    if (error) {
      console.error('Database Error fetching competitions:', error);
      throw new Error('Failed to fetch competitions.');
    }

    if (!data) return [];



    // 1. Pre-filter by category first
    let filteredData = data.filter(item => {
      const participantMatch = participantCategory ? checkParticipantCategory(item.participant || '', participantCategory) : true;
      const priceMatch = priceRange ? checkPriceInRange(item.price_text || '', priceRange) : true;
      return participantMatch && priceMatch;
    });



    // 2. Apply fuzzy search if query exists
    if (query) {
      const fuse = new Fuse(filteredData, {
        keys: [
          { name: 'title', weight: 0.6 },
          { name: 'organizer', weight: 0.3 },
          { name: 'description', weight: 0.1 },
        ],
        includeScore: true,
        threshold: 0.4, // Adjust threshold for more/less strict matching
      });
      filteredData = fuse.search(query).map(result => result.item);
    }

    // 3. Process, sort by date, and paginate
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




// --- BEASISWA DATA FETCHING ---

export async function getBeasiswaTotalPages(
  query: string,
  education?: string,
  location?: string
) {
  noStore();
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('beasiswa').select('title, organizer, description, education_level, location, deadline_date');

    if (error) {
      console.error('Database Error fetching total pages for beasiswa:', error);
      throw new Error('Failed to fetch total pages for beasiswa.');
    }

    if (!data) return 0;

    let filteredData = data.filter(item => {
      const educationMatch = education ? item.education_level.includes(education) : true;
      const locationMatch = location ? item.location.includes(location) : true;
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

export async function getBeasiswaBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('beasiswa')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching beasiswa by slug:', error);
    return null;
  }

  return data;
}

export async function getBeasiswaTotalCount(
  query: string,
  education?: string,
  location?: string
) {
  noStore();
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('beasiswa').select('title, organizer, description, education_level, location, deadline_date');

    if (error) {
      console.error('Database Error fetching total count for beasiswa:', error);
      throw new Error('Failed to fetch total count for beasiswa.');
    }

    if (!data) return 0;

    let filteredData = data.filter(item => {
      const educationMatch = education ? item.education_level.includes(education) : true;
      const locationMatch = location ? item.location.includes(location) : true;
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
  noStore();
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('beasiswa').select('id,created_at,title,education_level,location,deadline_date,source_url,organizer,description,image_url,slug,booklet_url');

    if (error) {
      console.error('Database Error fetching beasiswa:', error);
      throw new Error('Failed to fetch beasiswa.');
    }

    if (!data) return [];

    let filteredData = data.filter(item => {
      const educationMatch = education ? item.education_level.includes(education) : true;
      const locationMatch = location ? item.location.includes(location) : true;
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
      .sort((a, b) => a.deadlineDate.getTime() - b.deadlineDate.getTime());

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedData.slice(offset, offset + ITEMS_PER_PAGE);

  } catch (error) {
    console.error('Error in getBeasiswa:', error);
    throw new Error('Failed to fetch beasiswa.');
  }
}

export async function getCompetitionBySlug(slug: string) {
  noStore();
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('lomba')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      // This is expected if a slug doesn't exist, so we don't log it as a server error.
      return null;
    }

    return data as TableDataMap['lomba'];
  } catch (error) {
    console.error('Error in getCompetitionBySlug:', error);
    throw new Error('Failed to fetch competition.');
  }
}

export async function getCompetitionById(id: string) {
  noStore()
  const supabase = createClient()
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
    console.error('Error in getCompetitionById:', error)
    return null
  }
}

// Function overloads for type safety
export async function getDataBySlug(table: 'lomba', slug: string): Promise<LombaTable | null>
export async function getDataBySlug(table: 'beasiswa', slug: string): Promise<BeasiswaTable | null>
export async function getDataBySlug(table: 'magang', slug: string): Promise<MagangTable | null>
export async function getDataBySlug(
  table: 'lomba' | 'beasiswa' | 'magang', 
  slug: string
): Promise<LombaTable | BeasiswaTable | MagangTable | null> {
  noStore()
  const supabase = createClient()
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
      console.error('Database Error fetching competition by slug:', error);
      return null;
    }

    return data as unknown as LombaTable | BeasiswaTable | MagangTable | null;
  } catch (error) {
    console.error('Error in getSlug:', error)
    return null
  }
}