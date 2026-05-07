import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import type { ProductRecord } from '@/lib/products'
import { getProductsFilePath } from '@/lib/products'

type RouteContext = {
  params: Promise<{ slug: string }>
}

async function readProductsFile() {
  const filePath = getProductsFilePath()
  await mkdir(path.dirname(filePath), { recursive: true })
  try {
    const raw = await readFile(filePath, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as ProductRecord[]) : []
  } catch {
    return [] as ProductRecord[]
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const payload = (await req.json()) as ProductRecord
  const { slug } = await context.params
  const products = await readProductsFile()
  const index = products.findIndex((item) => item.slug === slug)

  if (index < 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  products[index] = { ...products[index], ...payload }
  const filePath = getProductsFilePath()
  await writeFile(filePath, `${JSON.stringify(products, null, 2)}\n`, 'utf8')

  revalidatePath('/products')
  revalidatePath('/en/products')
  revalidatePath(`/products/${slug}`)
  revalidatePath(`/en/products/${slug}`)
  revalidatePath(`/products/${products[index].slug}`)
  revalidatePath(`/en/products/${products[index].slug}`)
  revalidatePath('/admin/products')
  revalidatePath(`/admin/products/${slug}/edit`)
  revalidatePath(`/admin/products/${products[index].slug}/edit`)

  return NextResponse.json({ ok: true, product: products[index] })
}
