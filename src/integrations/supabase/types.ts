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
      ai_chat_conversations: {
        Row: {
          adults: number | null
          budget_range: string | null
          children: number | null
          children_ages: number[] | null
          conversation_data: Json | null
          created_at: string
          destination: string | null
          id: string
          lead_status: string | null
          package_type: string | null
          session_id: string
          special_requests: string | null
          travel_date: string | null
          updated_at: string
          visitor_email: string | null
          visitor_name: string | null
          visitor_phone: string | null
          whatsapp_handoff: boolean | null
        }
        Insert: {
          adults?: number | null
          budget_range?: string | null
          children?: number | null
          children_ages?: number[] | null
          conversation_data?: Json | null
          created_at?: string
          destination?: string | null
          id?: string
          lead_status?: string | null
          package_type?: string | null
          session_id: string
          special_requests?: string | null
          travel_date?: string | null
          updated_at?: string
          visitor_email?: string | null
          visitor_name?: string | null
          visitor_phone?: string | null
          whatsapp_handoff?: boolean | null
        }
        Update: {
          adults?: number | null
          budget_range?: string | null
          children?: number | null
          children_ages?: number[] | null
          conversation_data?: Json | null
          created_at?: string
          destination?: string | null
          id?: string
          lead_status?: string | null
          package_type?: string | null
          session_id?: string
          special_requests?: string | null
          travel_date?: string | null
          updated_at?: string
          visitor_email?: string | null
          visitor_name?: string | null
          visitor_phone?: string | null
          whatsapp_handoff?: boolean | null
        }
        Relationships: []
      }
      blog_generation_requests: {
        Row: {
          content: string | null
          created_at: string
          id: string
          keywords: string[] | null
          published_at: string | null
          status: string | null
          topic: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          keywords?: string[] | null
          published_at?: string | null
          status?: string | null
          topic: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          keywords?: string[] | null
          published_at?: string | null
          status?: string | null
          topic?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string | null
          customer_id: string | null
          destination: string
          end_date: string
          id: string
          notes: string | null
          package_cost: number
          payment_status: string | null
          start_date: string
          status: Database["public"]["Enums"]["booking_status"] | null
          trip_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          destination: string
          end_date: string
          id?: string
          notes?: string | null
          package_cost: number
          payment_status?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          trip_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          destination?: string
          end_date?: string
          id?: string
          notes?: string | null
          package_cost?: number
          payment_status?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          trip_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      cached_responses: {
        Row: {
          api_source: string | null
          created_at: string
          expires_at: string | null
          id: string
          query_hash: string
          response_text: string
        }
        Insert: {
          api_source?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          query_hash: string
          response_text: string
        }
        Update: {
          api_source?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          query_hash?: string
          response_text?: string
        }
        Relationships: []
      }
      customer_tags: {
        Row: {
          created_at: string | null
          customer_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          tag_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_tags_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          country: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          total_spent: number | null
          updated_at: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          total_spent?: number | null
          updated_at?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          total_spent?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          body: string
          created_at: string | null
          id: string
          name: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          name: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          name?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      future_travel_plans: {
        Row: {
          adults: number | null
          approximate_date: string | null
          boarding_from: string | null
          children: number | null
          created_at: string | null
          destination_city: string | null
          email: string
          id: string
          phone: string | null
          tour_destination: string | null
          traveler_name: string | null
        }
        Insert: {
          adults?: number | null
          approximate_date?: string | null
          boarding_from?: string | null
          children?: number | null
          created_at?: string | null
          destination_city?: string | null
          email: string
          id?: string
          phone?: string | null
          tour_destination?: string | null
          traveler_name?: string | null
        }
        Update: {
          adults?: number | null
          approximate_date?: string | null
          boarding_from?: string | null
          children?: number | null
          created_at?: string | null
          destination_city?: string | null
          email?: string
          id?: string
          phone?: string | null
          tour_destination?: string | null
          traveler_name?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          subscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          subscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          subscribed_at?: string | null
        }
        Relationships: []
      }
      Send_Us_a_message: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      ticket_requests: {
        Row: {
          arrival_city: string | null
          created_at: string
          departure_city: string | null
          email: string
          id: string
          name: string
          passengers: number | null
          phone: string | null
          special_requirements: string | null
          ticket_type: string | null
          travel_date: string | null
        }
        Insert: {
          arrival_city?: string | null
          created_at?: string
          departure_city?: string | null
          email: string
          id?: string
          name: string
          passengers?: number | null
          phone?: string | null
          special_requirements?: string | null
          ticket_type?: string | null
          travel_date?: string | null
        }
        Update: {
          arrival_city?: string | null
          created_at?: string
          departure_city?: string | null
          email?: string
          id?: string
          name?: string
          passengers?: number | null
          phone?: string | null
          special_requirements?: string | null
          ticket_type?: string | null
          travel_date?: string | null
        }
        Relationships: []
      }
      tour_package_requests: {
        Row: {
          adults: number | null
          arrival_city: string | null
          children: number | null
          created_at: string
          departure_city: string | null
          departure_date: string | null
          destination_name: string
          email: string
          estimated_price: string | null
          id: string
          name: string
          package_type: string | null
          phone: string | null
          return_date: string | null
          special_requirements: string | null
          travel_date: string
          trip_type: string | null
        }
        Insert: {
          adults?: number | null
          arrival_city?: string | null
          children?: number | null
          created_at?: string
          departure_city?: string | null
          departure_date?: string | null
          destination_name: string
          email: string
          estimated_price?: string | null
          id?: string
          name: string
          package_type?: string | null
          phone?: string | null
          return_date?: string | null
          special_requirements?: string | null
          travel_date: string
          trip_type?: string | null
        }
        Update: {
          adults?: number | null
          arrival_city?: string | null
          children?: number | null
          created_at?: string
          departure_city?: string | null
          departure_date?: string | null
          destination_name?: string
          email?: string
          estimated_price?: string | null
          id?: string
          name?: string
          package_type?: string | null
          phone?: string | null
          return_date?: string | null
          special_requirements?: string | null
          travel_date?: string
          trip_type?: string | null
        }
        Relationships: []
      }
      tour_with_tickets: {
        Row: {
          adults: number | null
          boarding_from: string | null
          children: number | null
          created_at: string | null
          destination_city: string | null
          email: string
          id: string
          is_armed_forces: boolean | null
          is_medical_professional: boolean | null
          is_senior_citizen: boolean | null
          phone: string | null
          travel_date: string | null
        }
        Insert: {
          adults?: number | null
          boarding_from?: string | null
          children?: number | null
          created_at?: string | null
          destination_city?: string | null
          email: string
          id?: string
          is_armed_forces?: boolean | null
          is_medical_professional?: boolean | null
          is_senior_citizen?: boolean | null
          phone?: string | null
          travel_date?: string | null
        }
        Update: {
          adults?: number | null
          boarding_from?: string | null
          children?: number | null
          created_at?: string | null
          destination_city?: string | null
          email?: string
          id?: string
          is_armed_forces?: boolean | null
          is_medical_professional?: boolean | null
          is_senior_citizen?: boolean | null
          phone?: string | null
          travel_date?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      Visa_Inquiry_Form: {
        Row: {
          created_at: string
          destination_country: string | null
          email: string
          id: string
          name: string
          nationality: string | null
          phone: string
          special_requirements: string | null
          travel_date: string | null
          visa_type: string | null
        }
        Insert: {
          created_at?: string
          destination_country?: string | null
          email: string
          id?: string
          name: string
          nationality?: string | null
          phone: string
          special_requirements?: string | null
          travel_date?: string | null
          visa_type?: string | null
        }
        Update: {
          created_at?: string
          destination_country?: string | null
          email?: string
          id?: string
          name?: string
          nationality?: string | null
          phone?: string
          special_requirements?: string | null
          travel_date?: string | null
          visa_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_first_admin: {
        Args: { email: string }
        Returns: undefined
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
    }
    Enums: {
      app_role: "admin" | "staff"
      booking_status:
        | "new"
        | "contacted"
        | "confirmed"
        | "cancelled"
        | "completed"
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
    Enums: {
      app_role: ["admin", "staff"],
      booking_status: [
        "new",
        "contacted",
        "confirmed",
        "cancelled",
        "completed",
      ],
    },
  },
} as const
