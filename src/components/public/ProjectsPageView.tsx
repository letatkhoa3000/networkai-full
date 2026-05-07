import Link from 'next/link'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import { Locale, localizeField, localizeStatus, withLocalePath } from '@/lib/site-locale'
import { siteCopy } from '@/lib/site-copy'

export default function ProjectsPageView({ locale, projects }: { locale: Locale; projects: any[] }) {
  const copy = siteCopy[locale].projects
  const brands = [...new Set(projects.map((p) => p.hotelBrand).filter(Boolean))]

  return (
    <>
      <Header locale={locale} switchPath="/projects" />
      <main className="pt-[78px]">
        <section className="page-hero">
          <div className="page-shell">
            <div className="mb-12 max-w-5xl">
              <p className="section-tag mb-4">{copy.tag}</p>
              <h1 className="page-heading mb-5 max-w-[18ch]">{copy.title}</h1>
              <p className="section-body max-w-[64ch]">{copy.body}</p>
            </div>

            <div className="mb-12 flex flex-wrap gap-2">
              {brands.map((brand) => (
                <span key={brand} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
                  {brand}
                </span>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={withLocalePath(locale, `/projects/${project.slug}`)}
                  className="overflow-hidden rounded-[28px] border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#bcd1ff] hover:shadow-[0_30px_80px_-60px_rgba(15,91,255,0.4)]"
                >
                  <div className="relative h-52 bg-slate-100">
                    {project.thumbnailUrl ? (
                      <img
                        src={project.thumbnailUrl}
                        alt={localizeField(locale, project.nameVi, project.nameEn)}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {project.hotelBrand ? (
                        <span className="rounded-full bg-[#0f5bff] px-3 py-1 text-xs font-600 text-white">
                          {project.hotelBrand}
                        </span>
                      ) : null}
                      <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1 text-xs text-slate-700">
                        {localizeStatus(locale, project.status)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {[project.location, project.year].filter(Boolean).join(' • ')}
                    </div>
                    <h3 className="mt-4 font-display text-[1.35rem] font-700 leading-tight text-slate-950">
                      {localizeField(locale, project.nameVi, project.nameEn)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {localizeField(locale, project.shortDescVi || project.descriptionVi, project.shortDescEn || project.descriptionEn)}
                    </p>
                  </div>
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
