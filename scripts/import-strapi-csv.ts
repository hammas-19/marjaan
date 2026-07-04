import fs from 'fs'
import path from 'path'
import os from 'os'
import { parse } from 'csv-parse/sync'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const homeDir = os.homedir()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const imageBaseUrl = process.env.IMAGE_BASE_URL || ''

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false }
})

const readCsv = (filePath: string) => {
  const content = fs.readFileSync(filePath, 'utf-8')
  return parse(content, { columns: true, skip_empty_lines: true })
}

const parseJson = (value: string | undefined) => {
  if (!value || value.trim() === '') return undefined
  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

const toBoolean = (value: string | number | undefined) => {
  return value === '1' || value === 1 || value === 'true'
}

const CATEGORY_FOLDER: Record<string, string> = {
  '4': 'summer/drops',
  '5': 'summer/graphics',
  '6': 'summer/basic'
}

const resolveImage = (value: string | undefined, categoryId: string) => {
  if (!value) return undefined
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  const filename = value.replace(/^Craftswork\//, '')
  const folder = CATEGORY_FOLDER[categoryId]
  if (!folder || !imageBaseUrl) return value
  return `${imageBaseUrl.replace(/\/$/, '')}/${folder}/${filename}`
}

async function main() {
  const productsPath = process.env.PRODUCTS_CSV || path.join(homeDir, 'Downloads/Product-2025-02-22.csv')
  const categoriesPath = process.env.CATEGORIES_CSV || path.join(homeDir, 'Downloads/Category-2025-03-10.csv')
  const collectionsPath = process.env.COLLECTIONS_CSV || path.join(homeDir, 'Downloads/Collection-2025-03-10.csv')

  const products = readCsv(productsPath)
  const categories = readCsv(categoriesPath)
  const collections = readCsv(collectionsPath)

  const categoryMap = new Map(categories.map((c: any) => [c.id, c.name]))
  const collectionMap = new Map(collections.map((c: any) => [c.id, c.name]))

  const rows = products.map((p: any) => {
    const categoryName = categoryMap.get(p.category)
    const collectionName = collectionMap.get(p.collection)

    if (!categoryName) {
      throw new Error(`Unknown category id ${p.category} for product ${p.name}`)
    }
    if (!collectionName) {
      throw new Error(`Unknown collection id ${p.collection} for product ${p.name}`)
    }

    return {
      name: p.name,
      slug: p.slug,
      price: Number(p.price),
      category: categoryName,
      collection: collectionName,
      description: p.description || null,
      image: resolveImage(p.image, p.category) || null,
      image2: resolveImage(p.image2, p.category) || null,
      is_bestseller: toBoolean(p.is_bestseller),
      is_new: toBoolean(p.is_new),
      is_creator_selector: toBoolean(p.is_creator_selector),
      is_out_of_stock: toBoolean(p.is_out_of_stock),
      available_size: parseJson(p.available_size) || [],
      available_colours: parseJson(p.available_colours) || []
    }
  })

  if (process.env.DRY_RUN === 'true') {
    console.log(`Dry run: would import ${rows.length} products.`)
    console.log(rows[0])
    return
  }

  const { error } = await supabase.from('products').insert(rows)

  if (error) {
    console.error('Import failed:', error.message)
    process.exit(1)
  }

  console.log(`Imported ${rows.length} products into Supabase.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
