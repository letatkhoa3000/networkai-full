import type { Metadata } from 'next'
import HomePageView from '@/components/public/HomePageView'
import { contactContent } from '@/lib/contact-content'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  path: '/',
  title: 'NetworkAI - Smart infrastructure solutions for hospitality and enterprise',
  description:
    'Consulting and implementation for ICT, ELV, Smart Home, and Smart Building systems across hospitality and enterprise projects.',
})

export default async function EnglishHomePage() {
  const [hero, aboutSection, services, projects, partners, coreValues, settings] = await Promise.all([
    safeDb('homepage hero (en)', () => prisma.homepageSection.findUnique({ where: { key: 'hero' } }), null),
    safeDb('homepage about_short (en)', () => prisma.homepageSection.findUnique({ where: { key: 'about_short' } }), null),
    safeDb(
      'homepage services (en)',
      () =>
        prisma.service.findMany({
          where: { featured: true, isVisible: true },
          orderBy: { sortOrder: 'asc' },
          take: 6,
        }),
      []
    ),
    safeDb(
      'homepage projects (en)',
      () =>
        prisma.project.findMany({
          where: { featured: true, isVisible: true },
          orderBy: { sortOrder: 'asc' },
          take: 5,
        }),
      []
    ),
    safeDb(
      'homepage partners (en)',
      () =>
        prisma.partner.findMany({
          where: { isVisible: true },
          orderBy: { sortOrder: 'asc' },
          take: 12,
        }),
      []
    ),
    safeDb(
      'homepage core values (en)',
      () =>
        prisma.coreValue.findMany({
          where: { isVisible: true },
          orderBy: { sortOrder: 'asc' },
        }),
      []
    ),
    safeDb(
      'homepage settings (en)',
      () =>
        prisma.setting.findMany({
          where: { key: { in: ['contact.email', 'contact.addressEn'] } },
        }),
      []
    ),
  ])

  const s = settings.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {} as Record<string, string>)

  return (
    <HomePageView
      locale="en"
      hero={hero}
      aboutSection={aboutSection}
      services={services}
      projects={projects}
      partners={partners}
      coreValues={coreValues}
      contact={{
        email: s['contact.email'] ?? 'sales@networkai.vn',
        address: s['contact.addressEn'] ?? contactContent.en.fallbackAddress,
      }}
    />
  )
}
