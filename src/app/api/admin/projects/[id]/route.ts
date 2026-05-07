import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { getBackupProjectById } from '@/lib/backup-content'
import { upsertLocalProject } from '@/lib/local-content-store'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const data = await req.json()
  const backupCurrent = getBackupProjectById(id)
  const resolveValue = <T,>(incoming: T | undefined, currentValue: T) => (incoming !== undefined ? incoming : currentValue)

  try {
    const current = await prisma.project.findUnique({ where: { id } })
    if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const project = await prisma.project.update({
      where: { id },
      data: {
        slug: data.slug ?? current.slug,
        sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : current.sortOrder,
        nameVi: data.nameVi ?? current.nameVi,
        nameEn: data.nameEn ?? current.nameEn,
        shortDescVi: data.shortDescVi !== undefined ? data.shortDescVi || null : current.shortDescVi,
        shortDescEn: data.shortDescEn !== undefined ? data.shortDescEn || null : current.shortDescEn,
        thumbnailUrl: data.thumbnailUrl !== undefined ? data.thumbnailUrl || null : current.thumbnailUrl,
        imageUrls: Array.isArray(data.imageUrls) ? data.imageUrls : current.imageUrls,
        location: data.location !== undefined ? data.location || null : current.location,
        year: data.year !== undefined ? data.year || null : current.year,
        hotelBrand: data.hotelBrand !== undefined ? data.hotelBrand || null : current.hotelBrand,
        status: data.status ?? current.status,
        featured: data.featured ?? current.featured,
        isVisible: data.isVisible ?? current.isVisible,
        descriptionVi: data.descriptionVi !== undefined ? data.descriptionVi || null : current.descriptionVi,
        descriptionEn: data.descriptionEn !== undefined ? data.descriptionEn || null : current.descriptionEn,
        metaTitleVi: data.metaTitleVi !== undefined ? data.metaTitleVi || null : current.metaTitleVi,
        metaTitleEn: data.metaTitleEn !== undefined ? data.metaTitleEn || null : current.metaTitleEn,
        metaDescVi: data.metaDescVi !== undefined ? data.metaDescVi || null : current.metaDescVi,
        metaDescEn: data.metaDescEn !== undefined ? data.metaDescEn || null : current.metaDescEn,
      },
    })

    revalidatePath('/projects')
    revalidatePath('/en/projects')
    revalidatePath(`/projects/${current.slug}`)
    revalidatePath(`/en/projects/${current.slug}`)
    revalidatePath(`/projects/${project.slug}`)
    revalidatePath(`/en/projects/${project.slug}`)
    revalidatePath('/')
    revalidatePath('/en')
    return NextResponse.json(project)
  } catch {
    if (!backupCurrent) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const project = {
      ...backupCurrent,
      slug: data.slug ?? backupCurrent.slug,
      sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : backupCurrent.sortOrder,
      nameVi: data.nameVi ?? backupCurrent.nameVi,
      nameEn: data.nameEn ?? backupCurrent.nameEn,
      shortDescVi: data.shortDescVi !== undefined ? data.shortDescVi || null : backupCurrent.shortDescVi,
      shortDescEn: data.shortDescEn !== undefined ? data.shortDescEn || null : backupCurrent.shortDescEn,
      thumbnailUrl: data.thumbnailUrl !== undefined ? data.thumbnailUrl || null : backupCurrent.thumbnailUrl,
      imageUrls: Array.isArray(data.imageUrls) ? data.imageUrls : resolveValue(data.imageUrls, backupCurrent.imageUrls),
      location: data.location !== undefined ? data.location || null : backupCurrent.location,
      year: data.year !== undefined ? data.year || null : backupCurrent.year,
      hotelBrand: data.hotelBrand !== undefined ? data.hotelBrand || null : backupCurrent.hotelBrand,
      status: data.status ?? backupCurrent.status,
      featured: data.featured ?? backupCurrent.featured,
      isVisible: data.isVisible ?? backupCurrent.isVisible,
      descriptionVi: data.descriptionVi !== undefined ? data.descriptionVi || null : backupCurrent.descriptionVi,
      descriptionEn: data.descriptionEn !== undefined ? data.descriptionEn || null : backupCurrent.descriptionEn,
      metaTitleVi: data.metaTitleVi !== undefined ? data.metaTitleVi || null : backupCurrent.metaTitleVi,
      metaTitleEn: data.metaTitleEn !== undefined ? data.metaTitleEn || null : backupCurrent.metaTitleEn,
      metaDescVi: data.metaDescVi !== undefined ? data.metaDescVi || null : backupCurrent.metaDescVi,
      metaDescEn: data.metaDescEn !== undefined ? data.metaDescEn || null : backupCurrent.metaDescEn,
    }

    upsertLocalProject(project)

    revalidatePath('/projects')
    revalidatePath('/en/projects')
    revalidatePath(`/projects/${backupCurrent.slug}`)
    revalidatePath(`/en/projects/${backupCurrent.slug}`)
    revalidatePath(`/projects/${project.slug}`)
    revalidatePath(`/en/projects/${project.slug}`)
    revalidatePath('/')
    revalidatePath('/en')
    return NextResponse.json(project)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const project = await prisma.project.delete({ where: { id } })

  revalidatePath('/projects')
  revalidatePath('/en/projects')
  revalidatePath(`/projects/${project.slug}`)
  revalidatePath(`/en/projects/${project.slug}`)
  revalidatePath('/')
  revalidatePath('/en')
  return NextResponse.json({ success: true })
}
