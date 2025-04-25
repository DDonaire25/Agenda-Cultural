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