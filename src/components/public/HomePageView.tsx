import Link from 'next/link'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import ServiceIcon from '@/components/ServiceIcon'
import { Locale, localizeField, withLocalePath } from '@/lib/site-locale'
import { siteCopy } from '@/lib/site-copy'
import { resolvePartnerLogo } from '@/lib/vendor-logos'

function getHomeStrings(locale: Locale) {
  if (locale === 'en') {
    return {
      badge: 'Hospitality and enterprise infrastructure partner',
      heroTitle: 'Smart infrastructure solutions for businesses',
      heroLead:
        'We partner with world-leading groups such as Marriott, Hilton, Accor, and IHG to create sustainable, optimized, and high-end technology infrastructures.',
      heroPrimary: 'Explore services',
      heroSecondary: 'View projects',
      heroPanelTitle: 'Why teams choose us',
      heroPanelItems: [
        'Technical review before expensive decisions are locked',
        'Coordinated delivery across ICT, ELV, and building systems',
        'A handover path that stays useful after go-live',
      ],
      heroFeatureLabel: 'Featured delivery',
      logoStrip: 'Trusted partner ecosystem',
      aboutTag: 'About NetworkAI',
      aboutTitle: 'NETWORKAI - Amazing solution',
      aboutBody:
        'With a seasoned team of experts, NetworkAI delivers turnkey solutions from design consultancy to full system execution. We master leading technology platforms such as GPON Huawei, Ruckus Wi-Fi, and Control4 to realize the most demanding standards of every investor.',
      aboutCta: 'Learn more',
      servicesTag: 'Core services',
      servicesTitle: 'Service scopes designed for complex buildings and real operations.',
      servicesBody:
        'Each engagement is shaped around the property type, systems involved, opening schedule, and support model required after handover.',
      projectsTag: 'Featured projects',
      projectsTitle: 'Implementation project details',
      projectsBody:
        'We highlight scope, environment, and project fit so visitors can understand how the work was actually executed.',
      projectSideTitle: 'Project highlights',
      projectSideBody:
        'Selected works shown here represent the kind of coordination depth, technical packaging, and operational fit we aim for on every delivery.',
      projectFallbackTitle: 'Delivery themes',
      projectFallbackItems: [
        'Hospitality environments with multi-system dependencies',
        'Projects where timeline and operational readiness must align',
        'Scope packaged for long-term support after handover',
      ],
      moreProjects: 'View all projects',
      ctaTitle: 'Need a stronger technical plan for the next phase?',
      ctaBody:
        'Share the project phase, opening schedule, and systems involved. We will recommend the right sequence, scope, and delivery approach.',
      ctaButton: 'Talk to our team',
    }
  }

  return {
    badge: 'Đối tác hạ tầng cho hospitality và enterprise',
    heroTitle: 'Giải pháp hạ tầng thông minh cho doanh nghiệp',
    heroLead:
      'Chúng tôi đồng hành cùng các tập đoàn hàng đầu thế giới như Marriott, Hilton, Accor và IHG để kiến tạo những công trình công nghệ bền vững, tối ưu vận hành và nâng tầm trải nghiệm khách hàng.',
    heroPrimary: 'Xem dịch vụ',
    heroSecondary: 'Xem dự án',
    heroPanelTitle: 'Vì sao khách hàng chọn chúng tôi',
    heroPanelItems: [
      'Rà soát kỹ thuật trước khi khóa các quyết định tốn chi phí',
      'Điều phối đồng bộ giữa ICT, ELV và các hệ thống tòa nhà',
      'Lộ trình bàn giao vẫn hữu ích cho vận hành sau go-live',
    ],
    heroFeatureLabel: 'Dự án tiêu biểu',
    logoStrip: 'Hệ sinh thái đối tác tiêu biểu',
    aboutTag: 'Về NetworkAI',
    aboutTitle: 'NETWORKAI- Amazing solution',
    aboutBody:
      'Sở hữu đội ngũ chuyên gia dày dặn kinh nghiệm, NetworkAI cung cấp giải pháp tổng thể (Turnkey) từ tư vấn thiết kế đến thực thi hệ thống. Chúng tôi làm chủ các nền tảng công nghệ hàng đầu (GPON Huawei, Ruckus Wi-Fi, Control4) để hiện thực hóa những tiêu chuẩn khắt khe nhất của mọi chủ đầu tư',
    aboutCta: 'Tìm hiểu thêm',
    servicesTag: 'Dịch vụ cốt lõi',
    servicesTitle: 'Tư vấn thiết kế, hoàn thiện triển khai, hỗ trợ vận hành.',
    servicesBody:
      'Mỗi dự án được định hình theo loại hình công trình, các hệ thống liên quan, mốc opening và mô hình hỗ trợ sau bàn giao.',
    projectsTag: 'Dự án tiêu biểu',
    projectsTitle: 'Chi tiết các dự án triển khai',
    projectsBody:
      'Chúng tôi thể hiện rõ phạm vi công việc, bối cảnh triển khai và mức độ phù hợp của giải pháp để khách hàng hiểu cách dự án được thực hiện.',
    projectSideTitle: 'Điểm nổi bật của danh mục',
    projectSideBody:
      'Các dự án tiêu biểu thể hiện cách chúng tôi đóng gói phạm vi kỹ thuật, điều phối triển khai và chuẩn bị cho vận hành sau bàn giao.',
    projectFallbackTitle: 'Định hướng triển khai',
    projectFallbackItems: [
      'Công trình hospitality có nhiều hệ thống phụ thuộc lẫn nhau',
      'Dự án cần đồng bộ giữa tiến độ thi công và mức độ sẵn sàng vận hành',
      'Phạm vi được tổ chức để support dài hạn sau bàn giao',
    ],
    moreProjects: 'Xem tất cả dự án',
    ctaTitle: 'Cần tối ưu hóa lộ trình kỹ thuật cho giai đoạn chuyển tiếp.',
    ctaBody:
      'Chia sẻ giai đoạn dự án, mốc opening và các hệ thống liên quan. Chúng tôi sẽ đề xuất trình tự, phạm vi và cách triển khai phù hợp.',
    ctaButton: 'Trao đổi với đội ngũ',
  }
}

