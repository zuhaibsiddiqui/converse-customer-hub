export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      appointment_reminders: {
        Row: {
          appointment_date: string
          appointment_id: string | null
          consultation_type: string | null
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string
          delivery_status: string | null
          id: string
          is_active: boolean | null
          is_sent: boolean | null
          message_content: string | null
          reminder_type: string
          scheduled_time: string
          sent_time: string | null
          template_used: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_id?: string | null
          consultation_type?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone: string
          delivery_status?: string | null
          id?: string
          is_active?: boolean | null
          is_sent?: boolean | null
          message_content?: string | null
          reminder_type: string
          scheduled_time: string
          sent_time?: string | null
          template_used?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_id?: string | null
          consultation_type?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string
          delivery_status?: string | null
          id?: string
          is_active?: boolean | null
          is_sent?: boolean | null
          message_content?: string | null
          reminder_type?: string
          scheduled_time?: string
          sent_time?: string | null
          template_used?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointment_reminders_customer_phone_fkey"
            columns: ["customer_phone"]
            isOneToOne: false
            referencedRelation: "customer_leads"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_date: string
          confirmation_sent: boolean | null
          consultation_type: string | null
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string
          event_id: string | null
          id: string
          reminder_24h_scheduled: string | null
          reminder_24h_sent: boolean | null
          reminder_2h_scheduled: string | null
          reminder_2h_sent: boolean | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          confirmation_sent?: boolean | null
          consultation_type?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone: string
          event_id?: string | null
          id?: string
          reminder_24h_scheduled?: string | null
          reminder_24h_sent?: boolean | null
          reminder_2h_scheduled?: string | null
          reminder_2h_sent?: boolean | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          confirmation_sent?: boolean | null
          consultation_type?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string
          event_id?: string | null
          id?: string
          reminder_24h_scheduled?: string | null
          reminder_24h_sent?: boolean | null
          reminder_2h_scheduled?: string | null
          reminder_2h_sent?: boolean | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_customer_phone_fkey"
            columns: ["customer_phone"]
            isOneToOne: false
            referencedRelation: "customer_leads"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      customer_leads: {
        Row: {
          angry_behaviour_detected: boolean | null
          appointment_booked: boolean | null
          appointment_event_id: string | null
          booking_confirmed_at: string | null
          budget_range: string | null
          conversation_active: boolean | null
          created_at: string | null
          current_stage: string | null
          design_preference: string | null
          disqualification_reason: string | null
          distance_from_dublin: number | null
          email: string | null
          follow_up_enabled: boolean | null
          id: string
          is_disqualified: boolean | null
          is_interested: boolean | null
          is_qualified: boolean | null
          last_message_time: string | null
          last_response_time: string | null
          last_stage_update: string | null
          location: string | null
          manual_stop_followups: boolean | null
          name: string | null
          phone_number: string
          project_stage: string | null
          project_type: string | null
          response_count: number | null
          timeline: string | null
          total_messages_sent: number | null
          updated_at: string | null
        }
        Insert: {
          angry_behaviour_detected?: boolean | null
          appointment_booked?: boolean | null
          appointment_event_id?: string | null
          booking_confirmed_at?: string | null
          budget_range?: string | null
          conversation_active?: boolean | null
          created_at?: string | null
          current_stage?: string | null
          design_preference?: string | null
          disqualification_reason?: string | null
          distance_from_dublin?: number | null
          email?: string | null
          follow_up_enabled?: boolean | null
          id?: string
          is_disqualified?: boolean | null
          is_interested?: boolean | null
          is_qualified?: boolean | null
          last_message_time?: string | null
          last_response_time?: string | null
          last_stage_update?: string | null
          location?: string | null
          manual_stop_followups?: boolean | null
          name?: string | null
          phone_number: string
          project_stage?: string | null
          project_type?: string | null
          response_count?: number | null
          timeline?: string | null
          total_messages_sent?: number | null
          updated_at?: string | null
        }
        Update: {
          angry_behaviour_detected?: boolean | null
          appointment_booked?: boolean | null
          appointment_event_id?: string | null
          booking_confirmed_at?: string | null
          budget_range?: string | null
          conversation_active?: boolean | null
          created_at?: string | null
          current_stage?: string | null
          design_preference?: string | null
          disqualification_reason?: string | null
          distance_from_dublin?: number | null
          email?: string | null
          follow_up_enabled?: boolean | null
          id?: string
          is_disqualified?: boolean | null
          is_interested?: boolean | null
          is_qualified?: boolean | null
          last_message_time?: string | null
          last_response_time?: string | null
          last_stage_update?: string | null
          location?: string | null
          manual_stop_followups?: boolean | null
          name?: string | null
          phone_number?: string
          project_stage?: string | null
          project_type?: string | null
          response_count?: number | null
          timeline?: string | null
          total_messages_sent?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      customer_responses: {
        Row: {
          ai_detected_intent: string | null
          created_at: string | null
          customer_phone: string
          follow_up_cancelled: boolean | null
          id: string
          message_content: string
          response_type: string | null
          stage_at_response: string | null
          stage_progressed: boolean | null
        }
        Insert: {
          ai_detected_intent?: string | null
          created_at?: string | null
          customer_phone: string
          follow_up_cancelled?: boolean | null
          id?: string
          message_content: string
          response_type?: string | null
          stage_at_response?: string | null
          stage_progressed?: boolean | null
        }
        Update: {
          ai_detected_intent?: string | null
          created_at?: string | null
          customer_phone?: string
          follow_up_cancelled?: boolean | null
          id?: string
          message_content?: string
          response_type?: string | null
          stage_at_response?: string | null
          stage_progressed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_responses_customer_phone_fkey"
            columns: ["customer_phone"]
            isOneToOne: false
            referencedRelation: "customer_leads"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      follow_up_templates: {
        Row: {
          created_at: string | null
          delay_hours: number
          follow_up_number: number
          id: string
          is_active: boolean | null
          message_template: string
          stage: string | null
          template_name: string
          template_type: string
        }
        Insert: {
          created_at?: string | null
          delay_hours: number
          follow_up_number: number
          id?: string
          is_active?: boolean | null
          message_template: string
          stage?: string | null
          template_name: string
          template_type: string
        }
        Update: {
          created_at?: string | null
          delay_hours?: number
          follow_up_number?: number
          id?: string
          is_active?: boolean | null
          message_template?: string
          stage?: string | null
          template_name?: string
          template_type?: string
        }
        Relationships: []
      }
      follow_ups: {
        Row: {
          created_at: string | null
          current_stage: string | null
          customer_name: string | null
          customer_phone: string
          customer_response_to_followup: boolean | null
          deactivated_at: string | null
          deactivation_reason: string | null
          delay_hours: number
          delay_minutes: number | null
          delivery_status: string | null
          error_message: string | null
          follow_up_number: number
          follow_up_type: string
          id: string
          is_active: boolean | null
          is_sent: boolean | null
          message_content: string | null
          previous_followup_id: string | null
          response_received: boolean | null
          scheduled_time: string
          sent_time: string | null
          stage_when_scheduled: string | null
          stage_when_sent: string | null
          template_used: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_stage?: string | null
          customer_name?: string | null
          customer_phone: string
          customer_response_to_followup?: boolean | null
          deactivated_at?: string | null
          deactivation_reason?: string | null
          delay_hours: number
          delay_minutes?: number | null
          delivery_status?: string | null
          error_message?: string | null
          follow_up_number: number
          follow_up_type: string
          id?: string
          is_active?: boolean | null
          is_sent?: boolean | null
          message_content?: string | null
          previous_followup_id?: string | null
          response_received?: boolean | null
          scheduled_time: string
          sent_time?: string | null
          stage_when_scheduled?: string | null
          stage_when_sent?: string | null
          template_used?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_stage?: string | null
          customer_name?: string | null
          customer_phone?: string
          customer_response_to_followup?: boolean | null
          deactivated_at?: string | null
          deactivation_reason?: string | null
          delay_hours?: number
          delay_minutes?: number | null
          delivery_status?: string | null
          error_message?: string | null
          follow_up_number?: number
          follow_up_type?: string
          id?: string
          is_active?: boolean | null
          is_sent?: boolean | null
          message_content?: string | null
          previous_followup_id?: string | null
          response_received?: boolean | null
          scheduled_time?: string
          sent_time?: string | null
          stage_when_scheduled?: string | null
          stage_when_sent?: string | null
          template_used?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "follow_ups_customer_phone_fkey"
            columns: ["customer_phone"]
            isOneToOne: false
            referencedRelation: "customer_leads"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      reminder_templates: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          message_template: string
          reminder_type: string
          template_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          message_template: string
          reminder_type: string
          template_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          message_template?: string
          reminder_type?: string
          template_name?: string
        }
        Relationships: []
      }
      stage_history: {
        Row: {
          created_at: string | null
          customer_phone: string
          entered_at: string | null
          exited_at: string | null
          follow_ups_sent: number | null
          id: string
          is_current_stage: boolean | null
          response_received: boolean | null
          stage: string
          stage_completed: boolean | null
        }
        Insert: {
          created_at?: string | null
          customer_phone: string
          entered_at?: string | null
          exited_at?: string | null
          follow_ups_sent?: number | null
          id?: string
          is_current_stage?: boolean | null
          response_received?: boolean | null
          stage: string
          stage_completed?: boolean | null
        }
        Update: {
          created_at?: string | null
          customer_phone?: string
          entered_at?: string | null
          exited_at?: string | null
          follow_ups_sent?: number | null
          id?: string
          is_current_stage?: boolean | null
          response_received?: boolean | null
          stage?: string
          stage_completed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "stage_history_customer_phone_fkey"
            columns: ["customer_phone"]
            isOneToOne: false
            referencedRelation: "customer_leads"
            referencedColumns: ["phone_number"]
          },
        ]
      }
    }
    Views: {
      follow_up_monitoring: {
        Row: {
          customer_phone: string | null
          id: string | null
          is_active: boolean | null
          is_sent: boolean | null
          scheduled_time: string | null
        }
        Insert: {
          customer_phone?: string | null
          id?: string | null
          is_active?: boolean | null
          is_sent?: boolean | null
          scheduled_time?: string | null
        }
        Update: {
          customer_phone?: string | null
          id?: string | null
          is_active?: boolean | null
          is_sent?: boolean | null
          scheduled_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "follow_ups_customer_phone_fkey"
            columns: ["customer_phone"]
            isOneToOne: false
            referencedRelation: "customer_leads"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      followup_analytics: {
        Row: {
          avg_delay_minutes: number | null
          current_stage: string | null
          failed: number | null
          follow_up_number: number | null
          follow_up_type: string | null
          send_date: string | null
          successful: number | null
          total_sent: number | null
        }
        Relationships: []
      }
      pending_appointment_reminders: {
        Row: {
          appointment_date: string | null
          appointment_status: string | null
          consultation_type: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          customer_stage: string | null
          event_id: string | null
          message_content: string | null
          reminder_id: string | null
          reminder_type: string | null
          scheduled_time: string | null
          template_used: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointment_reminders_customer_phone_fkey"
            columns: ["customer_phone"]
            isOneToOne: false
            referencedRelation: "customer_leads"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      pending_followups: {
        Row: {
          conversation_active: boolean | null
          created_at: string | null
          current_stage: string | null
          customer_current_stage: string | null
          customer_name: string | null
          customer_phone: string | null
          delay_hours: number | null
          follow_up_enabled: boolean | null
          follow_up_number: number | null
          follow_up_type: string | null
          id: string | null
          is_active: boolean | null
          is_interested: boolean | null
          is_sent: boolean | null
          message_content: string | null
          response_received: boolean | null
          scheduled_time: string | null
          sent_time: string | null
          template_used: string | null
        }
        Relationships: [
          {
            foreignKeyName: "follow_ups_customer_phone_fkey"
            columns: ["customer_phone"]
            isOneToOne: false
            referencedRelation: "customer_leads"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      pending_followups_simple: {
        Row: {
          conversation_active: boolean | null
          current_stage: string | null
          customer_current_stage: string | null
          customer_name: string | null
          customer_phone: string | null
          follow_up_enabled: boolean | null
          follow_up_number: number | null
          follow_up_type: string | null
          id: string | null
          is_interested: boolean | null
          message_content: string | null
          scheduled_time: string | null
          template_used: string | null
        }
        Relationships: [
          {
            foreignKeyName: "follow_ups_customer_phone_fkey"
            columns: ["customer_phone"]
            isOneToOne: false
            referencedRelation: "customer_leads"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      pending_followups_view: {
        Row: {
          angry_behaviour_detected: boolean | null
          conversation_active: boolean | null
          current_stage: string | null
          customer_name: string | null
          customer_name_from_leads: string | null
          customer_phone: string | null
          delay_hours: number | null
          follow_up_enabled: boolean | null
          follow_up_number: number | null
          follow_up_type: string | null
          id: string | null
          is_interested: boolean | null
          message_content: string | null
          scheduled_time: string | null
          template_used: string | null
        }
        Relationships: [
          {
            foreignKeyName: "follow_ups_customer_phone_fkey"
            columns: ["customer_phone"]
            isOneToOne: false
            referencedRelation: "customer_leads"
            referencedColumns: ["phone_number"]
          },
        ]
      }
    }
    Functions: {
      get_customer_with_followup: {
        Args: { phone_param: string }
        Returns: {
          customer_phone: string
          customer_name: string
          current_stage: string
          total_messages_sent: number
          follow_up_enabled: boolean
          conversation_active: boolean
        }[]
      }
      get_next_stage: {
        Args: { current_stage_param: string }
        Returns: string
      }
      get_pending_reminders: {
        Args: Record<PropertyKey, never>
        Returns: {
          reminder_id: string
          customer_phone: string
          customer_name: string
          reminder_type: string
          message_content: string
          appointment_date: string
          scheduled_time: string
        }[]
      }
      mark_followup_sent: {
        Args: { followup_id_param: string; delivery_status_param?: string }
        Returns: undefined
      }
      mark_reminder_sent: {
        Args: { reminder_id_param: string; delivery_status_param?: string }
        Returns: undefined
      }
      schedule_appointment_reminders: {
        Args: {
          appointment_id_param: string
          customer_phone_param: string
          customer_name_param: string
          customer_email_param: string
          appointment_date_param: string
          event_id_param?: string
        }
        Returns: undefined
      }
      schedule_follow_ups: {
        Args: {
          customer_phone_param: string
          stage_param: string
          followup_type_param?: string
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
    Enums: {},
  },
} as const
