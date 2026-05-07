import Link from 'next/link'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import ServiceIcon from '@/components/ServiceIcon'
import { Locale, localizeField, withLocalePath } from '@/lib/site-locale'
import { siteCopy } from '@/lib/site-copy'

export default function ServicesPageView({ locale, services }: { locale: Locale; services: any[] }) {
  const copy = siteCopy[locale].services
  const allServicesLabel = locale === 'en' ? 'All services' : 'Xem tất cả dịch vụ'

  return (
    <>
      <Header locale={locale} switchPath="/services" />
      <main className="pt-[78px]">
        <section className="page-hero">
          <div className="page-shell">
            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-5xl">
                <p className="section-tag mb-4">{copy.tag}</p>
                <h1 className="page-heading mb-5 max-w-[18ch]">{copy.title}</h1>
                <p className="section-body max-w-[64ch]">{copy.body}</p>
              </div>
              <Link
                href={withLocalePath(locale, '/services')}
                className="inline-flex items-center gap-2 text-sm font-600 text-[#0f5bff] transition-colors hover:text-[#0848d6]"
              >
                {allServicesLabel}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={withLocalePath(locale, `/services/${service.slug}`)}
                  className="surface-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#bcd1ff] hover:shadow-[0_30px_80px_-60px_rgba(15,91,255,0.18)]"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <ServiceIcon value={service.icon} title={localizeField(locale, service.titleVi, service.titleEn)} />
                    <h3 className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-display text-[1.18rem] font-700 leading-tight text-[color:var(--text-strong)]">
                      {localizeField(locale, service.titleVi, service.titleEn)}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-[color:var(--text-body)]">
                    {localizeField(locale, service.shortDescVi || service.descriptionVi, service.shortDescEn || service.descriptionEn)}
                  </p>
                </Link>
              ))}
            </div>
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
