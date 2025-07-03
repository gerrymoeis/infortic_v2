import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from '@/lib/supabase/server'
 
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