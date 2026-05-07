import { redirect } from 'next/navigation'
import HomeContentForm from '@/components/admin/HomeContentForm'
import { auth } from '@/lib/auth'
import { adminCopy, getAdminLocale, withAdminLocale } from '@/lib/admin-locale'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { getBackupHomepageSection } from '@/lib/backup-content'

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].home
  const session = await auth()
  if (!session) redirect(withAdminLocale('/admin/login', locale))

  const [hero, intro] = await Promise.all([
    safeDb('admin home hero', () => prisma.homepageSection.findUnique({ where: { key: 'hero' } }), getBackupHomepageSection('hero')),
    safeDb(
      'admin home about_short',
      () => prisma.homepageSection.findUnique({ where: { key: 'about_short' } }),
      getBackupHomepageSection('about_short')
    ),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-slate-950">{copy.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{copy.subtitle}</p>
      </div>

      <HomeContentForm locale={locale} hero={hero} intro={intro} />
    </div>
  )
}
