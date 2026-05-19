// Regenerate against the live schema with: `npm run db:types`
// The shape below mirrors the Supabase CLI generator output so it's drop-in.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Images: {
        Row: {
          id: number;
          created_at: string;
          image_url: string;
          Name: string | null;
          country: string | null;
          description: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          image_url: string;
          Name?: string | null;
          country?: string | null;
          description?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          image_url?: string;
          Name?: string | null;
          country?: string | null;
          description?: string | null;
        };
        Relationships: [];
      };
      site_content: {
        Row: {
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          value?: string;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
