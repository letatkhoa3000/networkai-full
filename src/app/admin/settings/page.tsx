import { prisma } from '@/lib/prisma'
import SettingsForm from '@/components/admin/SettingsForm'
import { adminCopy, getAdminLocale } from '@/lib/admin-locale'
import { safeDb } from '@/lib/safe-db'
import { getBackupSettings } from '@/lib/backup-content'

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].settings
  const settings = await safeDb(
    'admin settings list',
    () =>
      prisma.setting.findMany({
        orderBy: { key: 'asc' },
      }),
    getBackupSettings([
      'contact.email',
      'contact.phone',
      'contact.addressVi',
      'contact.addressEn',
      'contact.mapEmbed',
      'social.linkedin',
      'social.facebook',
      'seo.defaultTitleVi',
      'seo.defaultTitleEn',
      'seo.defaultDescVi',
      'seo.defaultDescEn',
      'seo.ogImageUrl',
      'company.foundedYear',
      'company.experienceYears',
    ])
  )

  const data = settings.reduce((acc, s) => {
    acc[s.key] = s.value
    return acc
  }, {} as Record<string, string>)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-slate-950">{copy.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{copy.subtitle}</p>
      </div>
      <SettingsForm data={data} locale={locale} />
    </div>
  )
}
