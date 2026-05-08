import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getBackupPartners } from '@/lib/backup-content'
import { upsertLocalPartner } from '@/lib/local-content-store'
import { requireCmsUser } from '@/lib/admin-auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const gate = await requireCmsUser()
  if (!gate.ok) return gate.response

  const { id } = await params
  const data = await req.json()
  const fallbackCurrent = getBackupPartners().find((item) => item.id === id) ?? null

  try {
    const current = await prisma.partner.findUnique({ where: { id } })
    if (!current) {
      if (!fallbackCurrent) return NextResponse.json({ error: 'Not found' }, { status: 404 })

      const partner = {
        ...fallbackCurrent,
        name: data.name ?? fallbackCurrent.name,
        logoUrl: data.logoUrl ?? fallbackCurrent.logoUrl,
        websiteUrl: data.websiteUrl !== undefined ? data.websiteUrl || null : fallbackCurrent.websiteUrl,
        type: data.type ?? fallbackCurrent.type,
        sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : fallbackCurrent.sortOrder,
        isVisible: data.isVisible ?? fallbackCurrent.isVisible,
      }

      upsertLocalPartner(partner)

      revalidatePath('/partners')
      revalidatePath('/en/partners')
      revalidatePath('/')
      revalidatePath('/en')
      return NextResponse.json(partner)
    }

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
  } catch {
    if (!fallbackCurrent) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const partner = {
      ...fallbackCurrent,
      name: data.name ?? fallbackCurrent.name,
      logoUrl: data.logoUrl ?? fallbackCurrent.logoUrl,
      websiteUrl: data.websiteUrl !== undefined ? data.websiteUrl || null : fallbackCurrent.websiteUrl,
      type: data.type ?? fallbackCurrent.type,
      sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : fallbackCurrent.sortOrder,
      isVisible: data.isVisible ?? fallbackCurrent.isVisible,
    }

    upsertLocalPartner(partner)

    revalidatePath('/partners')
    revalidatePath('/en/partners')
    revalidatePath('/')
    revalidatePath('/en')
    return NextResponse.json(partner)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const gate = await requireCmsUser()
  if (!gate.ok) return gate.response

  const { id } = await params
  try {
    await prisma.partner.delete({ where: { id } })
  } catch {}

  revalidatePath('/partners')
  revalidatePath('/en/partners')
  revalidatePath('/')
  revalidatePath('/en')
  return NextResponse.json({ success: true })
}
