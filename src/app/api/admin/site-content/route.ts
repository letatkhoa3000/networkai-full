import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { writeLocalContent } from '@/lib/local-content-store'
import { requireCmsUser } from '@/lib/admin-auth'

export async function PUT(req: NextRequest) {
  const gate = await requireCmsUser()
  if (!gate.ok) return gate.response

  const data = await req.json()
  const sections: any[] = Array.isArray(data.sections) ? data.sections : []
  const coreValues: any[] | null = Array.isArray(data.coreValues) ? data.coreValues : null

  const normalizedSections = sections.map((section) => ({
    key: section.key,
    titleVi: section.titleVi ?? '',
    titleEn: section.titleEn ?? '',
    titleSize: section.titleSize ?? 'md',
    subtitleVi: section.subtitleVi || null,
    subtitleEn: section.subtitleEn || null,
    bodyVi: section.bodyVi || null,
    bodyEn: section.bodyEn || null,
    bodySize: section.bodySize ?? 'md',
    ctaLabelVi: section.ctaLabelVi || null,
    ctaLabelEn: section.ctaLabelEn || null,
    ctaUrl: section.ctaUrl || null,
    imageUrl: section.imageUrl || null,
    sortOrder: typeof section.sortOrder === 'number' ? section.sortOrder : 0,
    isVisible: section.isVisible ?? true,
  }))

  const normalizedCoreValues = coreValues
    ? coreValues.map((value) => ({
        id: value.id || `local-core-${Math.random().toString(36).slice(2, 10)}`,
        titleVi: value.titleVi ?? '',
        titleEn: value.titleEn ?? '',
        titleSize: value.titleSize ?? 'md',
        descriptionVi: value.descriptionVi ?? '',
        descriptionEn: value.descriptionEn ?? '',
        bodySize: value.bodySize ?? 'md',
        sortOrder: typeof value.sortOrder === 'number' ? value.sortOrder : 0,
        isVisible: value.isVisible ?? true,
      }))
    : null

  try {
    await prisma.$transaction(async (tx) => {
      for (const section of normalizedSections) {
        await tx.homepageSection.upsert({
          where: { key: section.key },
          update: section,
          create: section,
        })
      }

      if (normalizedCoreValues) {
        const existingIds = (
          await tx.coreValue.findMany({
            select: { id: true },
          })
        ).map((item) => item.id)

        const incomingIds = normalizedCoreValues.map((item) => item.id)

        const idsToDelete = existingIds.filter((id) => !incomingIds.includes(id))
        if (idsToDelete.length) {
          await tx.coreValue.deleteMany({
            where: { id: { in: idsToDelete } },
          })
        }

        for (const value of normalizedCoreValues) {
          await tx.coreValue.upsert({
            where: { id: value.id },
            update: value,
            create: value,
          })
        }
      }
    })
  } catch {
    writeLocalContent({
      homepageSections: normalizedSections,
      ...(normalizedCoreValues ? { coreValues: normalizedCoreValues } : {}),
    })
  }

  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath('/about')
  revalidatePath('/en/about')
  revalidatePath('/admin/home')
  revalidatePath('/admin/about')

  return NextResponse.json({ success: true })
}
