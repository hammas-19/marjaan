export interface ProductColor {
  slug: string
  color: string
}

export interface Product {
  id: number | string
  name: string
  slug: string
  price: number
  category: string
  collection: string
  description?: string
  image: string
  image2?: string
  is_new?: boolean
  is_bestseller?: boolean
  is_creator_selector?: boolean
  is_out_of_stock?: boolean
  available_colours?: ProductColor[]
  available_size?: string[]
  created_at?: string
  updated_at?: string
}

export interface ProductFilters {
  category?: string
  collection?: string
  isBestseller?: boolean
  isCreatorSelector?: boolean
  isNew?: boolean
  limit?: number
}
