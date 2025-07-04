export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bootcamps: {
        Row: {
          application_deadline: string | null
          cost_in_idr: number | null
          created_at: string
          description: string | null
          duration_in_weeks: number | null
          id: string
          image_url: string | null
          location: string | null
          provider: string | null
          skills_covered: string[] | null
          source_url: string
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          cost_in_idr?: number | null
          created_at?: string
          description?: string | null
          duration_in_weeks?: number | null
          id?: string
          image_url?: string | null
          location?: string | null
          provider?: string | null
          skills_covered?: string[] | null
          source_url: string
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          cost_in_idr?: number | null
          created_at?: string
          description?: string | null
          duration_in_weeks?: number | null
          id?: string
          image_url?: string | null
          location?: string | null
          provider?: string | null
          skills_covered?: string[] | null
          source_url?: string
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      competition_categories: {
        Row: {
          category_id: string
          competition_id: string
        }
        Insert: {
          category_id: string
          competition_id: string
        }
        Update: {
          category_id?: string
          competition_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competition_categories_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          created_at: string
          date_raw_text: string | null
          date_text: string | null
          deadline: string
          description: string | null
          event_date_end: string | null
          event_date_start: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_online: boolean
          location: string | null
          organizer: string | null
          participant: string | null
          poster_url: string
          price_info: string | null
          price_raw_text: string | null
          registration_url: string
          source_id: string | null
          source_name: string | null
          source_url: string | null
          title: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string
          date_raw_text?: string | null
          date_text?: string | null
          deadline: string
          description?: string | null
          event_date_end?: string | null
          event_date_start?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_online?: boolean
          location?: string | null
          organizer?: string | null
          participant?: string | null
          poster_url: string
          price_info?: string | null
          price_raw_text?: string | null
          registration_url: string
          source_id?: string | null
          source_name?: string | null
          source_url?: string | null
          title: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string
          date_raw_text?: string | null
          date_text?: string | null
          deadline?: string
          description?: string | null
          event_date_end?: string | null
          event_date_start?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_online?: boolean
          location?: string | null
          organizer?: string | null
          participant?: string | null
          poster_url?: string
          price_info?: string | null
          price_raw_text?: string | null
          registration_url?: string
          source_id?: string | null
          source_name?: string | null
          source_url?: string | null
          title?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      event_types: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      internship_categories: {
        Row: {
          category_id: string
          internship_id: string
        }
        Insert: {
          category_id: string
          internship_id: string
        }
        Update: {
          category_id?: string
          internship_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "internship_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "internship_categories_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
        ]
      }
      internships: {
        Row: {
          application_deadline: string | null
          application_method: string | null
          application_url: string | null
          company_name: string
          contact_person: string | null
          created_at: string
          description: string | null
          id: string
          is_paid: boolean | null
          location: string | null
          poster_image_url: string | null
          qualifications: string | null
          requirements: string[] | null
          role: string | null
          source_id: string | null
          source_url: string
          title: string
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          application_method?: string | null
          application_url?: string | null
          company_name: string
          contact_person?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_paid?: boolean | null
          location?: string | null
          poster_image_url?: string | null
          qualifications?: string | null
          requirements?: string[] | null
          role?: string | null
          source_id?: string | null
          source_url: string
          title: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          application_method?: string | null
          application_url?: string | null
          company_name?: string
          contact_person?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_paid?: boolean | null
          location?: string | null
          poster_image_url?: string | null
          qualifications?: string | null
          requirements?: string[] | null
          role?: string | null
          source_id?: string | null
          source_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "internships_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      scholarships: {
        Row: {
          application_deadline: string | null
          benefits: string | null
          created_at: string
          description: string | null
          eligibility_requirements: string | null
          id: string
          image_url: string | null
          official_website: string | null
          provider: string | null
          source_url: string
          title: string
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          benefits?: string | null
          created_at?: string
          description?: string | null
          eligibility_requirements?: string | null
          id?: string
          image_url?: string | null
          official_website?: string | null
          provider?: string | null
          source_url: string
          title: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          benefits?: string | null
          created_at?: string
          description?: string | null
          eligibility_requirements?: string | null
          id?: string
          image_url?: string | null
          official_website?: string | null
          provider?: string | null
          source_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sources: {
        Row: {
          id: string
          last_scraped_at: string | null
          name: string
          url: string
        }
        Insert: {
          id?: string
          last_scraped_at?: string | null
          name: string
          url: string
        }
        Update: {
          id?: string
          last_scraped_at?: string | null
          name?: string
          url?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          created_at: string
          description: string | null
          file_url: string | null
          id: number
          status: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: never
          status?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: never
          status?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          category_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_expired_events: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_all_categories: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_all_event_types: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_event_details: {
        Args: { p_event_id: string }
        Returns: Json
      }
      get_events: {
        Args: {
          p_search_term?: string
          p_event_type_ids?: string[]
          p_category_ids?: string[]
          p_sort_by?: string
          p_page?: number
          p_page_size?: number
        }
        Returns: Json
      }
      get_matching_bootcamp_ids: {
        Args: { search_text: string }
        Returns: {
          id: string
        }[]
      }
      get_matching_competition_ids: {
        Args: { search_text: string; category_slugs: string[] }
        Returns: {
          id: string
        }[]
      }
      get_matching_internship_ids: {
        Args: { search_text: string }
        Returns: {
          id: string
        }[]
      }
      get_matching_scholarship_ids: {
        Args: { search_text: string }
        Returns: {
          id: string
        }[]
      }
      get_or_create_source_id: {
        Args: { p_source_name: string; p_source_url: string }
        Returns: string
      }
      upsert_competition_with_categories: {
        Args: { p_competition_data: Json; p_category_ids: string[] }
        Returns: string
      }
      upsert_event_with_categories: {
        Args: { p_event_data: Json; p_category_ids: string[] }
        Returns: string
      }
      upsert_internship_with_categories: {
        Args: { p_internship_data: Json; p_category_ids: string[] }
        Returns: string
      }
      upsert_internships_with_categories: {
        Args: {
          p_title: string
          p_company_name: string
          p_location: string
          p_description: string
          p_url: string
          p_poster_url: string
          p_application_deadline: string
          p_internship_start_date: string
          p_internship_end_date: string
          p_application_url: string
          p_source_id: string
          p_category_names: string[]
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
