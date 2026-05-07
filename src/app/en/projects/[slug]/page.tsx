import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetailPageView from '@/components/public/ProjectDetailPageView'
import { getBackupProjectBySlug, getBackupSettings } from '@/lib/backup-content'
import { contactContent } from '@/lib/contact-content'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'

async function getData(slug: string) {
  const [project, settings] = await Promise.all([
    safeDb(
      `project detail ${slug} (en)`,
      () =>
        prisma.project.findUnique({
          where: { slug },
          include: {
            services: {
              include: {
                service: true,
              },
            },
          },
        }),
      getBackupProjectBySlug(slug)
    ),
    safeDb(
      `project detail settings ${slug} (en)`,
      () =>
        prisma.setting.findMany({
          where: { key: { in: ['contact.email', 'contact.addressEn'] } },
        }),
      getBackupSettings(['contact.email', 'contact.addressEn'])
    ),
  ])

  return { project, settings }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await safeDb(
    `project metadata ${slug} (en)`,
    () => prisma.project.findUnique({ where: { slug } }),
    getBackupProjectBySlug(slug)
  )
  if (!project) return {}

  return buildMetadata({
    locale: 'en',
    path: `/projects/${slug}`,
    title: project.metaTitleEn || project.nameEn,
    description: project.metaDescEn || project.shortDescEn || project.descriptionEn || '',
    image: project.thumbnailUrl,
  })
}

export default async function EnglishProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { project, settings } = await getData(slug)
  if (!project || !project.isVisible) notFound()

  const s = settings.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {} as Record<string, string>)

  return (
    <ProjectDetailPageView
      locale="en"
      project={project}
      relatedServices={(project.services ?? []).map((item: any) => item.service)}
      contact={{
        email: s['contact.email'] ?? 'sales@networkai.vn',
        address: s['contact.addressEn'] ?? contactContent.en.fallbackAddress,
      }}
    />
  )
}
