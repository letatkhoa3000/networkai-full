import { randomUUID } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { requireCmsUser } from '@/lib/admin-auth'

const ALLOWED_TYPES = new Map([
  ['image/svg+xml', '.svg'],
  ['image/png', '.png'],
  ['image/jpeg', '.jpg'],
  ['image/webp', '.webp'],
])

const ALLOWED_FOLDERS = new Set(['logos', 'projects', 'services', 'products', 'site-content'])
const MAX_FILE_SIZE = 5 * 1024 * 1024

function getExtension(file: File) {
  if (file.type && ALLOWED_TYPES.has(file.type)) {
    return ALLOWED_TYPES.get(file.type)!
  }

  const ext = path.extname(file.name).toLowerCase()
  if (['.svg', '.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
    return ext === '.jpeg' ? '.jpg' : ext
  }

  return null
}

export async function POST(req: NextRequest) {
  const gate = await requireCmsUser()
  if (!gate.ok) return gate.response

  const formData = await req.formData()
  const file = formData.get('file')
  const folder = formData.get('folder')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  }

  if (typeof folder !== 'string' || !ALLOWED_FOLDERS.has(folder)) {
    return NextResponse.json({ error: 'Invalid folder' }, { status: 400 })
  }

  if (file.size === 0) {
    return NextResponse.json({ error: 'Empty file' }, { status: 400 })
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File too large' }, { status: 400 })
  }

  const ext = getExtension(file)
  if (!ext) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder)
  await mkdir(uploadDir, { recursive: true })

  const safeBaseName =
    path
      .basename(file.name, path.extname(file.name))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'asset'

  const fileName = `${safeBaseName}-${randomUUID()}${ext}`
  const filePath = path.join(uploadDir, fileName)
  const bytes = await file.arrayBuffer()

  await writeFile(filePath, Buffer.from(bytes))

  return NextResponse.json({
    fileName,
    url: `/uploads/${folder}/${fileName}`,
  })
}
