import { redirect } from 'next/navigation'
import AboutContentForm from '@/components/admin/AboutContentForm'
import { auth } from '@/lib/auth'
import { adminCopy, getAdminLocale, withAdminLocale } from '@/lib/admin-locale'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { getBackupCoreValues, getBackupHomepageSection } from '@/lib/backup-content'

export default async function AdminAboutPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].aboutPage
  const session = await auth()
  if (!session) redirect(withAdminLocale('/admin/login', locale))

  const [aboutSection, coreValues] = await Promise.all([
    safeDb(
      'admin about about_full',
      () => prisma.homepageSection.findUnique({ where: { key: 'about_full' } }),
      getBackupHomepageSection('about_full') ?? getBackupHomepageSection('about_short')
    ),
    safeDb('admin about core values', () => prisma.coreValue.findMany({ orderBy: { sortOrder: 'asc' } }), getBackupCoreValues()),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-slate-950">{copy.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{copy.subtitle}</p>
      </div>

      <AboutContentForm locale={locale} aboutSection={aboutSection} coreValues={coreValues} />
    </div>
  )
}
