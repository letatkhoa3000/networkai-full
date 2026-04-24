// prisma/seed.ts
// Chạy: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
// Hoặc thêm vào package.json: "prisma": { "seed": "ts-node prisma/seed.ts" }
// rồi chạy: npx prisma db seed

import { PrismaClient, UserRole, PartnerType, ProjectCategory, ProjectStatus, SubmissionStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Bắt đầu seed dữ liệu NetworkAI...')

  // ----------------------------------------------------------
  // 1. ADMIN USER
  // ----------------------------------------------------------
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD || 'NetworkAI@2025!', 12)

  await prisma.user.upsert({
    where: { email: 'admin@networkai.vn' },
    update: {},
    create: {
      email: 'admin@networkai.vn',
      password: hashedPassword,
      name: 'NetworkAI Admin',
      role: UserRole.ADMIN,
    },
  })
  console.log('✅ Admin user')

  // ----------------------------------------------------------
  // 2. SETTINGS
  // ----------------------------------------------------------
  const settings = [
    { key: 'contact.email',       value: 'sales@networkai.vn',                               label: 'Email liên hệ chính' },
    { key: 'contact.phone',       value: '+84 (0) 236 xxx xxxx',                             label: 'Số điện thoại' },
    { key: 'contact.addressVi',   value: 'Tầng 3, Kim Son Building - 18 Phan Thành Tài, Q. Hải Châu, TP. Đà Nẵng', label: 'Địa chỉ (Tiếng Việt)' },
    { key: 'contact.addressEn',   value: '3rd Floor, Kim Son Building - 18 Phan Thanh Tai St., Hai Chau Dist., Da Nang City', label: 'Địa chỉ (English)' },
    { key: 'contact.mapEmbed',    value: '',                                                  label: 'Google Maps embed URL' },
    { key: 'social.linkedin',     value: '',                                                  label: 'LinkedIn URL' },
    { key: 'social.facebook',     value: '',                                                  label: 'Facebook URL' },
    { key: 'seo.defaultTitleVi',  value: 'NetworkAI - Giải Pháp Hạ Tầng Thông Minh',         label: 'SEO title mặc định (Vi)' },
    { key: 'seo.defaultTitleEn',  value: 'NetworkAI - Smart Infrastructure Solutions',        label: 'SEO title mặc định (En)' },
    { key: 'seo.defaultDescVi',   value: 'NetworkAI chuyên tư vấn và triển khai hệ thống ICT, ELV, Smart Home & Smart Building cho khách sạn, resort và doanh nghiệp.', label: 'SEO description mặc định (Vi)' },
    { key: 'seo.defaultDescEn',   value: 'NetworkAI specializes in consulting and deploying ICT, ELV, Smart Home & Smart Building systems for hotels, resorts, and enterprises.', label: 'SEO description mặc định (En)' },
    { key: 'seo.ogImageUrl',      value: '/og-default.png',                                  label: 'OG Image URL mặc định' },
    { key: 'company.foundedYear', value: '2007',                                              label: 'Năm thành lập' },
    { key: 'company.experienceYears', value: '18',                                            label: 'Số năm kinh nghiệm' },
  ]

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value, label: s.label },
      create: s,
    })
  }
  console.log('✅ Settings')

  // ----------------------------------------------------------
  // 3. HOMEPAGE SECTIONS
  // ----------------------------------------------------------
  const sections = [
    {
      key: 'hero',
      titleVi: 'NetworkAI - Giải Pháp Hạ Tầng Thông Minh',
      titleEn: 'NetworkAI - Smart Infrastructure Solutions',
      bodyVi: 'NetworkAI chuyên tư vấn và triển khai hệ thống ICT, ELV, Smart Home & Smart Building. Chúng tôi đồng hành cùng các khách sạn, resort và doanh nghiệp kiến tạo những công trình thông minh, bền vững và hiệu quả.',
      bodyEn: 'NetworkAI specializes in consulting and deploying ICT, ELV, Smart Home & Smart Building systems. We partner with hotels, resorts, and businesses to create intelligent, sustainable, and efficient infrastructure.',
      ctaLabelVi: 'Xem dịch vụ của chúng tôi',
      ctaLabelEn: 'Explore Our Services',
      ctaUrl: '/services',
      sortOrder: 1,
    },
    {
      key: 'about_short',
      titleVi: 'Hơn 18 Năm Kinh Nghiệm',
      titleEn: 'Over 18 Years of Experience',
      bodyVi: 'Với đội ngũ chuyên gia sở hữu hơn 18 năm kinh nghiệm triển khai trong ngành Hospitality cao cấp, NetworkAI mang tới sự am hiểu sâu sắc về tiêu chuẩn kỹ thuật quốc tế và năng lực thực thi vượt trội cho mọi dự án.',
      bodyEn: 'With a team of experts boasting over 18 years of experience in the premium Hospitality sector, NetworkAI brings deep understanding of international technical standards and outstanding execution capabilities to every project.',
      sortOrder: 2,
    },
    {
      key: 'cta_bottom',
      titleVi: 'Sẵn sàng cho dự án tiếp theo?',
      titleEn: 'Ready for Your Next Project?',
      bodyVi: 'Hãy để chúng tôi tư vấn giải pháp phù hợp nhất cho công trình của bạn.',
      bodyEn: 'Let us consult the most suitable solution for your project.',
      ctaLabelVi: 'Liên hệ ngay',
      ctaLabelEn: 'Contact Us',
      ctaUrl: '/contact',
      sortOrder: 3,
    },
  ]

  for (const sec of sections) {
    await prisma.homepageSection.upsert({
      where: { key: sec.key },
      update: sec,
      create: sec,
    })
  }
  console.log('✅ Homepage sections')

  // ----------------------------------------------------------
  // 4. CORE VALUES
  // ----------------------------------------------------------
  await prisma.coreValue.deleteMany()
  await prisma.coreValue.createMany({
    data: [
      {
        titleVi: 'Chuyên nghiệp',
        titleEn: 'Professionalism',
        descriptionVi: 'Quy trình triển khai chuẩn mực, đảm bảo tiến độ và sự bền vững của hệ thống.',
        descriptionEn: 'Standardized deployment processes that ensure timelines and long-term system reliability.',
        icon: 'shield-check',
        sortOrder: 1,
      },
      {
        titleVi: 'Vượt trội',
        titleEn: 'Excellence',
        descriptionVi: 'Không chỉ đáp ứng, chúng tôi nỗ lực tạo ra chất lượng vượt mong đợi trong từng chi tiết kỹ thuật.',
        descriptionEn: 'We do not merely meet expectations — we strive to exceed them in every technical detail.',
        icon: 'star',
        sortOrder: 2,
      },
      {
        titleVi: 'Tận tâm',
        titleEn: 'Dedication',
        descriptionVi: 'Thiết lập mối quan hệ đối tác dài lâu qua chế độ hỗ trợ toàn diện Trước - Trong - Sau dự án.',
        descriptionEn: 'Building lasting partnerships through comprehensive Before - During - After project support.',
        icon: 'heart-handshake',
        sortOrder: 3,
      },
    ],
  })
  console.log('✅ Core values')

  // ----------------------------------------------------------
  // 5. SERVICES
  // ----------------------------------------------------------
  await prisma.service.deleteMany()
  const servicesData = [
    {
      slug: 'ict-system-design',
      titleVi: 'Thiết kế hệ thống CNTT',
      titleEn: 'ICT System Design',
      shortDescVi: 'Tư vấn và thiết kế kiến trúc hệ thống công nghệ thông tin toàn diện.',
      shortDescEn: 'Comprehensive IT system architecture consulting and design.',
      descriptionVi: 'Tư vấn và thiết kế kiến trúc hệ thống CNTT toàn diện: hạ tầng mạng, máy chủ, lưu trữ, hệ thống bảo mật và phòng máy chủ. Chúng tôi đảm bảo giải pháp phù hợp tiêu chuẩn quốc tế, tối ưu chi phí và dễ mở rộng.',
      descriptionEn: 'Comprehensive ICT infrastructure design including network architecture, servers, storage, security systems, and data center design. We ensure solutions meet international standards, cost efficiency, and scalability.',
      icon: 'network',
      featured: true,
      sortOrder: 1,
    },
    {
      slug: 'elv-system-deployment',
      titleVi: 'Triển khai hệ thống ELV',
      titleEn: 'ELV System Deployment',
      shortDescVi: 'Thi công và tích hợp toàn bộ hệ thống hạ tầng kỹ thuật điện nhẹ.',
      shortDescEn: 'Full deployment and integration of Extra Low Voltage systems.',
      descriptionVi: 'Thiết kế, cung cấp và thi công toàn bộ hệ thống ELV: CCTV, kiểm soát truy cập, hệ thống thông báo công cộng (PA), hệ thống hội nghị, IPTV, hệ thống quản lý tòa nhà (BMS).',
      descriptionEn: 'Design, supply, and deployment of complete ELV systems: CCTV, access control, public address systems, conference systems, IPTV, and building management systems (BMS).',
      icon: 'cpu',
      featured: true,
      sortOrder: 2,
    },
    {
      slug: 'smart-home-building',
      titleVi: 'Smart Home / Smart Building',
      titleEn: 'Smart Home / Smart Building',
      shortDescVi: 'Giải pháp tự động hóa và điều khiển thông minh cho không gian sống và làm việc.',
      shortDescEn: 'Automation and intelligent control solutions for living and working spaces.',
      descriptionVi: 'Tích hợp hệ thống điều khiển tự động hóa thông minh: chiếu sáng, điều hòa, rèm cửa, bảo mật và năng lượng. Mang đến trải nghiệm sống và làm việc hiện đại, tiết kiệm năng lượng hiệu quả.',
      descriptionEn: 'Integration of intelligent building automation: lighting, HVAC, curtains, security, and energy management. Delivering modern living and working experiences with effective energy savings.',
      icon: 'home',
      featured: true,
      sortOrder: 3,
    },
    {
      slug: 'consulting-system-review',
      titleVi: 'Tư vấn & thẩm định hệ thống',
      titleEn: 'Consulting & System Review',
      shortDescVi: 'Đánh giá độc lập và tư vấn chiến lược cho hệ thống CNTT hiện có.',
      shortDescEn: 'Independent assessment and strategic consulting for existing IT systems.',
      descriptionVi: 'Đánh giá độc lập hệ thống CNTT/ELV hiện tại, xác định rủi ro, đề xuất cải tiến phù hợp với ngân sách và lộ trình kỹ thuật. Thẩm định thiết kế của bên thứ ba để đảm bảo chất lượng.',
      descriptionEn: 'Independent assessment of existing ICT/ELV systems, risk identification, and improvement recommendations aligned with budget and technical roadmap. Third-party design reviews to ensure quality standards.',
      icon: 'clipboard-check',
      featured: false,
      sortOrder: 4,
    },
    {
      slug: 'installation-configuration',
      titleVi: 'Thi công & cấu hình',
      titleEn: 'Installation & Configuration',
      shortDescVi: 'Đội ngũ kỹ thuật lành nghề đảm bảo triển khai đúng tiêu chuẩn, đúng tiến độ.',
      shortDescEn: 'Skilled technical team ensuring standard-compliant, on-schedule deployment.',
      descriptionVi: 'Thi công lắp đặt hệ thống với đội ngũ kỹ sư được chứng nhận của các hãng hàng đầu. Cấu hình, kiểm thử và nghiệm thu theo tiêu chuẩn quốc tế, đảm bảo hệ thống hoạt động ổn định từ ngày đầu.',
      descriptionEn: 'System installation by vendor-certified engineers. Configuration, testing, and commissioning to international standards, ensuring stable system operation from day one.',
      icon: 'wrench',
      featured: false,
      sortOrder: 5,
    },
    {
      slug: 'maintenance-technical-support',
      titleVi: 'Bảo trì & hỗ trợ kỹ thuật',
      titleEn: 'Maintenance & Technical Support',
      shortDescVi: 'Gói bảo trì định kỳ và hỗ trợ kỹ thuật 24/7 cho hệ thống của bạn.',
      shortDescEn: 'Periodic maintenance packages and 24/7 technical support for your systems.',
      descriptionVi: 'Dịch vụ bảo trì định kỳ, giám sát hệ thống từ xa và hỗ trợ kỹ thuật nhanh chóng. Cam kết SLA rõ ràng, đội ngũ kỹ thuật sẵn sàng 24/7 đảm bảo hệ thống luôn vận hành liên tục.',
      descriptionEn: 'Periodic maintenance, remote system monitoring, and rapid technical support. Clear SLA commitments with 24/7 technical team availability to ensure continuous system operation.',
      icon: 'headset',
      featured: false,
      sortOrder: 6,
    },
  ]

  for (const s of servicesData) {
    await prisma.service.create({ data: s })
  }
  console.log('✅ Services (6)')

  // ----------------------------------------------------------
  // 6. PROJECTS — 18 dự án tiêu biểu
  // ----------------------------------------------------------
  await prisma.projectService.deleteMany()
  await prisma.project.deleteMany()

  const projectsData = [
    // --- Hilton Group ---
    {
      slug: 'hilton-tapestry-casamia-hoian-2025',
      nameVi: 'Hilton Tapestry Casamia Hội An (2025)',
      nameEn: 'Hilton Tapestry Casamia Hoi An (2025)',
      location: 'Hội An',
      hotelBrand: 'Hilton',
      hotelGroup: 'Hilton Hotels & Resorts',
      year: 2025,
      status: ProjectStatus.IN_PROGRESS,
      featured: true,
      sortOrder: 1,
    },
    {
      slug: 'hilton-tapestry-casamia-hoian-2026',
      nameVi: 'Hilton Tapestry Casamia Hội An (2026)',
      nameEn: 'Hilton Tapestry Casamia Hoi An (2026)',
      location: 'Hội An',
      hotelBrand: 'Hilton',
      hotelGroup: 'Hilton Hotels & Resorts',
      year: 2026,
      status: ProjectStatus.UPCOMING,
      featured: true,
      sortOrder: 2,
    },
    {
      slug: 'hilton-west-hanoi',
      nameVi: 'Hilton West Hà Nội',
      nameEn: 'Hilton West Hanoi',
      location: 'Hà Nội',
      hotelBrand: 'Hilton',
      hotelGroup: 'Hilton Hotels & Resorts',
      status: ProjectStatus.COMPLETED,
      featured: true,
      sortOrder: 3,
    },
    {
      slug: 'hilton-da-nang',
      nameVi: 'Hilton Đà Nẵng',
      nameEn: 'Hilton Da Nang',
      location: 'Đà Nẵng',
      hotelBrand: 'Hilton',
      hotelGroup: 'Hilton Hotels & Resorts',
      status: ProjectStatus.COMPLETED,
      featured: false,
      sortOrder: 4,
    },
    // --- Marriott Group ---
    {
      slug: 'jw-marriott-phu-quoc',
      nameVi: 'JW Marriott Phú Quốc Emerald Bay Resort & Spa',
      nameEn: 'JW Marriott Phu Quoc Emerald Bay Resort & Spa',
      location: 'Phú Quốc',
      hotelBrand: 'Marriott',
      hotelGroup: 'Marriott International',
      status: ProjectStatus.COMPLETED,
      featured: true,
      sortOrder: 5,
    },
    // --- Accor Group ---
    {
      slug: 'novotel-naman-village',
      nameVi: 'Novotel Naman Village',
      nameEn: 'Novotel Naman Village',
      location: 'Đà Nẵng',
      hotelBrand: 'Novotel',
      hotelGroup: 'Accor',
      status: ProjectStatus.COMPLETED,
      featured: false,
      sortOrder: 6,
    },
    {
      slug: 'pullman-da-nang-beach-resort',
      nameVi: 'Pullman Đà Nẵng Beach Resort',
      nameEn: 'Pullman Da Nang Beach Resort',
      location: 'Đà Nẵng',
      hotelBrand: 'Pullman',
      hotelGroup: 'Accor',
      status: ProjectStatus.COMPLETED,
      featured: true,
      sortOrder: 7,
    },
    {
      slug: 'pullman-hai-phong',
      nameVi: 'Pullman Hải Phòng',
      nameEn: 'Pullman Hai Phong',
      location: 'Hải Phòng',
      hotelBrand: 'Pullman',
      hotelGroup: 'Accor',
      status: ProjectStatus.COMPLETED,
      featured: false,
      sortOrder: 8,
    },
    {
      slug: 'mercure-hai-phong',
      nameVi: 'Mercure Hải Phòng',
      nameEn: 'Mercure Hai Phong',
      location: 'Hải Phòng',
      hotelBrand: 'Mercure',
      hotelGroup: 'Accor',
      status: ProjectStatus.COMPLETED,
      featured: false,
      sortOrder: 9,
    },
    {
      slug: 'mgallery-hotel-de-la-coupole-sapa',
      nameVi: 'Hotel De La Coupole – MGallery Sapa',
      nameEn: 'Hotel De La Coupole – MGallery Sapa',
      location: 'Sapa',
      hotelBrand: 'MGallery',
      hotelGroup: 'Accor',
      status: ProjectStatus.COMPLETED,
      featured: true,
      sortOrder: 10,
    },
    // --- IHG Group ---
    {
      slug: 'intercontinental-danang-sun-peninsula',
      nameVi: 'InterContinental Đà Nẵng Sun Peninsula',
      nameEn: 'InterContinental Danang Sun Peninsula',
      location: 'Đà Nẵng',
      hotelBrand: 'InterContinental',
      hotelGroup: 'IHG Hotels & Resorts',
      status: ProjectStatus.COMPLETED,
      featured: true,
      sortOrder: 11,
    },
    // --- Hyatt Group ---
    {
      slug: 'hyatt-regency-da-nang',
      nameVi: 'Hyatt Regency Đà Nẵng',
      nameEn: 'Hyatt Regency Da Nang',
      location: 'Đà Nẵng',
      hotelBrand: 'Hyatt',
      hotelGroup: 'Hyatt',
      status: ProjectStatus.COMPLETED,
      featured: true,
      sortOrder: 12,
    },
    // --- Aman Group ---
    {
      slug: 'amanoi-resort',
      nameVi: 'Amanoi Resort',
      nameEn: 'Amanoi Resort',
      location: 'Ninh Thuận',
      hotelBrand: 'Aman',
      hotelGroup: 'Aman Resorts',
      status: ProjectStatus.COMPLETED,
      featured: true,
      sortOrder: 13,
    },
    // --- Radisson Group ---
    {
      slug: 'radisson-blu-cam-ranh',
      nameVi: 'Radisson Blu Resort Cam Ranh',
      nameEn: 'Radisson Blu Resort Cam Ranh',
      location: 'Cam Ranh',
      hotelBrand: 'Radisson Blu',
      hotelGroup: 'Radisson Hotels',
      status: ProjectStatus.COMPLETED,
      featured: false,
      sortOrder: 14,
    },
    {
      slug: 'radisson-hotel-da-nang',
      nameVi: 'Radisson Hotel Đà Nẵng',
      nameEn: 'Radisson Hotel Da Nang',
      location: 'Đà Nẵng',
      hotelBrand: 'Radisson',
      hotelGroup: 'Radisson Hotels',
      status: ProjectStatus.COMPLETED,
      featured: false,
      sortOrder: 15,
    },
    // --- Wyndham Group ---
    {
      slug: 'wyndham-hoi-an-royal-beachfront',
      nameVi: 'Wyndham Hội An Royal Beachfront Resort & Villas',
      nameEn: 'Wyndham Hoi An Royal Beachfront Resort & Villas',
      location: 'Hội An',
      hotelBrand: 'Wyndham',
      hotelGroup: 'Wyndham Hotels & Resorts',
      status: ProjectStatus.COMPLETED,
      featured: false,
      sortOrder: 16,
    },
    // --- Other ---
    {
      slug: 'euro-village-da-nang',
      nameVi: 'Euro Village Đà Nẵng',
      nameEn: 'Euro Village Da Nang',
      location: 'Đà Nẵng',
      category: ProjectCategory.RESIDENTIAL,
      status: ProjectStatus.COMPLETED,
      featured: false,
      sortOrder: 17,
    },
    {
      slug: 'casino-hoiana',
      nameVi: 'Casino Hoiana',
      nameEn: 'Casino Hoiana',
      location: 'Hội An',
      category: ProjectCategory.CASINO,
      status: ProjectStatus.COMPLETED,
      featured: false,
      sortOrder: 18,
    },
    {
      slug: 'golden-boutique-hotel-mang-den',
      nameVi: 'Golden Boutique Hotel Măng Đen',
      nameEn: 'Golden Boutique Hotel Mang Den',
      location: 'Kon Tum',
      hotelBrand: 'Independent',
      status: ProjectStatus.COMPLETED,
      featured: false,
      sortOrder: 19,
    },
  ]

  for (const p of projectsData) {
    await prisma.project.create({ data: p })
  }
  console.log(`✅ Projects (${projectsData.length})`)

  // ----------------------------------------------------------
  // 7. PARTNERS
  // ----------------------------------------------------------
  await prisma.partner.deleteMany()
  const partnersData = [
    // Technology Partners
    { name: 'Microsoft',           type: PartnerType.TECHNOLOGY, sortOrder: 1 },
    { name: 'Cisco Meraki',        type: PartnerType.TECHNOLOGY, sortOrder: 2 },
    { name: 'HPE Aruba Networking',type: PartnerType.TECHNOLOGY, sortOrder: 3 },
    { name: 'Nutanix',             type: PartnerType.TECHNOLOGY, sortOrder: 4 },
    { name: 'CommScope',           type: PartnerType.TECHNOLOGY, sortOrder: 5 },
    { name: 'Dell',                type: PartnerType.TECHNOLOGY, sortOrder: 6 },
    { name: 'Alcatel-Lucent',      type: PartnerType.TECHNOLOGY, sortOrder: 7 },
    { name: 'Ruckus Network',      type: PartnerType.TECHNOLOGY, sortOrder: 8 },
    { name: 'XPossible',           type: PartnerType.TECHNOLOGY, sortOrder: 9 },
    { name: 'Zafiro',              type: PartnerType.TECHNOLOGY, sortOrder: 10 },
    { name: 'LG',                  type: PartnerType.TECHNOLOGY, sortOrder: 11 },
    { name: 'Samsung',             type: PartnerType.TECHNOLOGY, sortOrder: 12 },
    // Hotel Brand Partners
    { name: 'Aman Resorts',               type: PartnerType.HOTEL_BRAND, sortOrder: 1 },
    { name: 'Accor',                      type: PartnerType.HOTEL_BRAND, sortOrder: 2 },
    { name: 'Hilton Hotels & Resorts',    type: PartnerType.HOTEL_BRAND, sortOrder: 3 },
    { name: 'IHG Hotels & Resorts',       type: PartnerType.HOTEL_BRAND, sortOrder: 4 },
    { name: 'Marriott International',     type: PartnerType.HOTEL_BRAND, sortOrder: 5 },
    { name: 'Hyatt',                      type: PartnerType.HOTEL_BRAND, sortOrder: 6 },
    { name: 'Wyndham Hotels & Resorts',   type: PartnerType.HOTEL_BRAND, sortOrder: 7 },
    { name: 'Radisson Hotels',            type: PartnerType.HOTEL_BRAND, sortOrder: 8 },
  ]

  for (const p of partnersData) {
    await prisma.partner.create({ data: { ...p, logoUrl: `/logos/${p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.svg` } })
  }
  console.log(`✅ Partners (${partnersData.length})`)

  console.log('\n🎉 Seed hoàn tất! NetworkAI data đã sẵn sàng.')
  console.log('📌 Nhớ thêm ADMIN_SEED_PASSWORD vào .env trước khi chạy lại seed.')
}

main()
  .catch((e) => {
    console.error('❌ Seed lỗi:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
