import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ServiceEditForm from '@/components/admin/ServiceEditForm'
import { adminCopy, getAdminLocale } from '@/lib/admin-locale'
import { safeDb } from '@/lib/safe-db'
import { getBackupServices } from '@/lib/backup-content'

export default async function EditServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].forms
  const { id } = await params
  const service = await safeDb(
    `admin service detail ${id}`,
    () => prisma.service.findUnique({ where: { id } }),
    getBackupServices().find((item) => item.id === id) ?? null
  )
  if (!service) notFound()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-slate-950">{copy.serviceTitle}</h1>
        <p className="mt-1 text-sm text-slate-500">{service.titleVi}</p>
      </div>
      <ServiceEditForm service={service} locale={locale} />
    </div>
  )
}
