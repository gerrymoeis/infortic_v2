export type Json = 
  | string 
  | number 
  | boolean 
  | null 
  | { [key: string]: Json | undefined } 
  | Json[]

export type Beasiswa = {
  id: number;
  created_at: string;
  title: string;
  description: string | null;
  deadline_date: string;
  education_level: string;
  location: string;
  image_url: string | null;
  source_url: string | null;
  booklet_url: string | null;
  organizer: string | null;
  slug: string;
};

export type Magang = {
  id: number;
  created_at: string;
  intern_position: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string;
  criteria: string;
  learning_outcome: string;
  company_location: string;
  detail_page_url: string;
  company_page_url: string | null;
  field: string | null;
  logo_image_url: string | null;
  slug: string;
  contact_email: string | null;
};

export type Database = {
  public: {
    Tables: {
      beasiswa: {
        Row: {
          id: string
          created_at: string
          title: string
          education_level: string
          location: string
          deadline_date: string
          source_url: string
          organizer: string | null
          description: string | null
          image_url: string | null
          slug: string
          booklet_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          education_level: string
          location: string
          deadline_date: string
          source_url: string
          organizer: string | null
          description: string | null
          image_url?: string | null
          slug: string
          booklet_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          education_level?: string
          location?: string
          deadline_date?: string
          source_url?: string
          organizer?: string | null
          description?: string | null
          image_url?: string | null
          slug?: string
          booklet_url?: string | null
        }
        Relationships: []
      }
      lomba: {
        Row: {
          id: string
          created_at: string
          title: string
          organizer: string
          participant: string
          location: string
          date_text: string
          price_text: string
          source_url: string
          poster_url: string | null
          slug: string
          description: string
          registration_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          organizer: string
          participant: string
          location: string
          date_text: string
          price_text: string
          source_url: string
          poster_url?: string | null
          slug: string
          description: string
          registration_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          organizer?: string
          participant?: string
          location?: string
          date_text?: string
          price_text?: string
          source_url?: string
          poster_url?: string | null
          slug?: string
          description?: string
          registration_url?: string | null
        }
        Relationships: []
      }
      magang: {
        Row: {
          id: number;
          created_at: string;
          intern_position: string;
          company: string;
          location: string;
          description: string;
          responsibilities: string;
          criteria: string;
          learning_outcome: string;
          company_location: string;
          detail_page_url: string;
          company_page_url: string | null;
          field: string | null;
          logo_image_url: string | null;
          slug: string;
          contact_email: string | null;
        }
        Insert: {
          id?: number;
          created_at?: string;
          intern_position: string;
          company: string;
          location: string;
          description: string;
          responsibilities: string;
          criteria: string;
          learning_outcome: string;
          company_location: string;
          detail_page_url: string;
          company_page_url?: string | null;
          field?: string | null;
          logo_image_url?: string | null;
          slug: string;
          contact_email?: string | null;
        }
        Update: {
          id?: number;
          created_at?: string;
          intern_position?: string;
          company?: string;
          location?: string;
          description?: string;
          responsibilities?: string;
          criteria?: string;
          learning_outcome?: string;
          company_location?: string;
          detail_page_url?: string;
          company_page_url?: string | null;
          field?: string | null;
          logo_image_url?: string | null;
          slug?: string;
          contact_email?: string | null;
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
