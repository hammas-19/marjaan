import { useSupabaseServiceClient } from '../../utils/supabase'

/**
 * POST /api/admin/upload
 * Uploads a file to Supabase Storage using the service role key (bypasses RLS).
 * Expects multipart/form-data with a `file` field and optional `folder` field.
 */
export default defineEventHandler(async (event) => {
  const client = useSupabaseServiceClient()

  const form = await readMultipartFormData(event)
  if (!form) {
    throw createError({ statusCode: 400, statusMessage: 'No form data received' })
  }

  const filePart = form.find(f => f.name === 'file')
  const folderPart = form.find(f => f.name === 'folder')

  if (!filePart?.data || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: 'No file provided' })
  }

  const folder = folderPart?.data?.toString() || 'misc'
  const ext = filePart.filename.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const path = `${folder}/${filename}`

  const { error } = await client.storage
    .from('product-images')
    .upload(path, filePart.data, {
      contentType: filePart.type || 'application/octet-stream',
      upsert: true
    })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const { data } = client.storage.from('product-images').getPublicUrl(path)

  return { url: data.publicUrl }
})
