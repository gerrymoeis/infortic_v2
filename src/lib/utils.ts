import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDaysLeft(deadline: string | null): number | null {
  if (!deadline) return null;

  const deadlineDate = new Date(deadline);
  const now = new Date();

  // Set time to 0 to compare dates only
  deadlineDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  if (isNaN(deadlineDate.getTime())) {
    return null; // Invalid date format
  }

  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays < 0 ? -1 : diffDays; // return -1 if expired
}

export function formatDate(date: string | null) {
  if (!date) {
    return 'Tanggal tidak tersedia';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return 'Tanggal tidak valid';
  }
  return parsedDate.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getDaysUntilDeadline(deadline: string) {
  const today = new Date()
  
  // Reset time to start of day for both dates to ensure accurate day calculation
  today.setHours(0, 0, 0, 0)
  
  // Parse the deadline date properly
  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(0, 0, 0, 0)
  
  // Calculate the difference in days
  const diffTime = deadlineDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}

export function parseRegistrationEndDate(dateText: string): Date | null {
  if (!dateText) return null;

  const monthMap: { [key: string]: number } = {
    'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'mei': 4, 'jun': 5, 'jul': 6, 
    'agu': 7, 'sep': 8, 'okt': 9, 'nov': 10, 'des': 11
  };

  try {
    const parts = dateText.split(' - ');
    const endDateStr = parts.length > 1 ? parts[1] : parts[0];
    const dateParts = endDateStr.trim().split(' ');

    if (dateParts.length < 3) return null; 

    const day = parseInt(dateParts[0], 10);
    const monthKey = dateParts[1].toLowerCase().substring(0, 3);
    const month = monthMap[monthKey];
    const year = parseInt(dateParts[2], 10);

    if (isNaN(day) || month === undefined || isNaN(year)) return null;

    return new Date(year, month, day);
  } catch (error) {
    console.error(`Failed to parse date: ${dateText}`, error);
    return null;
  }
}

// --- Smart Filter Logic ---

// 1. Participant Filter
export const participantCategories = [
  'Mahasiswa',
  'Siswa SMA / Sederajat',
  'Siswa SMP / Sederajat',
  'Siswa SD / Sederajat',
  'Umum',
  'Gapyear',
  'Lainnya'
];

export function checkParticipantCategory(participant: string, category: string): boolean {
  if (!participant || !category) return false;

  const p = participant.toLowerCase();
  const c = category.toLowerCase();

  if (c === 'mahasiswa') {
    return p.includes('mahasiswa') || p.includes('d3') || p.includes('d4') || p.includes('s1');
  }
  if (c === 'siswa sma / sederajat') {
    return p.includes('sma') || p.includes('smk');
  }
  if (c === 'siswa smp / sederajat') {
    return p.includes('smp') || p.includes('mts');
  }
  if (c === 'siswa sd / sederajat') {
    return p.includes('sd') || p.includes('mi');
  }
  if (c === 'umum') {
    return p.includes('umum');
  }
  if (c === 'gapyear') {
    return p.includes('gapyear');
  }
  if (c === 'lainnya') {
    const allKeywords = ['mahasiswa', 'd3', 'd4', 's1', 'sma', 'smk', 'smp', 'mts', 'sd', 'mi', 'umum', 'gapyear'];
    return !allKeywords.some(keyword => p.includes(keyword));
  }
  return false;
}

// 2. Price Filter
export const priceRanges = {
  'gratis': 'Gratis',
  '1-50000': 'Rp 1 - Rp 50.000',
  '50001-100000': 'Rp 50.001 - Rp 100.000',
  '100001-200000': 'Rp 100.001 - Rp 200.000',
  '>200000': '> Rp 200.000'
};

function parsePrice(priceText: string): number {
  if (!priceText) return -1; // -1 indicates not specified or not parseable
  const text = priceText.toLowerCase();
  if (text.includes('gratis') || text === '0') return 0;
  
  const numericString = text.replace(/[^\d]/g, '');
  if (numericString) {
    return parseInt(numericString, 10);
  }
  return -1;
}

// --- Beasiswa Filter Options ---
export const educationLevels = [
  'S1',
  'S2',
  'S3',
  'D3',
  'D4',
  'SMA',
  'SMP',
  'Gap Year',
  'Non-Degree',
];

export const scholarshipLocations = [
  'Dalam Negeri',
  'Luar Negeri',
  'Online',
];

export function checkPriceInRange(priceText: string, range: string): boolean {
  const price = parsePrice(priceText);
  if (price === -1) return false; // Don't match items with unparseable prices

  switch (range) {
    case 'gratis':
      return price === 0;
    case '1-50000':
      return price > 0 && price <= 50000;
    case '50001-100000':
      return price > 50000 && price <= 100000;
    case '100001-200000':
      return price > 100000 && price <= 200000;
    case '>200000':
      return price > 200000;
    default:
      return false;
  }
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
