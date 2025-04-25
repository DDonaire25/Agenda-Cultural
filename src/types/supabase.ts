export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
      cultural_events: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          date: string
          location: string
          location_url: string | null
          event_type: string
          discipline: string
          category: string
          target_audience: string
          cost_type: 'free' | 'paid'
          cost_amount: number | null
          responsible_person: Json
          technical_requirements: string[]
          image_url: string | null
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          date: string
          location: string
          location_url?: string | null
          event_type: string
          discipline: string
          category: string
          target_audience: string
          cost_type: 'free' | 'paid'
          cost_amount?: number | null
          responsible_person: Json
          technical_requirements?: string[]
          image_url?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          date?: string
          location?: string
          location_url?: string | null
          event_type?: string
          discipline?: string
          category?: string
          target_audience?: string
          cost_type?: 'free' | 'paid'
          cost_amount?: number | null
          responsible_person?: Json
          technical_requirements?: string[]
          image_url?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      artist_birthdays: {
        Row: {
          id: string
          user_id: string
          name: string
          birth_date: string
          role: string
          discipline: string
          trajectory: string
          contact_info: Json
          image_url: string | null
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          birth_date: string
          role: string
          discipline: string
          trajectory: string
          contact_info: Json
          image_url?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          birth_date?: string
          role?: string
          discipline?: string
          trajectory?: string
          contact_info?: Json
          image_url?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      cultural_tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          status: 'pending' | 'in-progress' | 'completed'
          priority: 'low' | 'medium' | 'high'
          assigned_to: string
          due_date: string
          checklist: Json[]
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          status?: 'pending' | 'in-progress' | 'completed'
          priority: 'low' | 'medium' | 'high'
          assigned_to: string
          due_date: string
          checklist?: Json[]
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          status?: 'pending' | 'in-progress' | 'completed'
          priority?: 'low' | 'medium' | 'high'
          assigned_to?: string
          due_date?: string
          checklist?: Json[]
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string | null
          phone: string | null
          discipline: string | null
          role: string | null
          whatsapp: string | null
          instagram: string | null
          facebook: string | null
          notes: string | null
          image_url: string | null
          is_favorite: boolean | null
          provider: string
          provider_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email?: string | null
          phone?: string | null
          discipline?: string | null
          role?: string | null
          whatsapp?: string | null
          instagram?: string | null
          facebook?: string | null
          notes?: string | null
          image_url?: string | null
          is_favorite?: boolean | null
          provider?: string
          provider_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          discipline?: string | null
          role?: string | null
          whatsapp?: string | null
          instagram?: string | null
          facebook?: string | null
          notes?: string | null
          image_url?: string | null
          is_favorite?: boolean | null
          provider?: string
          provider_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}