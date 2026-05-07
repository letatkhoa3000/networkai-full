import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceDetailPageView from '@/components/public/ServiceDetailPageView'
import { getBackupServiceBySlug, getBackupSettings } from '@/lib/backup-content'
import { contactContent } from '@/lib/contact-content'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'

async function getData(slug: string) {
  const [service, settings] = await Promise.all([
    safeDb(
      `service detail ${slug} (vi)`,
      () =>
        prisma.service.findUnique({
          where: { slug },
          include: {
            projects: {
              include: {
                project: true,
              },
              take: 3,
            },
          },
        }),
      getBackupServiceBySlug(slug)
    ),
    safeDb(
      `service detail settings ${slug} (vi)`,
      () =>
        prisma.setting.findMany({
          where: { key: { in: ['contact.email', 'contact.addressVi'] } },
        }),
      getBackupSettings(['contact.email', 'contact.addressVi'])
    ),
  ])

  return { service, settings }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await safeDb(
    `service metadata ${slug} (vi)`,
    () => prisma.service.findUnique({ where: { slug } }),
    getBackupServiceBySlug(slug)
  )
  if (!service) return {}

  return buildMetadata({
    locale: 'vi',
    path: `/services/${slug}`,
    title: service.metaTitleVi || service.titleVi,
    description: service.metaDescVi || service.shortDescVi || service.descriptionVi?.slice(0, 160) || '',
    image: service.imageUrl,
  })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { service, settings } = await getData(slug)
  if (!service || !service.isVisible) notFound()

  const s = settings.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {} as Record<string, string>)

  return (
    <ServiceDetailPageView
      locale="vi"
      service={service}
      relatedProjects={(service.projects ?? []).map((item: any) => item.project)}
      contact={{
        email: s['contact.email'] ?? 'sales@networkai.vn',
        address: s['contact.addressVi'] ?? contactContent.vi.fallbackAddress,
      }}
    />
  )
}
