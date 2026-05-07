import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import { Locale, localizeField } from '@/lib/site-locale'
import { siteCopy } from '@/lib/site-copy'

const titleSizeClass = {
  sm: 'text-[1.85rem] sm:text-[2.15rem] lg:text-[2.4rem]',
  md: 'text-[2rem] sm:text-[2.35rem] lg:text-[2.7rem]',
  lg: 'text-[2.15rem] sm:text-[2.55rem] lg:text-[2.95rem]',
} as const

const bodySizeClass = {
  sm: 'text-[0.95rem] leading-7',
  md: 'text-base leading-8',
  lg: 'text-[1.08rem] leading-8',
} as const

const cardTitleSizeClass = {
  sm: 'text-[1.02rem]',
  md: 'text-[1.12rem]',
  lg: 'text-[1.24rem]',
} as const

const cardBodySizeClass = {
  sm: 'text-[0.92rem] leading-7',
  md: 'text-sm leading-7',
  lg: 'text-[1rem] leading-8',
} as const

function pickTitleSize(value?: string | null) {
  return titleSizeClass[(value as keyof typeof titleSizeClass) || 'md'] ?? titleSizeClass.md
}

function pickBodySize(value?: string | null) {
  return bodySizeClass[(value as keyof typeof bodySizeClass) || 'md'] ?? bodySizeClass.md
}

function pickCardTitleSize(value?: string | null) {
  return cardTitleSizeClass[(value as keyof typeof cardTitleSizeClass) || 'md'] ?? cardTitleSizeClass.md
}

function pickCardBodySize(value?: string | null) {
  return cardBodySizeClass[(value as keyof typeof cardBodySizeClass) || 'md'] ?? cardBodySizeClass.md
}

export default function AboutPageView({
  locale,
  aboutSection,
  coreValues,
}: {
  locale: Locale
  aboutSection: any
  coreValues: any[]
}) {
  const copy = siteCopy[locale].about
  const aboutBody = localizeField(locale, aboutSection?.bodyVi, aboutSection?.bodyEn) || ''
  const aboutParagraphs = aboutBody
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean)

  return (
    <>
      <Header locale={locale} switchPath="/about" />
      <main className="pt-[78px]">
        <section className="page-hero">
          <div className="page-shell">
            <div className="max-w-none">
              <p className="section-tag">{copy.tag}</p>
              <h1 className={`page-heading mt-4 max-w-[36ch] ${pickTitleSize(aboutSection?.titleSize)}`}>
                {localizeField(locale, aboutSection?.titleVi, aboutSection?.titleEn)}
              </h1>
              <div className={`section-body mt-5 max-w-[118ch] space-y-4 ${pickBodySize(aboutSection?.bodySize)}`}>
                {(aboutParagraphs.length ? aboutParagraphs : [aboutBody]).map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

          <div className="mt-8">
              <p className="section-tag">{copy.valuesTitle}</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {coreValues.map((val, i) => (
                  <div key={val.id} className="surface-card flex flex-col p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#e7f0ff]">
                        <span className="font-display text-sm font-700 text-[#0f5bff]">0{i + 1}</span>
                      </div>
                      <h2
                        className={`min-w-0 font-display font-700 leading-tight text-[color:var(--text-strong)] ${pickCardTitleSize(
                          val.titleSize
                        )}`}
                      >
                        {localizeField(locale, val.titleVi, val.titleEn)}
                      </h2>
                    </div>
                    <p className={`text-[color:var(--text-body)] ${pickCardBodySize(val.bodySize)}`}>
                      {localizeField(locale, val.descriptionVi, val.descriptionEn)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SiteFooter
          locale={locale}
          address={
            locale === 'en'
              ? '3rd Floor, Kim Son Building - 18 Phan Thanh Tai, Hai Chau, Da Nang'
              : 'Tầng 3, Kim Son Building - 18 Phan Thành Tài, Hải Châu, TP. Đà Nẵng'
          }
        />
      </main>
    </>
  )
}
