import Link from 'next/link'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import { Locale, localizeField, withLocalePath } from '@/lib/site-locale'

function getStrings(locale: Locale) {
  if (locale === 'en') {
    return {
      back: 'Back to services',
      tag: 'Service capability',
      overviewTitle: 'Overview',
      problemsTitle: 'Problems this service helps solve',
      scopeTitle: 'Typical scope of work',
      deliverablesTitle: 'Common deliverables',
      processTitle: 'Delivery process',
      fitTitle: 'Best-fit project types',
      systemsTitle: 'Systems and technology layers involved',
      outcomesTitle: 'Expected outcomes',
      faqTitle: 'Frequently asked questions',
      projectsTag: 'Applied in projects',
      projectsTitle: 'Projects where this capability was delivered',
      allProjects: 'View all projects',
      ctaTitle: 'Which scope items should be included in the project?',
      ctaBody:
        'Share the property type, timeline, and systems involved. We will recommend the right scope, sequencing, and delivery model.',
      ctaButton: 'Talk to our team',
      fallbackBody: 'Detailed service information will be updated soon.',
    }
  }

  return {
    back: 'Quay lại dịch vụ',
    tag: 'Năng lực dịch vụ',
    overviewTitle: 'Tổng quan',
    problemsTitle: 'Vấn đề dịch vụ này giúp giải quyết',
    scopeTitle: 'Phạm vi công việc thường gặp',
    deliverablesTitle: 'Deliverables bàn giao',
    processTitle: 'Quy trình triển khai',
    fitTitle: 'Loại công trình phù hợp',
    systemsTitle: 'Hệ thống và lớp công nghệ liên quan',
    outcomesTitle: 'Kết quả kỳ vọng',
    faqTitle: 'Câu hỏi thường gặp',
    projectsTag: 'Đã triển khai trong dự án',
    projectsTitle: 'Các dự án đã ứng dụng năng lực này',
    allProjects: 'Xem tất cả dự án',
    ctaTitle: 'Hạng mục nào cần đưa vào dự án?',
    ctaBody:
      'Chia sẻ loại hình công trình, timeline và các hệ thống liên quan. Chúng tôi sẽ đề xuất phạm vi, trình tự và cách triển khai phù hợp.',
    ctaButton: 'Trao đổi với đội ngũ',
    fallbackBody: 'Thông tin chi tiết dịch vụ sẽ được cập nhật sớm.',
  }
}

function getLocalizedItems(locale: Locale, vi?: string[] | null, en?: string[] | null) {
  const preferred = locale === 'en' ? en : vi
  const secondary = locale === 'en' ? vi : en
  const items = Array.isArray(preferred) && preferred.length ? preferred : secondary
  return Array.isArray(items) ? items.filter(Boolean) : []
}

function parseFaqItems(items: string[]) {
  return items.map((item) => {
    const [question, ...rest] = item.split('||')
    const answer = rest.join('||').trim()
    return {
      question: question?.trim() || item.trim(),
      answer,
    }
  })
}

