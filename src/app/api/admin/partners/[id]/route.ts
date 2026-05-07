import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const data = await req.json()
  const current = await prisma.partner.findUnique({ where: { id } })
  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const partner = await prisma.partner.update({
    where: { id },
    data: {
      name: data.name ?? current.name,
      logoUrl: data.logoUrl ?? current.logoUrl,
      websiteUrl: data.websiteUrl !== undefined ? data.websiteUrl || null : current.websiteUrl,
      type: data.type ?? current.type,
      sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : current.sortOrder,
      isVisible: data.isVisible ?? current.isVisible,
    },
  })

  revalidatePath('/partners')
  revalidatePath('/en/partners')
  revalidatePath('/')
  revalidatePath('/en')
  return NextResponse.json(partner)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.partner.delete({ where: { id } })

  revalidatePath('/partners')
  revalidatePath('/en/partners')
  revalidatePath('/')
  revalidatePath('/en')
  return NextResponse.json({ success: true })
}
