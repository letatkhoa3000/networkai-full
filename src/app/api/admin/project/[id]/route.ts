import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const data = await req.json()

  const project = await prisma.project.update({
    where: { id },
    data: {
      nameVi: data.nameVi,
      nameEn: data.nameEn,
      location: data.location || null,
      year: data.year || null,
      hotelBrand: data.hotelBrand || null,
      status: data.status,
      featured: data.featured,
      isVisible: data.isVisible,
      descriptionVi: data.descriptionVi || null,
      descriptionEn: data.descriptionEn || null,
    },
  })

  revalidatePath('/projects')
  revalidatePath('/')
  return NextResponse.json(project)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.project.delete({ where: { id } })

  revalidatePath('/projects')
  revalidatePath('/')
  return NextResponse.json({ success: true })
}