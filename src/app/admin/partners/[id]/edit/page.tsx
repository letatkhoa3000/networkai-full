import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PartnerEditForm from '@/components/admin/PartnerEditForm'
import { adminCopy, getAdminLocale } from '@/lib/admin-locale'

export default async function EditPartnerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].forms
  const { id } = await params
  const partner = await prisma.partner.findUnique({ where: { id } })
  if (!partner) notFound()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-slate-950">{copy.partnerTitle}</h1>
        <p className="mt-1 text-sm text-slate-500">{partner.name}</p>
      </div>
      <PartnerEditForm partner={partner} locale={locale} />
    </div>
  )
}