function getServiceCardTitle(locale: Locale, service: any) {
  if (service.slug === 'ict-system-design') {
    return locale === 'en' ? 'System design' : 'Thiết kế hệ thống'
  }
  return localizeField(locale, service.titleVi, service.titleEn)
}

export default function HomePageView({
  locale,
  hero,
  aboutSection,
  services,
  projects,
  partners,
  coreValues,
  contact,
}: {
  locale: Locale
  hero: any
  aboutSection: any
  services: any[]
  projects: any[]
  partners: any[]
  coreValues: any[]
  contact: { email: string; address: string }
}) {
  const text = getHomeStrings(locale)
  const heroTitle = text.heroTitle
  const heroSummary = text.heroLead
  const aboutTitle = text.aboutTitle
  const aboutBody = text.aboutBody
  const featuredProject = projects[0]
  const secondaryProjects = projects.slice(1, 3)
  const servicesLinkLabel = locale === 'en' ? 'All services' : 'Xem tất cả dịch vụ'
  const heroPanelHeading = locale === 'en' ? 'Why clients choose us' : 'Vì sao khách hàng chọn chúng tôi'
  const heroPanelBody =
    locale === 'en'
      ? 'Built for premium hotels, resorts, and mixed-use properties where infrastructure decisions need stronger technical control.'
      : 'Được xây dựng cho khách sạn, resort và công trình mixed-use cao cấp, nơi các quyết định hạ tầng cần được kiểm soát kỹ thuật chặt hơn.'
  const heroPillars =
    locale === 'en'
      ? [
          'Technical review before costly site changes are locked in',
          'Coordinated delivery across ICT, ELV, and building systems',
          'Testing and handover aligned with operational readiness',
        ]
      : [
          'Rà soát kỹ thuật trước khi phát sinh thay đổi tốn kém tại công trình',
          'Điều phối đồng bộ giữa ICT, ELV và các hệ thống tòa nhà',
          'Kiểm thử và bàn giao bám theo mức độ sẵn sàng vận hành',
        ]
  const heroFactLabel = locale === 'en' ? 'Best fit' : 'Phù hợp cho'
  const heroFactItems =
    locale === 'en'
      ? ['Luxury hotels', 'Resorts', 'Branded residences', 'Mixed-use']
      : ['Khách sạn cao cấp', 'Resort', 'Branded residence', 'Mixed-use']

  return (
    <>
      <Header locale={locale} switchPath="/" />
      <main className="pt-[78px]">
        <section className="page-hero relative overflow-hidden pb-8 pt-8 sm:pb-10 sm:pt-10 lg:pb-10 lg:pt-10">
          <div className="absolute left-[-120px] top-[-70px] h-[280px] w-[280px] rounded-full bg-[#2f6fff]/10 blur-3xl" />
          <div className="absolute right-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full bg-[#2f6fff]/8 blur-3xl" />
          <div className="page-shell relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,1fr)] lg:items-stretch">
            <div className="animate-fade-up">
              <div className="surface-panel flex h-full flex-col p-6 sm:p-7">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#cddcff] bg-white px-4 py-2 text-[11px] font-600 uppercase tracking-[0.2em] text-[#0f5bff] sm:text-xs">
                  <span className="h-2 w-2 rounded-full bg-[#0f5bff]" />
                  {text.badge}
                </div>
                <h1
                  className="mt-6 max-w-[14ch] font-display text-[2.15rem] font-700 leading-[0.98] tracking-[-0.05em] text-[color:var(--text-strong)] sm:text-[2.55rem] lg:text-[2.95rem]"
                >
                  {heroTitle}
                </h1>
                <p className="mt-5 max-w-[34rem] text-base leading-8 text-[color:var(--text-body)]">
                  {heroSummary}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {heroFactItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-[#cfe0ff] bg-white px-4 py-2 text-sm text-[color:var(--text-body)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={withLocalePath(locale, '/services')}
                    className="btn-primary px-6 py-3.5 text-sm font-700"
                  >
                    {text.heroPrimary}
                  </Link>
                  <Link
                    href={withLocalePath(locale, '/projects')}
                    className="btn-secondary px-6 py-3.5 text-sm font-700"
                  >
                    {text.heroSecondary}
                  </Link>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {siteCopy[locale].home.stats.map((item: any) => (
                    <div key={item.label} className="surface-soft px-4 py-4">
                      <div className="font-display text-[1.95rem] font-700 leading-none text-[color:var(--text-strong)]">{item.num}</div>
                      <div className="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-fade-up animate-delay-100">
              <div className="surface-panel flex h-full flex-col p-6 sm:p-7">
                <p className="section-tag">{heroPanelHeading}</p>
                <p className="mt-4 max-w-[30rem] text-[0.98rem] leading-7 text-[color:var(--text-body)]">{heroPanelBody}</p>
                <div className="mt-6 space-y-4">
                  {heroPillars.map((item, index) => (
                    <div key={item} className="surface-soft flex gap-4 px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e7f0ff] font-display text-sm font-700 text-[#0f5bff]">
                        0{index + 1}
                      </div>
                      <p className="text-[0.92rem] leading-6 text-[color:var(--text-body)]">{item}</p>
                    </div>
                  ))}
                </div>
                {featuredProject ? (
                  <Link
                    href={withLocalePath(locale, `/projects/${featuredProject.slug}`)}
                    className="surface-card mt-6 block overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-55px_rgba(15,91,255,0.16)]"
                  >
                    <div className="h-56 bg-slate-100 sm:h-60">
                      {featuredProject.thumbnailUrl ? (
                        <img
                          src={featuredProject.thumbnailUrl}
                          alt={localizeField(locale, featuredProject.nameVi, featuredProject.nameEn)}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                        {[featuredProject.location, featuredProject.year].filter(Boolean).join(' • ')}
                      </div>
                      <h3 className="mt-3 font-display text-[1.42rem] font-700 leading-tight text-[color:var(--text-strong)]">
                        {localizeField(locale, featuredProject.nameVi, featuredProject.nameEn)}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--text-body)]">
                        {localizeField(
                          locale,
                          featuredProject.shortDescVi || featuredProject.descriptionVi,
                          featuredProject.shortDescEn || featuredProject.descriptionEn
                        )}
                      </p>
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--border-soft)] bg-white py-6">
          <div className="page-shell">
            <p className="section-tag mb-5">{text.logoStrip}</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {partners.slice(0, 6).map((partner) => {
                const logoUrl = resolvePartnerLogo(partner)
                return (
                  <div key={partner.id} className="surface-card flex min-h-[92px] items-center justify-center px-4 py-5 shadow-none">
                    {logoUrl ? (
                      <img src={logoUrl} alt={partner.name} className="h-10 w-auto max-w-[130px] object-contain" />
                    ) : (
                      <span className="text-sm text-[color:var(--text-body)]">{partner.name}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-page-alt)] py-6 sm:py-6 lg:py-6">
          <div className="page-shell">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-6xl">
                <p className="section-tag">{text.aboutTag}</p>
                <h2 className="section-heading mt-4 max-w-[42ch]">
                  {aboutTitle}
                </h2>
                <p className="section-body mt-4 max-w-[96ch]">{aboutBody}</p>
              </div>
              <div className="flex justify-start lg:justify-end">
                <Link
                  href={withLocalePath(locale, '/about')}
                  className="inline-flex items-center gap-2 text-sm font-600 text-[#0f5bff] transition-colors hover:text-[#0848d6]"
                >
                  {text.aboutCta}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {coreValues.map((value, index) => (
                <div key={value.id} className="surface-card p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#e7f0ff] font-display text-sm font-700 text-[#0f5bff]">
                      0{index + 1}
                    </div>
                    <h3 className="min-w-0 font-display text-[1.12rem] font-700 leading-tight text-[color:var(--text-strong)]">
                      {localizeField(locale, value.titleVi, value.titleEn)}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text-body)]">
                    {localizeField(locale, value.descriptionVi, value.descriptionEn)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-6 sm:py-6 lg:py-6">
          <div className="page-shell">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-5xl">
                <p className="section-tag">{text.servicesTag}</p>
                <h2 className="section-heading mt-4 max-w-[34ch] whitespace-nowrap">
                  {text.servicesTitle}
                </h2>
                <p className="section-body mt-4 max-w-[76ch]">{text.servicesBody}</p>
              </div>
              <div className="flex justify-start lg:justify-end">
                <Link
                  href={withLocalePath(locale, '/services')}
                  className="inline-flex items-center gap-2 text-sm font-600 text-[#0f5bff] transition-colors hover:text-[#0848d6]"
                >
                  {servicesLinkLabel}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={withLocalePath(locale, `/services/${service.slug}`)}
                  className="surface-card group animate-fade-up p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#bcd1ff] hover:shadow-[0_30px_80px_-60px_rgba(15,91,255,0.18)]"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <ServiceIcon value={service.icon} title={localizeField(locale, service.titleVi, service.titleEn)} />
                    <h3 className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-display text-[1.16rem] font-700 leading-tight text-[color:var(--text-strong)]">
                      {getServiceCardTitle(locale, service)}
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

        <section className="bg-[var(--bg-page-alt)] py-6 sm:py-6 lg:py-6">
          <div className="page-shell">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div className="max-w-5xl">
                <p className="section-tag">{text.projectsTag}</p>
                <h2 className="section-heading mt-4 max-w-[34ch] whitespace-nowrap">
                  {text.projectsTitle}
                </h2>
                <p className="section-body mt-4 max-w-[76ch]">{text.projectsBody}</p>
              </div>
              <div className="flex justify-start lg:justify-end">
                <Link
                  href={withLocalePath(locale, '/projects')}
                  className="inline-flex items-center gap-2 text-sm font-600 text-[#0f5bff] hover:text-[#0848d6]"
                >
                  {text.moreProjects}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              {featuredProject ? (
                <Link
                  href={withLocalePath(locale, `/projects/${featuredProject.slug}`)}
                  className="surface-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-55px_rgba(15,91,255,0.16)]"
                >
                  <div className="h-64 bg-slate-100 sm:h-72">
                    {featuredProject.thumbnailUrl ? (
                      <img
                        src={featuredProject.thumbnailUrl}
                        alt={localizeField(locale, featuredProject.nameVi, featuredProject.nameEn)}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-6">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                      {[featuredProject.location, featuredProject.year].filter(Boolean).join(' • ')}
                    </div>
                    <h3 className="mt-4 font-display text-[1.46rem] font-700 leading-tight text-[color:var(--text-strong)]">
                      {localizeField(locale, featuredProject.nameVi, featuredProject.nameEn)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--text-body)]">
                      {localizeField(locale, featuredProject.shortDescVi || featuredProject.descriptionVi, featuredProject.shortDescEn || featuredProject.descriptionEn)}
                    </p>
                  </div>
                </Link>
              ) : null}

              <div className="grid gap-5">
                <div className="surface-card p-6">
                  <p className="section-tag">{text.projectSideTitle}</p>
                  <p className="section-body mt-4">{text.projectSideBody}</p>
                </div>

                {secondaryProjects.length ? (
                  secondaryProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={withLocalePath(locale, `/projects/${project.slug}`)}
                      className="surface-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-55px_rgba(15,91,255,0.14)]"
                    >
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                        {[project.location, project.year].filter(Boolean).join(' • ')}
                      </div>
                      <h3 className="mt-3 font-display text-[1.2rem] font-700 leading-tight text-[color:var(--text-strong)]">
                        {localizeField(locale, project.nameVi, project.nameEn)}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--text-body)]">
                        {localizeField(locale, project.shortDescVi || project.descriptionVi, project.shortDescEn || project.descriptionEn)}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="surface-card p-6">
                    <p className="section-tag">{text.projectFallbackTitle}</p>
                    <div className="mt-5 space-y-3">
                      {text.projectFallbackItems.map((item) => (
                        <div key={item} className="surface-soft px-4 py-4 text-sm leading-7 text-[color:var(--text-body)]">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="page-section bg-white">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <h2 className="section-heading mx-auto max-w-none whitespace-nowrap">
              {text.ctaTitle}
            </h2>
            <p className="section-body mx-auto mt-4 max-w-[76ch]">{text.ctaBody}</p>
            <Link
              href={withLocalePath(locale, '/contact')}
              className="btn-primary mt-7 inline-flex items-center justify-center px-7 py-4 text-sm font-700"
            >
              {text.ctaButton}
            </Link>
          </div>
        </section>

        <SiteFooter locale={locale} email={contact.email} address={contact.address} />
      </main>
    </>
  )
}
