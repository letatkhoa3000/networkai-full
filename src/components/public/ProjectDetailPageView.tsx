import Link from 'next/link'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import { Locale, localizeField, localizeStatus, withLocalePath } from '@/lib/site-locale'

function getStrings(locale: Locale) {
  if (locale === 'en') {
    return {
      back: 'Back to projects',
      tag: 'Case study',
      overview: 'Executive summary',
      challenge: 'Project context',
      solution: 'How we delivered it',
      outcome: 'Delivery outcomes',
      galleryTag: 'Gallery',
      galleryTitle: 'Selected project visuals',
      relatedTag: 'Capabilities delivered',
      relatedTitle: 'Related service capabilities',
      factsTitle: 'Project facts',
      nextTitle: 'Planning something similar?',
      nextBody:
        'Share the property type, opening timeline, and target systems. We will recommend the right scope, coordination plan, and delivery sequence.',
      nextCta: 'Request consultation',
      allServices: 'View all services',
      contextIntro:
        'This project sits inside an environment where technical depth, delivery timing, and operational continuity have to align from day one.',
      fallbackBody: 'Detailed project information will be updated soon.',
    }
  }

  return {
    back: 'Quay lại dự án',
    tag: 'Case study',
    overview: 'Tóm tắt điều hành',
    challenge: 'Bối cảnh dự án',
    solution: 'Cách chúng tôi triển khai',
    outcome: 'Kết quả triển khai',
    galleryTag: 'Thư viện',
    galleryTitle: 'Hình ảnh triển khai tiêu biểu',
    relatedTag: 'Năng lực đã triển khai',
    relatedTitle: 'Các dịch vụ liên quan',
    factsTitle: 'Thông tin nhanh',
    nextTitle: 'Đang chuẩn bị một dự án tương tự?',
    nextBody:
      'Chia sẻ loại hình công trình, timeline opening và các hệ thống cần triển khai. Chúng tôi sẽ đề xuất phạm vi, cách điều phối và trình tự phù hợp.',
    nextCta: 'Yêu cầu tư vấn',
    allServices: 'Xem tất cả dịch vụ',
    contextIntro:
      'Dự án này thuộc nhóm công trình yêu cầu phạm vi kỹ thuật, tiến độ và vận hành phải đồng bộ ngay từ ngày đầu.',
    fallbackBody: 'Thông tin chi tiết dự án sẽ được cập nhật sớm.',
  }
}

