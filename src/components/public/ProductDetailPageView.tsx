import Link from 'next/link'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import type { ProductRecord } from '@/lib/products'
import { Locale, withLocalePath } from '@/lib/site-locale'

function getStrings(locale: Locale) {
  if (locale === 'en') {
    return {
      back: 'Back to products',
      tag: 'NetworkAI product',
      overviewTitle: 'Overview',
      capabilitiesTitle: 'Core capabilities',
      featuresTitle: 'What the platform helps your team do',
      workflowTitle: 'Operating flow',
      useCasesTitle: 'Best-fit environments',
      ctaTitle: 'Want a walkthrough of this product?',
      ctaBody:
        'Share the environment, team structure, and operational pain points. We will map the product flow to your network context and recommend the right next step.',
      footerAddress: '3rd Floor, Kim Son Building - 18 Phan Thanh Tai, Hai Chau, Da Nang',
    }
  }

  return {
    back: 'Quay lại sản phẩm',
    tag: 'Sản phẩm của NetworkAI',
    overviewTitle: 'Tổng quan',
    capabilitiesTitle: 'Năng lực cốt lõi',
    featuresTitle: 'Nền tảng hỗ trợ đội ngũ làm gì',
    workflowTitle: 'Luồng vận hành',
    useCasesTitle: 'Môi trường phù hợp nhất',
    ctaTitle: 'Muốn xem demo hoặc walkthrough sản phẩm?',
    ctaBody:
      'Chia sẻ môi trường triển khai, cấu trúc đội ngũ và pain point hiện tại. Chúng tôi sẽ map luồng sản phẩm vào bối cảnh mạng của bạn và đề xuất bước tiếp theo phù hợp.',
    footerAddress: 'Tầng 3, Kim Son Building - 18 Phan Thành Tài, Hải Châu, TP. Đà Nẵng',
  }
}

export default function ProductDetailPageView({
  locale,
  product,
}: {
  locale: Locale
  product: ProductRecord
}) {
  const text = getStrings(locale)
  const name = locale === 'en' ? product.nameEn : product.nameVi
  const category = locale === 'en' ? product.categoryEn : product.categoryVi
  const short = locale === 'en' ? product.shortDescEn : product.shortDescVi
  const description = locale === 'en' ? product.descriptionEn : product.descriptionVi
  const primaryCta = locale === 'en' ? product.primaryCtaEn : product.primaryCtaVi
  const secondaryCta = locale === 'en' ? product.secondaryCtaEn : product.secondaryCtaVi
  const capabilities = locale === 'en' ? product.capabilitiesEn : product.capabilitiesVi

  return (
    <>
      <Header locale={locale} switchPath={`/products/${product.slug}`} />
      <main className="overflow-hidden pt-16">
        <section className="bg-[#f3f8fc] pb-16 pt-12 sm:pb-20 sm:pt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Link
              href={withLocalePath(locale, '/products')}
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              <span aria-hidden="true">&larr;</span>
              {text.back}
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.tag}</p>
                <h1 className="mt-4 max-w-[13ch] font-display text-[2.5rem] font-700 leading-[1.02] text-slate-950 sm:text-[3.15rem] lg:text-[3.65rem]">
                  {name}
                </h1>
                <p className="mt-5 inline-flex rounded-full border border-[#cfe0ff] bg-white px-4 py-2 text-sm text-slate-700">
                  {category}
                </p>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">{short}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={withLocalePath(locale, '/contact')}
                    className="rounded-2xl bg-[#0f5bff] px-6 py-3 text-sm font-600 text-white transition-colors hover:bg-[#1d66ff]"
                  >
                    {primaryCta}
                  </Link>
                  <Link
                    href={withLocalePath(locale, '/contact')}
                    className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-950"
                  >
                    {secondaryCta}
                  </Link>
                </div>
              </div>

              <div className="rounded-[32px] border border-[#d7e6f4] bg-white p-6 shadow-[0_24px_70px_rgba(15,91,255,0.08)] sm:p-7">
                <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.capabilitiesTitle}</p>
                <div className="mt-6 space-y-4">
                  {capabilities.map((item) => (
                    <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-[#f8fbfe] px-4 py-4">
                      <div className="mt-2 h-2 w-2 rounded-full bg-[#0f5bff]" />
                      <p className="text-sm leading-7 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-9">
              <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.overviewTitle}</p>
              <p className="mt-5 text-base leading-8 text-slate-600">{description}</p>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-[#f8fbfe] p-7 sm:p-9">
              <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.workflowTitle}</p>
              <div className="mt-6 space-y-4">
                {product.workflow.map((step, index) => {
                  const title = locale === 'en' ? step.titleEn : step.titleVi
                  const body = locale === 'en' ? step.bodyEn : step.bodyVi

                  return (
                    <div key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf4ff] font-display text-sm text-[#0f5bff]">
                        0{index + 1}
                      </div>
                      <div>
                        <h2 className="text-base font-700 text-slate-950">{title}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#eff5fb] py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-9">
                <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.featuresTitle}</p>
                <div className="mt-6 grid gap-4">
                  {product.features.map((feature) => {
                    const title = locale === 'en' ? feature.titleEn : feature.titleVi
                    const body = locale === 'en' ? feature.bodyEn : feature.bodyVi

                    return (
                      <div key={title} className="rounded-2xl border border-slate-200 bg-[#f8fbfe] px-5 py-5">
                  <h2 className="font-display text-[1.15rem] font-700 leading-tight text-slate-950">{title}</h2>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-[32px] border border-[#cfe0ff] bg-[#edf4ff] p-7 sm:p-9">
                <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.useCasesTitle}</p>
                <div className="mt-6 space-y-4">
                  {product.useCases.map((useCase) => {
                    const title = locale === 'en' ? useCase.titleEn : useCase.titleVi
                    const body = locale === 'en' ? useCase.bodyEn : useCase.bodyVi

                    return (
                      <div key={title} className="rounded-2xl border border-[#cfe0ff] bg-white px-5 py-5">
                        <h2 className="font-display text-[1.15rem] font-700 leading-tight text-slate-950">{title}</h2>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="rounded-[34px] border border-slate-900 bg-slate-950 p-7 text-white shadow-[0_30px_90px_rgba(15,23,42,0.2)] sm:p-9 lg:flex lg:items-end lg:justify-between lg:gap-8">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.26em] text-[#60a5ff]">{text.tag}</p>
                <h2 className="mt-4 max-w-[14ch] font-display text-[1.95rem] font-700 leading-[1.04] sm:text-[2.3rem]">{text.ctaTitle}</h2>
                <p className="mt-5 text-base leading-8 text-slate-300">{text.ctaBody}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 lg:mt-0">
                <Link
                  href={withLocalePath(locale, '/contact')}
                  className="rounded-2xl bg-[#0f5bff] px-6 py-3 text-sm font-600 text-white transition-colors hover:bg-[#1d66ff]"
                >
                  {primaryCta}
                </Link>
                <Link
                  href={withLocalePath(locale, '/contact')}
                  className="rounded-2xl border border-slate-700 bg-transparent px-6 py-3 text-sm text-slate-200 transition-colors hover:border-slate-100 hover:text-white"
                >
                  {secondaryCta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter locale={locale} email="sales@networkai.vn" address={text.footerAddress} />
      </main>
    </>
  )
}