export default function ServiceDetailPageView({
  locale,
  service,
  relatedProjects,
  contact,
}: {
  locale: Locale
  service: any
  relatedProjects: any[]
  contact: { email: string; address: string }
}) {
  const text = getStrings(locale)
  const title = localizeField(locale, service.titleVi, service.titleEn)
  const body = localizeField(locale, service.descriptionVi, service.descriptionEn, text.fallbackBody)
  const short = localizeField(locale, service.shortDescVi, service.shortDescEn, body)

  const problems = getLocalizedItems(locale, service.problemPointsVi, service.problemPointsEn)
  const scopeItems = getLocalizedItems(locale, service.scopeItemsVi, service.scopeItemsEn)
  const deliverables = getLocalizedItems(locale, service.deliverablesVi, service.deliverablesEn)
  const processSteps = getLocalizedItems(locale, service.processStepsVi, service.processStepsEn)
  const fitFor = getLocalizedItems(locale, service.fitForVi, service.fitForEn)
  const systemTags = getLocalizedItems(locale, service.systemTagsVi, service.systemTagsEn)
  const benefits = getLocalizedItems(locale, service.benefitsVi, service.benefitsEn)
  const faqItems = parseFaqItems(getLocalizedItems(locale, service.faqItemsVi, service.faqItemsEn))
  const problemList = problems.length
    ? problems
    : locale === 'en'
      ? [
          'Ambiguity between design intent, execution scope, and operational expectations.',
          'Coordination gaps between ICT, ELV, and adjacent building systems.',
          'Handover packages that are not strong enough for post-opening operations.',
        ]
      : [
          'Mơ hồ giữa ý đồ thiết kế, phạm vi triển khai và kỳ vọng vận hành.',
          'Khoảng trống phối hợp giữa ICT, ELV và các hệ thống tòa nhà liên quan.',
          'Hồ sơ bàn giao chưa đủ chắc để hỗ trợ vận hành sau opening.',
        ]
  const scopeList = scopeItems.length
    ? scopeItems
    : locale === 'en'
      ? [
          'Review scope against property type, operational model, and project phase.',
          'Coordinate adjacent systems, responsibilities, and implementation dependencies.',
          'Align testing, handover, and support checkpoints before go-live.',
        ]
      : [
          'Rà soát phạm vi theo loại hình công trình, mô hình vận hành và giai đoạn dự án.',
          'Điều phối các hệ thống liên quan, trách nhiệm và điểm phụ thuộc khi triển khai.',
          'Chốt mốc kiểm thử, bàn giao và support trước khi go-live.',
        ]
  const deliverableList = deliverables.length
    ? deliverables
    : locale === 'en'
      ? ['Scope review notes', 'Implementation coordination checkpoints', 'Testing and handover checklist']
      : ['Biên bản rà soát phạm vi', 'Các mốc điều phối triển khai', 'Checklist kiểm thử và bàn giao']
  const processList = processSteps.length
    ? processSteps
    : locale === 'en'
      ? [
          'Assess the brief, site conditions, and integration constraints.',
          'Define the right scope, sequence, and technical responsibilities.',
          'Coordinate implementation, testing, and handover milestones.',
        ]
      : [
          'Rà soát brief, điều kiện công trình và các ràng buộc tích hợp.',
          'Xác định đúng phạm vi, trình tự và trách nhiệm kỹ thuật.',
          'Điều phối triển khai, kiểm thử và các mốc bàn giao.',
        ]
  const fitList = fitFor.length
    ? fitFor
    : locale === 'en'
      ? ['Hotels and resorts', 'Complex mixed-use properties', 'Buildings with multi-system dependencies']
      : ['Khách sạn và resort', 'Công trình mixed-use phức tạp', 'Dự án có nhiều hệ thống phụ thuộc lẫn nhau']
  const systemTagList = systemTags.length
    ? systemTags
    : locale === 'en'
      ? ['ICT', 'ELV', 'Smart building', 'Testing', 'Handover']
      : ['ICT', 'ELV', 'Smart building', 'Kiểm thử', 'Bàn giao']
  const benefitList = benefits.length
    ? benefits
    : locale === 'en'
      ? [
          'Clearer scope definition and fewer surprises during execution.',
          'Better coordination between consultants, contractors, and operators.',
          'A more stable path from deployment to operational use.',
        ]
      : [
          'Phạm vi rõ hơn và ít phát sinh bất ngờ hơn trong lúc thi công.',
          'Phối hợp tốt hơn giữa tư vấn, nhà thầu và bên vận hành.',
          'Lộ trình ổn định hơn từ triển khai đến đưa vào sử dụng.',
        ]

  return (
    <>
      <Header locale={locale} switchPath="/services" />
      <main className="overflow-hidden pt-16">
        <section className="bg-[#f3f8fc] pb-14 pt-12 sm:pb-18 sm:pt-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Link
              href={withLocalePath(locale, '/services')}
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              <span aria-hidden="true">&larr;</span>
              {text.back}
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.24em] text-[#0f5bff]">{text.tag}</p>
                <h1 className="mt-4 max-w-[13ch] font-display text-[2.55rem] font-700 leading-[1.02] text-slate-950 sm:text-[3.15rem] lg:text-[3.6rem]">
                  {title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-[1.02rem]">{short}</p>
                {systemTagList.length ? (
                  <div className="mt-7 space-y-3">
                    {systemTagList.map((item) => (
                      <div
                        key={item}
                        className="w-full rounded-[20px] border border-[#cfe0ff] bg-white px-4 py-2 text-sm leading-6 text-slate-700 whitespace-normal break-words"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,91,255,0.08)] sm:p-7">
                <p className="text-xs uppercase tracking-[0.24em] text-[#0f5bff]">{text.problemsTitle}</p>
                <div className="mt-5 space-y-3">
                  {problemList.slice(0, 4).map((item) => (
                    <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-[#f8fbfe] px-4 py-4">
                      <div className="mt-2 h-2 w-2 rounded-full bg-[#0f5bff]" />
                      <p className="text-sm leading-7 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {service.imageUrl ? (
              <div className="mt-8 overflow-hidden rounded-[34px] border border-[#d7e6f4] bg-white shadow-[0_28px_80px_rgba(15,91,255,0.08)]">
                <img src={service.imageUrl} alt={title} className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[500px]" />
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
            <div className="rounded-[30px] border border-slate-200 bg-[#f8fbfe] p-7 sm:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-[#0f5bff]">{text.scopeTitle}</p>
                <div className="mt-5 space-y-3">
                  {scopeList.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
                      {item}
                    </div>
                  ))}
                </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-[#0f5bff]">{text.deliverablesTitle}</p>
                <div className="mt-5 space-y-3">
                  {deliverableList.map((item) => (
                    <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-[#f8fbfe] px-4 py-4">
                      <div className="mt-2 h-2 w-2 rounded-full bg-[#0f5bff]" />
                      <p className="text-sm leading-7 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </section>

        <section className="bg-[#eff5fb] py-12 sm:py-14">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
            <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-[#0f5bff]">{text.processTitle}</p>
              <div className="mt-5 space-y-4">
                {processList.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-[#f8fbfe] px-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf4ff] font-display text-sm text-[#0f5bff]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid h-full gap-6 auto-rows-fr content-start">
              <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-[#0f5bff]">{text.fitTitle}</p>
                <div className="mt-5 space-y-3">
                  {fitList.map((item) => (
                    <div
                      key={item}
                      className="w-full rounded-[22px] border border-slate-200 bg-[#f8fbfe] px-4 py-2 text-sm leading-6 text-slate-700 whitespace-normal break-words"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-[#0f5bff]">{text.outcomesTitle}</p>
                <div className="mt-5 space-y-3">
                  {benefitList.map((item) => (
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

        {faqItems.length ? (
        <section className="bg-white pt-14 pb-18 sm:pt-16 sm:pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.24em] text-[#0f5bff]">{text.faqTitle}</p>
              </div>
              <div className="mt-4 grid gap-5 lg:grid-cols-2 lg:items-start">
                {faqItems.map((item, index) => {
                  const isOddLast = faqItems.length % 2 === 1 && index === faqItems.length - 1

                  return (
                    <div
                      key={item.question}
                      className={[
                        'rounded-[28px] border border-slate-200 bg-[#f8fbfe] p-6',
                        isOddLast ? 'lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.625rem)]' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <h2 className="font-display text-[1.2rem] font-700 leading-tight text-slate-950">{item.question}</h2>
                      {item.answer ? <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p> : null}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="rounded-[34px] border border-slate-200 bg-[#f8fbfe] p-7 sm:p-9 lg:flex lg:items-end lg:justify-between lg:gap-8">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.24em] text-[#0f5bff]">{text.tag}</p>
                <h2 className="mt-4 max-w-none whitespace-nowrap font-display text-[1.95rem] font-700 leading-[1.04] text-slate-950 sm:text-[2.35rem]">
                  {text.ctaTitle}
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">{text.ctaBody}</p>
              </div>
              <div className="mt-8 lg:mt-0">
                <Link
                  href={withLocalePath(locale, '/contact')}
                  className="inline-flex items-center rounded-2xl bg-[#0f5bff] px-6 py-3 text-sm font-600 text-white transition-colors hover:bg-[#1d66ff]"
                >
                  {text.ctaButton}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {relatedProjects.length ? (
        <section className="bg-white py-12 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#0f5bff]">{text.projectsTag}</p>
                  <h2 className="mt-4 max-w-[15ch] font-display text-[1.95rem] font-700 leading-[1.04] text-slate-950 sm:text-[2.35rem]">
                    {text.projectsTitle}
                  </h2>
                </div>
                <Link href={withLocalePath(locale, '/projects')} className="text-sm text-slate-500 transition-colors hover:text-slate-950">
                  {text.allProjects}
                </Link>
              </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {relatedProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={withLocalePath(locale, `/projects/${project.slug}`)}
                    className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(15,91,255,0.12)]"
                  >
                    {project.thumbnailUrl ? (
                      <img src={project.thumbnailUrl} alt={localizeField(locale, project.nameVi, project.nameEn)} className="h-56 w-full object-cover" />
                    ) : (
                      <div className="h-56 bg-[linear-gradient(135deg,#dbe8ff,#f3f8fc)]" />
                    )}
                    <div className="p-6">
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                        {[project.location, project.year].filter(Boolean).join(' • ')}
                      </div>
                      <h3 className="mt-4 font-display text-[1.3rem] font-700 leading-tight text-slate-950">
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
        ) : null}

        <SiteFooter locale={locale} email={contact.email} address={contact.address} />
      </main>
    </>
  )
}
