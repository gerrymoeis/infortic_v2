import { Database } from './database'

// Base types from database schema
type CompetitionRow = Database['public']['Tables']['competitions']['Row']
type InternshipRow = Database['public']['Tables']['internships']['Row']
type ScholarshipRow = Database['public']['Tables']['scholarships']['Row']
type BootcampRow = Database['public']['Tables']['bootcamps']['Row']
type CategoryRow = Database['public']['Tables']['categories']['Row']

// Enriched types for frontend usage
export type Category = CategoryRow

export type Competition = {
  id: string
  created_at: string
  updated_at: string | null
  title: string
  description: string | null
  deadline: string
  organizer: string
  prize_pool: string | null
  poster_url: string | null
  website_url: string | null
  source_id: string | null
  categories: { name: string; slug: string }[]
  source_platform: string
}

export type Internship = {
  id: string
  created_at: string
  updated_at: string | null
  title: string
  company_name: string
  location: string | null
  is_paid: boolean | null
  application_url: string | null
  description: string | null
  // Mapped properties
  deadline: string
  image_url: string | null
  source_platform: string
  source_url: string | null
}

// This is the type returned by getScholarshipById
export type Scholarship = ScholarshipRow & {
  deadline?: string | null
  website_url?: string | null
}

export type Bootcamp = BootcampRow & {
  // Add any specific frontend fields if needed
}
