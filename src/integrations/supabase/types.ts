export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      hospital_admins: {
        Row: {
          created_at: string
          hospital_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hospital_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          hospital_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospital_admins_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      hospital_treatments: {
        Row: {
          created_at: string
          currency: string
          duration_days: number | null
          hospital_id: string
          id: string
          includes: string[] | null
          is_active: boolean
          notes: string | null
          price_max: number | null
          price_min: number | null
          treatment_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          duration_days?: number | null
          hospital_id: string
          id?: string
          includes?: string[] | null
          is_active?: boolean
          notes?: string | null
          price_max?: number | null
          price_min?: number | null
          treatment_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          duration_days?: number | null
          hospital_id?: string
          id?: string
          includes?: string[] | null
          is_active?: boolean
          notes?: string | null
          price_max?: number | null
          price_min?: number | null
          treatment_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospital_treatments_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hospital_treatments_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          accreditations: string[] | null
          address: string | null
          city: string
          contact_email: string | null
          contact_phone: string | null
          country: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          is_verified: boolean
          logo_url: string | null
          name: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          accreditations?: string[] | null
          address?: string | null
          city: string
          contact_email?: string | null
          contact_phone?: string | null
          country: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_verified?: boolean
          logo_url?: string | null
          name: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          accreditations?: string[] | null
          address?: string | null
          city?: string
          contact_email?: string | null
          contact_phone?: string | null
          country?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_verified?: boolean
          logo_url?: string | null
          name?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      lead_hospitals: {
        Row: {
          created_at: string
          currency: string | null
          hospital_id: string
          id: string
          lead_id: string
          quoted_price: number | null
          responded_at: string | null
          response_notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string | null
          hospital_id: string
          id?: string
          lead_id: string
          quoted_price?: number | null
          responded_at?: string | null
          response_notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string | null
          hospital_id?: string
          id?: string
          lead_id?: string
          quoted_price?: number | null
          responded_at?: string | null
          response_notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_hospitals_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_hospitals_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          budget: string | null
          created_at: string
          destination_preference: string[] | null
          diagnosis_details: string | null
          email: string
          id: string
          previous_diagnosis: string | null
          questionnaire_answers: Json | null
          source: string | null
          status: string
          treatment_category: string
          updated_at: string
          urgency: string | null
          utm_campaign: string | null
          utm_source: string | null
        }
        Insert: {
          assigned_to?: string | null
          budget?: string | null
          created_at?: string
          destination_preference?: string[] | null
          diagnosis_details?: string | null
          email: string
          id?: string
          previous_diagnosis?: string | null
          questionnaire_answers?: Json | null
          source?: string | null
          status?: string
          treatment_category: string
          updated_at?: string
          urgency?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Update: {
          assigned_to?: string | null
          budget?: string | null
          created_at?: string
          destination_preference?: string[] | null
          diagnosis_details?: string | null
          email?: string
          id?: string
          previous_diagnosis?: string | null
          questionnaire_answers?: Json | null
          source?: string | null
          status?: string
          treatment_category?: string
          updated_at?: string
          urgency?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      treatment_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      treatments: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "treatments_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "treatment_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_hospital_ids: { Args: { _user_id: string }; Returns: string[] }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "hospital_admin" | "patient"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "hospital_admin", "patient"],
    },
  },
} as const
