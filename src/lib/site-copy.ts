import { Locale } from '@/lib/site-locale'

export const siteCopy: Record<Locale, any> = {
  vi: {
    header: {
      nav: [
        { href: '/', label: 'Trang chủ' },
        { href: '/about', label: 'Giới thiệu' },
        { href: '/services', label: 'Dịch vụ' },
        { href: '/products', label: 'Sản phẩm' },
        { href: '/projects', label: 'Dự án' },
        { href: '/partners', label: 'Đối tác' },
        { href: '/contact', label: 'Liên hệ' },
      ],
      cta: 'Liên hệ ngay',
      switchLabel: 'English',
      switchHref: '/en',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    home: {
      badge: '18+ năm kinh nghiệm trong ngành Hospitality',
      heroFallbackTitle: 'NetworkAI',
      heroFallbackAccent: 'Giải Pháp Hạ Tầng Thông Minh',
      heroFallbackBody:
        'NetworkAI chuyên tư vấn và triển khai hệ thống ICT, ELV, Smart Home & Smart Building.',
      heroPrimaryCta: 'Xem dịch vụ',
      heroSecondaryCta: 'Xem dự án tiêu biểu',
      stats: [
        { num: '18+', label: 'Năm kinh nghiệm' },
        { num: '50+', label: 'Dự án hoàn thành' },
        { num: '8', label: 'Chuỗi khách sạn' },
      ],
      aboutTag: 'Về chúng tôi',
      aboutFallbackTitle: 'Hơn 18 Năm Kinh Nghiệm',
      aboutReadMore: 'Tìm hiểu thêm',
      servicesTag: 'Dịch vụ',
      servicesTitle: 'Giải pháp toàn diện',
      allServices: 'Xem tất cả dịch vụ',
      projectsTag: 'Dự án tiêu biểu',
      projectsTitle: 'Công trình nổi bật',
      viewAll: 'Xem tất cả',
      partnersTag: 'Đối tác & Khách hàng tin tưởng',
      ctaTitle: 'Sẵn sàng cho dự án tiếp theo?',
      ctaBody:
        'Hãy để chúng tôi tư vấn giải pháp phù hợp nhất cho công trình của bạn.',
      ctaButton: 'Liên hệ ngay',
    },
    about: {
      tag: 'Giới thiệu',
      valuesTitle: 'Giá trị cốt lõi',
    },
    services: {
      tag: 'Dịch vụ',
      title: 'Giải pháp toàn diện',
      body:
        'NetworkAI cung cấp đầy đủ các dịch vụ ICT, ELV và Smart Building cho khách sạn, resort và doanh nghiệp.',
    },
    products: {
      tag: 'Sản phẩm',
      title: 'Nền tảng do NetworkAI phát triển',
      body:
        'Khám phá các sản phẩm phục vụ vận hành, giám sát và tối ưu hạ tầng mạng trong môi trường hospitality và enterprise.',
    },
    projects: {
      tag: 'Dự án',
      title: 'Công trình tiêu biểu',
      body:
        'Hơn 18 năm triển khai cho các thương hiệu khách sạn hàng đầu thế giới tại Việt Nam.',
    },
    partners: {
      tag: 'Đối tác',
      title: 'Đối tác tin cậy',
      techTitle: 'Đối tác công nghệ',
      hotelTitle: 'Chuỗi khách sạn đã hợp tác',
    },
  },
  en: {
    header: {
      nav: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/products', label: 'Products' },
        { href: '/projects', label: 'Projects' },
        { href: '/partners', label: 'Partners' },
        { href: '/contact', label: 'Contact' },
      ],
      cta: 'Contact us',
      switchLabel: 'Tiếng Việt',
      switchHref: '/',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    home: {
      badge: '18+ years of hospitality experience',
      heroFallbackTitle: 'NetworkAI',
      heroFallbackAccent: 'Smart Infrastructure Solutions',
      heroFallbackBody:
        'NetworkAI provides consulting and implementation for ICT, ELV, Smart Home, and Smart Building systems.',
      heroPrimaryCta: 'Explore services',
      heroSecondaryCta: 'View featured projects',
      stats: [
        { num: '18+', label: 'Years of experience' },
        { num: '50+', label: 'Completed projects' },
        { num: '8', label: 'Hotel brands' },
      ],
      aboutTag: 'About us',
      aboutFallbackTitle: 'More Than 18 Years of Experience',
      aboutReadMore: 'Learn more',
      servicesTag: 'Services',
      servicesTitle: 'Integrated solutions',
      allServices: 'View all services',
      projectsTag: 'Featured projects',
      projectsTitle: 'Selected works',
      viewAll: 'View all',
      partnersTag: 'Trusted by partners and clients',
      ctaTitle: 'Ready for your next project?',
      ctaBody:
        'Let us recommend the right solution for your next property or facility.',
      ctaButton: 'Get in touch',
    },
    about: {
      tag: 'About',
      valuesTitle: 'Core values',
    },
    services: {
      tag: 'Services',
      title: 'Integrated solutions',
      body:
        'NetworkAI delivers ICT, ELV, and Smart Building services for hotels, resorts, and enterprise environments.',
    },
    products: {
      tag: 'Products',
      title: 'Platforms developed by NetworkAI',
      body:
        'Explore productized tools built to help NetOps and infrastructure teams observe, investigate, and operate complex environments with more context.',
    },
    projects: {
      tag: 'Projects',
      title: 'Signature projects',
      body:
        'More than 18 years delivering infrastructure projects for leading global hospitality brands in Vietnam.',
    },
    partners: {
      tag: 'Partners',
      title: 'Trusted partners',
      techTitle: 'Technology partners',
      hotelTitle: 'Hotel brands we have worked with',
    },
  },
}
