import { Database } from './database'

// Base row types
type CompetitionRow = Database['public']['Tables']['competitions']['Row']
type InternshipRow = Database['public']['Tables']['internships']['Row']
type CategoryRow = Database['public']['Tables']['categories']['Row']
type SourceRow = Database['public']['Tables']['sources']['Row']

// Extended Competition type
export type CompetitionCategory = {
  categories: Pick<CategoryRow, 'name' | 'slug'> | null
}

export interface Competition extends CompetitionRow {
  sources: Pick<SourceRow, 'name'> | null
  competition_categories: CompetitionCategory[]
  source_platform: string // Manually added for compatibility
  prize_pool?: string | null
}

// Extended Internship type
export interface Internship extends InternshipRow {
    sources: Pick<SourceRow, 'name'> | null;
    source_platform: string; // Manually added for compatibility
    deadline: string;
    image_url?: string | null;
    source_url: string;
}

export type CompetitionFilter = {
  category?: string[];
  source_platform?: string;
  month?: number;
  year?: number;
  deadline?: {
    start?: Date;
    end?: Date;
  };
};
