import type { Metadata } from 'next'
import HomePageView from '@/components/public/HomePageView'
import {
  getBackupCoreValues,
  getBackupHomepageSection,
  getBackupPartners,
  getBackupProjects,
  getBackupServices,
  getBackupSettings,
} from '@/lib/backup-content'
import { contactContent } from '@/lib/contact-content'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  locale: 'vi',
  path: '/',
  title: 'NetworkAI - Giai phap ha tang thong minh cho hospitality va enterprise',
  description:
    'Tu van va trien khai ICT, ELV, Smart Home, Smart Building cho khach san, resort va doanh nghiep.',
})

export default async function HomePage() {
  const [hero, aboutSection, services, projects, partners, coreValues, settings] = await Promise.all([
    safeDb('homepage hero (vi)', () => prisma.homepageSection.findUnique({ where: { key: 'hero' } }), getBackupHomepageSection('hero')),
    safeDb(
      'homepage about_short (vi)',
      () => prisma.homepageSection.findUnique({ where: { key: 'about_short' } }),
      getBackupHomepageSection('about_short')
    ),
    safeDb(
      'homepage services (vi)',
      () =>
        prisma.service.findMany({
          where: { featured: true, isVisible: true },
          orderBy: { sortOrder: 'asc' },
          take: 6,
        }),
      getBackupServices().filter((item) => item.featured).slice(0, 6)
    ),
    safeDb(
      'homepage projects (vi)',
      () =>
        prisma.project.findMany({
          where: { featured: true, isVisible: true },
          orderBy: { sortOrder: 'asc' },
          take: 5,
        }),
      getBackupProjects().filter((item) => item.featured || item.sortOrder <= 5).slice(0, 5)
    ),
    safeDb(
      'homepage partners (vi)',
      () =>
        prisma.partner.findMany({
          where: { isVisible: true },
          orderBy: { sortOrder: 'asc' },
          take: 12,
        }),
      getBackupPartners().slice(0, 12)
    ),
    safeDb(
      'homepage core values (vi)',
      () =>
        prisma.coreValue.findMany({
          where: { isVisible: true },
          orderBy: { sortOrder: 'asc' },
        }),
      getBackupCoreValues()
    ),
    safeDb(
      'homepage settings (vi)',
      () =>
        prisma.setting.findMany({
          where: { key: { in: ['contact.email', 'contact.addressVi'] } },
        }),
      getBackupSettings(['contact.email', 'contact.addressVi'])
    ),
  ])

  const s = settings.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {} as Record<string, string>)

  return (
    <HomePageView
      locale="vi"
      hero={hero}
      aboutSection={aboutSection}
      services={services}
      projects={projects}
      partners={partners}
      coreValues={coreValues}
      contact={{
        email: s['contact.email'] ?? 'sales@networkai.vn',
        address: s['contact.addressVi'] ?? contactContent.vi.fallbackAddress,
      }}
    />
  )
}
