import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { adminCopy, getAdminLocale, withAdminLocale } from '@/lib/admin-locale'
import { safeDb } from '@/lib/safe-db'
import { getBackupCoreValues, getBackupPartners, getBackupProjects, getBackupServices } from '@/lib/backup-content'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].dashboard
  const session = await auth()
  if (!session) redirect(withAdminLocale('/admin/login', locale))

  const [projectCount, serviceCount, partnerCount, coreValueCount] = await Promise.all([
    safeDb('admin dashboard project count', () => prisma.project.count(), getBackupProjects().length),
    safeDb('admin dashboard service count', () => prisma.service.count(), getBackupServices().length),
    safeDb('admin dashboard partner count', () => prisma.partner.count(), getBackupPartners().length),
    safeDb(
      'admin dashboard core value count',
      () => prisma.coreValue.count({ where: { isVisible: true } }),
      getBackupCoreValues().length
    ),
  ])

  const counts = [projectCount, serviceCount, partnerCount, coreValueCount]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-slate-950">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">{copy.subtitle}</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {copy.stats.map((label, index) => (
          <div key={label} className="rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
            <p className="mb-2 text-sm text-slate-500">{label}</p>
            <p className="font-display text-3xl font-700 text-slate-950">
              {counts[index]}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {copy.cards.map((card) => (
          <Link
            key={card.href}
            href={withAdminLocale(card.href, locale)}
            className="group rounded-[24px] border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#bcd1ff] hover:shadow-[0_30px_80px_-60px_rgba(15,91,255,0.35)]"
          >
            <p className="mb-2 font-display text-lg font-700 text-slate-950 transition-colors group-hover:text-[#0f5bff]">{card.title}</p>
            <p className="text-sm leading-7 text-slate-600">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
