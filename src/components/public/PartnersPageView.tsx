import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import { Locale } from '@/lib/site-locale'
import { siteCopy } from '@/lib/site-copy'
import { resolvePartnerLogo } from '@/lib/vendor-logos'

function PartnerGrid({ items }: { items: any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((partner) => {
        const logoUrl = resolvePartnerLogo(partner)
        return (
          <div key={partner.id} className="flex min-h-[110px] items-center justify-center rounded-[28px] border border-slate-200 bg-white px-6 py-5">
            {logoUrl ? (
              <img src={logoUrl} alt={partner.name} className="h-12 w-auto max-w-[180px] object-contain" />
            ) : (
              <span className="text-sm text-slate-500">{partner.name}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function PartnersPageView({
  locale,
  techPartners,
  hotelPartners,
}: {
  locale: Locale
  techPartners: any[]
  hotelPartners: any[]
}) {
  const copy = siteCopy[locale].partners

  return (
    <>
      <Header locale={locale} switchPath="/partners" />
      <main className="pt-[78px]">
        <section className="page-hero">
          <div className="page-shell">
            <div className="mb-12 max-w-5xl">
              <p className="section-tag mb-4">{copy.tag}</p>
              <h1 className="page-heading mb-5 max-w-[18ch]">{copy.title}</h1>
            </div>

            <h2 className="section-heading mb-8">{copy.techTitle}</h2>
            <PartnerGrid items={techPartners} />

          <h2 className="section-heading mb-8 mt-10">{copy.hotelTitle}</h2>
            <PartnerGrid items={hotelPartners} />
          </div>
        </section>
        <SiteFooter
          locale={locale}
          address={locale === 'en' ? '3rd Floor, Kim Son Building - 18 Phan Thanh Tai, Hai Chau, Da Nang' : 'Tầng 3, Kim Son Building - 18 Phan Thành Tài, Hải Châu, TP. Đà Nẵng'}
        />
      </main>
    </>
  )
}
