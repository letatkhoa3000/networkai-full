import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { getBackupServices } from '@/lib/backup-content'
import { upsertLocalService } from '@/lib/local-content-store'

function parseLines(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
  }

  if (typeof value !== 'string') {
    return []
  }

  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const data = await req.json()
  const fallbackCurrent = getBackupServices().find((item) => item.id === id) ?? null
  const payload = {
    ...(fallbackCurrent ?? {}),
    id,
    slug: data.slug,
    titleVi: data.titleVi,
    titleEn: data.titleEn,
    shortDescVi: data.shortDescVi || null,
    shortDescEn: data.shortDescEn || null,
    descriptionVi: data.descriptionVi,
    descriptionEn: data.descriptionEn,
    imageUrl: data.imageUrl || null,
    problemPointsVi: parseLines(data.problemPointsVi),
    problemPointsEn: parseLines(data.problemPointsEn),
    scopeItemsVi: parseLines(data.scopeItemsVi),
    scopeItemsEn: parseLines(data.scopeItemsEn),
    deliverablesVi: parseLines(data.deliverablesVi),
    deliverablesEn: parseLines(data.deliverablesEn),
    processStepsVi: parseLines(data.processStepsVi),
    processStepsEn: parseLines(data.processStepsEn),
    fitForVi: parseLines(data.fitForVi),
    fitForEn: parseLines(data.fitForEn),
    systemTagsVi: parseLines(data.systemTagsVi),
    systemTagsEn: parseLines(data.systemTagsEn),
    benefitsVi: parseLines(data.benefitsVi),
    benefitsEn: parseLines(data.benefitsEn),
    faqItemsVi: parseLines(data.faqItemsVi),
    faqItemsEn: parseLines(data.faqItemsEn),
    metaTitleVi: data.metaTitleVi || null,
    metaTitleEn: data.metaTitleEn || null,
    metaDescVi: data.metaDescVi || null,
    metaDescEn: data.metaDescEn || null,
    featured: data.featured,
    isVisible: data.isVisible,
  }

  try {
    const current = await prisma.service.findUnique({ where: { id } })
    if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const service = await prisma.service.update({
      where: { id },
      data: payload,
    })

    revalidatePath('/services')
    revalidatePath('/en/services')
    revalidatePath(`/services/${current.slug}`)
    revalidatePath(`/en/services/${current.slug}`)
    revalidatePath(`/services/${service.slug}`)
    revalidatePath(`/en/services/${service.slug}`)
    revalidatePath('/')
    revalidatePath('/en')
    return NextResponse.json(service)
  } catch {
    upsertLocalService(payload)
    revalidatePath('/services')
    revalidatePath('/en/services')
    revalidatePath(`/services/${payload.slug}`)
    revalidatePath(`/en/services/${payload.slug}`)
    revalidatePath('/')
    revalidatePath('/en')
    return NextResponse.json(payload)
  }
}
