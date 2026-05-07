export const MAX_ADMIN_UPLOAD_SIZE = 5 * 1024 * 1024
export const MAX_ADMIN_SOURCE_SIZE = 20 * 1024 * 1024

export const ADMIN_UPLOAD_ACCEPTED_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp']
export const ADMIN_UPLOAD_ACCEPTED_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg', '.webp']

export type AdminUploadFolder = 'logos' | 'projects' | 'services' | 'products' | 'site-content'

function getFileExtension(file: File) {
  const extIndex = file.name.lastIndexOf('.')
  return extIndex >= 0 ? file.name.slice(extIndex).toLowerCase() : ''
}

export function validateAdminUpload(file: File) {
  const ext = getFileExtension(file)

  if (!ADMIN_UPLOAD_ACCEPTED_TYPES.includes(file.type) && !ADMIN_UPLOAD_ACCEPTED_EXTENSIONS.includes(ext)) {
    return 'invalid-type' as const
  }

  if (file.size > MAX_ADMIN_SOURCE_SIZE) {
    return 'too-large' as const
  }

  return null
}

export async function uploadAdminAsset(file: File, folder: AdminUploadFolder) {
  const data = new FormData()
  data.append('file', file)
  data.append('folder', folder)

  const res = await fetch('/api/admin/uploads/media', {
    method: 'POST',
    body: data,
  })

  if (!res.ok) {
    throw new Error('Upload failed')
  }

  return res.json() as Promise<{ fileName: string; url: string }>
}
