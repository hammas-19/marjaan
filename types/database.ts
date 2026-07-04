/**
 * Supabase database type placeholder.
 * After generating types from your Supabase project (e.g., via `supabase gen types`),
 * replace this file with the generated `Database` type.
 */
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          slug: string
          price: number
          category: string
          collection: string
          description: string | null
          image: string
          image2: string | null
          is_new: boolean
          is_bestseller: boolean
          is_creator_selector: boolean
          is_out_of_stock: boolean
          available_colours: Array<{ slug: string; color: string }> | null
          available_size: string[] | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
