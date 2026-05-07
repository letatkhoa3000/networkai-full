import Link from 'next/link'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import type { ProductRecord } from '@/lib/products'
import { Locale, withLocalePath } from '@/lib/site-locale'
import { siteCopy } from '@/lib/site-copy'

function getStrings(locale: Locale) {
  if (locale === 'en') {
    return {
      previewTag: 'Featured product',
      previewTitle: 'Built as an operator surface, not a brochure.',
      previewBody:
        'The page keeps the real interface front and center so visitors immediately understand this is a working product, not just positioning copy.',
      problemsTag: 'Problems addressed',
      problemsTitle: 'The product is shaped around practical operational friction.',
      requestTitle: 'Want a walkthrough of NetOps Argus?',
      requestBody:
        'Share your environment, network scale, and operational bottlenecks. We will walk through the surfaces that matter most for your team.',
      requestPrimary: 'Request demo',
      requestSecondary: 'Open product page',
      footerAddress: '3rd Floor, Kim Son Building - 18 Phan Thanh Tai, Hai Chau, Da Nang',
    }
  }

  return {
    previewTag: 'Sản phẩm nổi bật',
    previewTitle: 'Được thể hiện như một bề mặt vận hành, không phải brochure.',
    previewBody:
      'Trang này đặt giao diện thật của sản phẩm ở vị trí trung tâm để người xem hiểu ngay đây là một công cụ đang hoạt động, không chỉ là phần mô tả định vị.',
    problemsTag: 'Vấn đề được giải quyết',
    problemsTitle: 'Sản phẩm thiết kế khắc phục điểm nghẽn trong vận hành thực tế.',
    requestTitle: 'Muốn xem walkthrough của NetOps Argus?',
    requestBody:
      'Chia sẻ môi trường triển khai, quy mô mạng và các bottleneck vận hành hiện tại. Chúng tôi sẽ walkthrough đúng trên các bề mặt mà đội ngũ của anh quan tâm nhất.',
    requestPrimary: 'Yêu cầu demo',
    requestSecondary: 'Mở trang sản phẩm',
    footerAddress: 'Tầng 3, Kim Son Building - 18 Phan Thành Tài, Hải Châu, TP. Đà Nẵng',
  }
}

export default function ProductsPageView({
  locale,
  products,
}: {
  locale: Locale
  products: ProductRecord[]
}) {
  const copy = siteCopy[locale].products
  const text = getStrings(locale)
  const featuredProduct = products[0]
  const problemItems =
    featuredProduct && locale === 'en'
      ? featuredProduct.problemAreasEn
      : featuredProduct?.problemAreasVi ?? []

  return (
    <>
      <Header locale={locale} switchPath="/products" />
      <main className="pt-[78px]">
      <section className="page-hero py-10 sm:py-12 lg:py-14">
          <div className="page-shell">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="max-w-none animate-fade-up">
                <p className="section-tag">{copy.tag}</p>
                <h1 className="page-heading mt-4 max-w-[28ch]">{copy.title}</h1>
                <p className="section-body mt-5 max-w-[90ch]">{copy.body}</p>
              </div>

              {featuredProduct ? (
                <div className="surface-panel animate-fade-up animate-delay-100 overflow-hidden">
                  <div className="border-b border-[var(--border-soft)] px-6 py-5">
                    <p className="section-tag">{text.previewTag}</p>
                    <h2 className="mt-3 font-display text-[1.6rem] font-700 leading-tight text-[color:var(--text-strong)]">
                      {featuredProduct.nameEn}
                    </h2>
                  </div>
                  <img
                    src={featuredProduct.previewImageUrl}
                    alt={`${featuredProduct.nameEn} preview`}
                    className="h-[360px] w-full object-cover object-top"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {featuredProduct ? (
          <section className="bg-white py-6 sm:py-8 lg:py-10">
            <div className="page-shell grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="surface-soft animate-fade-up p-7">
                <p className="section-tag">{text.previewTag}</p>
                <h2 className="section-heading mt-4 max-w-[24ch]">{text.previewTitle}</h2>
                <p className="section-body mt-5 max-w-[64ch]">{text.previewBody}</p>
                <p className="section-body mt-5 max-w-[64ch]">
                  {locale === 'en' ? featuredProduct.demoBlurbEn : featuredProduct.demoBlurbVi}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={withLocalePath(locale, `/products/${featuredProduct.slug}`)}
                    className="btn-primary px-5 py-3 text-sm font-700"
                  >
                    {locale === 'en' ? 'View product' : 'Xem sản phẩm'}
                  </Link>
                  <Link
                    href={withLocalePath(locale, '/contact')}
                    className="btn-secondary px-5 py-3 text-sm font-700"
                  >
                    {locale === 'en' ? featuredProduct.primaryCtaEn : featuredProduct.primaryCtaVi}
                  </Link>
                </div>
              </div>
              <div className="surface-card animate-fade-up animate-delay-100 overflow-hidden">
                <img
                  src={featuredProduct.secondaryImageUrl}
                  alt={`${featuredProduct.nameEn} secondary view`}
                  className="h-full min-h-[360px] w-full object-cover object-top"
                />
              </div>
            </div>
          </section>
        ) : null}

        {featuredProduct ? (
          <section className="bg-[var(--bg-page-alt)] py-6 sm:py-8 lg:py-10">
            <div className="page-shell">
              <div className="max-w-none">
                <p className="section-tag">{text.problemsTag}</p>
                <h2 className="section-heading mt-4 max-w-none whitespace-nowrap">{text.problemsTitle}</h2>
              </div>
              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                {problemItems.map((item, index) => (
                  <div key={item} className="surface-card animate-fade-up p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f0ff] font-display text-sm font-700 text-[#0f5bff]">
                      0{index + 1}
                    </div>
                    <p className="mt-6 text-sm leading-7 text-[color:var(--text-body)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {featuredProduct ? (
          <section className="bg-white py-6 sm:py-8 lg:py-10">
            <div className="mx-auto max-w-6xl px-6">
              <div className="surface-panel p-8 sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-10">
                <div className="max-w-none">
                  <p className="section-tag">{locale === 'en' ? 'Request walkthrough' : 'Yêu cầu walkthrough'}</p>
                  <h2 className="section-heading mt-4 max-w-[28ch]">{text.requestTitle}</h2>
                  <p className="section-body mt-5 max-w-[64ch]">{text.requestBody}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3 lg:mt-0">
                  <Link href={withLocalePath(locale, '/contact')} className="btn-primary px-5 py-3 text-sm font-700">
                    {text.requestPrimary}
                  </Link>
                  <Link
                    href={withLocalePath(locale, `/products/${featuredProduct.slug}`)}
                    className="btn-secondary px-5 py-3 text-sm font-700"
                  >
                    {text.requestSecondary}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <SiteFooter locale={locale} email="sales@networkai.vn" address={text.footerAddress} />
      </main>
    </>
  )
}
