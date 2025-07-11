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
      beasiswa: {
        Row: {
          booklet_url: string | null
          created_at: string
          deadline_date: string
          description: string | null
          education_level: string
          id: string
          image_url: string | null
          location: string
          organizer: string | null
          slug: string
          source_url: string
          title: string
        }
        Insert: {
          booklet_url?: string | null
          created_at?: string
          deadline_date: string
          description?: string | null
          education_level: string
          id?: string
          image_url?: string | null
          location: string
          organizer?: string | null
          slug: string
          source_url: string
          title: string
        }
        Update: {
          booklet_url?: string | null
          created_at?: string
          deadline_date?: string
          description?: string | null
          education_level?: string
          id?: string
          image_url?: string | null
          location?: string
          organizer?: string | null
          slug?: string
          source_url?: string
          title?: string
        }
        Relationships: []
      }
      lomba: {
        Row: {
          created_at: string
          date_text: string
          description: string
          id: string
          location: string
          organizer: string
          participant: string
          poster_url: string
          price_text: string
          registration_url: string
          slug: string
          source_url: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_text: string
          description: string
          id?: string
          location: string
          organizer: string
          participant: string
          poster_url: string
          price_text: string
          registration_url: string
          slug: string
          source_url: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_text?: string
          description?: string
          id?: string
          location?: string
          organizer?: string
          participant?: string
          poster_url?: string
          price_text?: string
          registration_url?: string
          slug?: string
          source_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      magang: {
        Row: {
          company: string
          company_location: string
          company_page_url: string | null
          contact_email: string | null
          created_at: string
          criteria: string
          description: string
          detail_page_url: string
          field: string | null
          id: number
          intern_position: string
          learning_outcome: string
          location: string
          logo_image_url: string | null
          responsibilities: string
          slug: string
        }
        Insert: {
          company: string
          company_location: string
          company_page_url?: string | null
          contact_email?: string | null
          created_at?: string
          criteria: string
          description: string
          detail_page_url: string
          field?: string | null
          id?: number
          intern_position: string
          learning_outcome: string
          location: string
          logo_image_url?: string | null
          responsibilities: string
          slug: string
        }
        Update: {
          company?: string
          company_location?: string
          company_page_url?: string | null
          contact_email?: string | null
          created_at?: string
          criteria?: string
          description?: string
          detail_page_url?: string
          field?: string | null
          id?: number
          intern_position?: string
          learning_outcome?: string
          location?: string
          logo_image_url?: string | null
          responsibilities?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      clean_beasiswa_simple: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      clean_lomba_simple: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      clean_lomba_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      clean_magang_simple: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      test_clean_lomba_table: {
        Args: Record<PropertyKey, never>
        Returns: string
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