export default function ProjectDetailPageView({
  locale,
  project,
  relatedServices,
  contact,
}: {
  locale: Locale
  project: any
  relatedServices: any[]
  contact: { email: string; address: string }
}) {
  const text = getStrings(locale)
  const name = localizeField(locale, project.nameVi, project.nameEn)
  const body = localizeField(locale, project.descriptionVi, project.descriptionEn, '')
  const summary = localizeField(locale, project.shortDescVi, project.shortDescEn, body || text.fallbackBody)
  const contextItems = [
    project.location
      ? locale === 'en'
        ? `Delivered for a property located in ${project.location}.`
        : `Triển khai cho công trình tại ${project.location}.`
      : locale === 'en'
        ? 'Delivered in a hospitality or commercial environment that required structured infrastructure planning.'
        : 'Triển khai trong môi trường hospitality hoặc commercial cần cách lập kế hoạch hạ tầng rõ ràng.',
    project.hotelBrand
      ? locale === 'en'
        ? `Aligned with brand expectations for ${project.hotelBrand}.`
        : `Đồng bộ theo kỳ vọng vận hành của thương hiệu ${project.hotelBrand}.`
      : locale === 'en'
        ? 'Aligned with property-level operating requirements and handover expectations.'
        : 'Đồng bộ với yêu cầu vận hành tại công trình và kỳ vọng bàn giao.',
    locale === 'en'
      ? 'The work required coordination between design intent, implementation sequence, and operational readiness.'
      : 'Phạm vi công việc đòi hỏi điều phối giữa ý đồ thiết kế, trình tự thi công và mức độ sẵn sàng cho vận hành.',
  ]

  const solutionItems = [
    locale === 'en'
      ? 'Reviewed scope, integration dependencies, and site priorities before deployment.'
      : 'Rà soát phạm vi, các điểm phụ thuộc tích hợp và ưu tiên tại công trình trước khi triển khai.',
    locale === 'en'
      ? 'Coordinated multiple infrastructure disciplines so handover did not rely on fragmented packages.'
      : 'Điều phối nhiều hạng mục hạ tầng để việc bàn giao không bị tách rời theo từng gói rời rạc.',
    locale === 'en'
      ? 'Structured testing and delivery around the project phase and operational target date.'
      : 'Tổ chức kiểm thử và bàn giao bám theo giai đoạn dự án và mốc mục tiêu đưa vào vận hành.',
  ]

  const outcomeItems = [
    locale === 'en'
      ? 'Clearer implementation sequence across related systems.'
      : 'Trình tự triển khai giữa các hệ thống liên quan rõ ràng hơn.',
    locale === 'en'
      ? 'Reduced coordination gaps between technical teams and operational stakeholders.'
      : 'Giảm khoảng trống phối hợp giữa đội kỹ thuật và bên vận hành.',
    locale === 'en'
      ? 'A more reliable handover foundation for long-term support.'
      : 'Tạo nền tảng bàn giao ổn định hơn cho giai đoạn support dài hạn.',
  ]

  const factItems = [
    [locale === 'en' ? 'Location' : 'Địa điểm', project.location || (locale === 'en' ? 'Vietnam' : 'Việt Nam')],
    [locale === 'en' ? 'Brand' : 'Thương hiệu', project.hotelBrand || (locale === 'en' ? 'Independent property' : 'Công trình độc lập')],
    [locale === 'en' ? 'Status' : 'Trạng thái', localizeStatus(locale, project.status)],
    [locale === 'en' ? 'Project year' : 'Năm dự án', project.year?.toString() || (locale === 'en' ? 'Ongoing portfolio' : 'Danh mục đang vận hành')],
  ]

  return (
    <>
      <Header locale={locale} switchPath="/projects" />
      <main className="overflow-hidden pt-16">
        <section className="bg-[#f3f8fc] pb-16 pt-12 sm:pb-20 sm:pt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Link
              href={withLocalePath(locale, '/projects')}
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              <span>←</span>
              {text.back}
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.tag}</p>
                <h1 className="mt-4 max-w-[13ch] font-display text-[2.5rem] font-700 leading-[1.02] text-slate-950 sm:text-[3.15rem] lg:text-[3.65rem]">
                  {name}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">{summary}</p>
              </div>

              <div className="rounded-[32px] border border-[#d7e6f4] bg-white p-6 shadow-[0_24px_70px_rgba(15,91,255,0.08)] sm:p-7">
                <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.factsTitle}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {factItems.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-[#f8fbfe] px-4 py-4">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</div>
                      <div className="mt-2 text-sm leading-7 text-slate-700">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {project.thumbnailUrl ? (
              <div className="mt-8 overflow-hidden rounded-[36px] border border-[#d7e6f4] bg-white shadow-[0_28px_80px_rgba(15,91,255,0.08)]">
                <img src={project.thumbnailUrl} alt={name} className="h-[300px] w-full object-cover sm:h-[430px] lg:h-[560px]" />
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-9">
              <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.overview}</p>
              <p className="mt-5 text-base leading-8 text-slate-600">{body || text.fallbackBody}</p>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-[#f8fbfe] p-7 sm:p-9">
              <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.challenge}</p>
              <p className="mt-4 text-sm leading-7 text-slate-500">{text.contextIntro}</p>
              <div className="mt-5 space-y-3">
                {contextItems.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#eff5fb] py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-9">
                <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.solution}</p>
                <div className="mt-6 space-y-4">
                  {solutionItems.map((item, index) => (
                    <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-[#f8fbfe] px-4 py-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf4ff] font-display text-sm text-[#0f5bff]">
                        0{index + 1}
                      </div>
                      <p className="text-sm leading-7 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-9">
                <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.outcome}</p>
                <div className="mt-6 space-y-4">
                  {outcomeItems.map((item) => (
                    <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-[#f8fbfe] px-4 py-4">
                      <div className="mt-2 h-2 w-2 rounded-full bg-[#0f5bff]" />
                      <p className="text-sm leading-7 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[28px] border border-slate-200 bg-[#f8fbfe] p-6">
                  <h2 className="max-w-[14ch] font-display text-[1.8rem] font-700 leading-[1.04] text-slate-950 sm:text-[2.15rem]">
                    {text.nextTitle}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{text.nextBody}</p>
                  <Link
                    href={withLocalePath(locale, '/contact')}
                    className="mt-6 inline-flex items-center rounded-2xl bg-[#0f5bff] px-5 py-3 text-sm font-600 text-white transition-colors hover:bg-[#1d66ff]"
                  >
                    {text.nextCta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {Array.isArray(project.imageUrls) && project.imageUrls.length ? (
        <section className="bg-white py-12 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.galleryTag}</p>
              <h2 className="mt-4 max-w-[14ch] font-display text-[1.95rem] font-700 leading-[1.04] text-slate-950 sm:text-[2.3rem]">{text.galleryTitle}</h2>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {project.imageUrls.map((imageUrl: string, index: number) => (
                  <div key={`${imageUrl}-${index}`} className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                    <img src={imageUrl} alt={`${name} ${index + 1}`} className="h-72 w-full object-cover sm:h-96" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {relatedServices.length ? (
          <section className="bg-[#eff5fb] py-12 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-[#0f5bff]">{text.relatedTag}</p>
                  <h2 className="mt-4 max-w-[14ch] font-display text-[1.95rem] font-700 leading-[1.04] text-slate-950 sm:text-[2.3rem]">{text.relatedTitle}</h2>
                </div>
                <Link href={withLocalePath(locale, '/services')} className="text-sm text-slate-500 transition-colors hover:text-slate-950">
                  {text.allServices}
                </Link>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {relatedServices.map((service) => (
                  <Link
                    key={service.id}
                    href={withLocalePath(locale, `/services/${service.slug}`)}
                    className="group rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(15,91,255,0.12)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4ff] font-display text-sm text-[#0f5bff]">
                      {service.sortOrder ? String(service.sortOrder).padStart(2, '0') : '01'}
                    </div>
                    <h3 className="mt-6 font-display text-xl font-700 text-slate-950">
                      {localizeField(locale, service.titleVi, service.titleEn)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {localizeField(locale, service.shortDescVi || service.descriptionVi, service.shortDescEn || service.descriptionEn)}
                    </p>
                    <div className="mt-6 text-sm font-600 text-[#0f5bff]">
                      {locale === 'en' ? 'Open service ->' : 'Mở dịch vụ ->'}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <SiteFooter locale={locale} email={contact.email} address={contact.address} />
      </main>
    </>
  )
}
