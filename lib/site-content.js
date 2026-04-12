export const partnerLogos = ["Hilton", "Accor", "Marriott", "Hyatt", "IHG", "Wyndham", "Cisco", "Fortinet"];

export const projectDetails = {
  "Novotel Naman Village": { location: "Da Nang, Vietnam", scope: ["Admin Network", "Server", "Office Workstation", "Firewall"] },
  "Hilton Tapestry Casamia Hoian": { location: "Hoi An, Vietnam", scope: ["IT Consulting", "ELV Appraisal", "Supervision"] },
  "Hyatt Regency Danang": { location: "Da Nang, Vietnam", scope: ["Network", "WiFi", "Maintenance Services"] },
  "Amanoi Resort": { location: "Khanh Hoa, Vietnam", scope: ["Network", "WiFi", "VDI", "Software"] },
  "InterContinental Danang": { location: "Da Nang, Vietnam", scope: ["WiFi", "CCTV"] },
  "Wyndham Hoi An Resort": { location: "Hoi An, Vietnam", scope: ["IT Design & Build", "IPTV", "PABX", "HSIA"] }
};

const commonVi = {
  stats: [["18+", "Năm kinh nghiệm chuyên sâu"], ["Hospitality", "Lĩnh vực triển khai trọng tâm"], ["End-to-end", "Từ tư vấn đến vận hành"], ["24/7", "Hỗ trợ kỹ thuật"]],
  productFeatures: [
    ["Topology trực quan", "Quan sát thiết bị, kết nối và phụ thuộc hệ thống để điều tra nhanh hơn."],
    ["Health Monitoring", "Theo dõi reachability, interface, uptime và tín hiệu suy giảm sớm."],
    ["Syslog có ngữ cảnh", "Đi từ cảnh báo đến bằng chứng vận hành ngay trong cùng workflow."],
    ["Config Review", "So sánh cấu hình, theo dõi drift và kiểm tra thay đổi rõ ràng."],
    ["Asset Inventory", "Quản lý model, serial, vai trò thiết bị và tình trạng tập trung."],
    ["SSH / Raw Access", "Đi sâu đến mức raw file và SSH khi cần xác minh kỹ thuật."]
  ],
  services: [
    ["Hạ tầng CNTT", "Network, WiFi, Server, Storage, Security, UPS và Server Room."],
    ["Hệ thống ELV", "CCTV, Access Control, PABX, PA, IPTV và cáp cấu trúc."],
    ["Smart Home / Building", "Lighting, Curtain, HVAC, Audio và panel điều khiển."],
    ["Tư vấn & Thiết kế", "Concept, schematic, construction design và giám sát hệ thống."],
    ["Thi công & Cấu hình", "Cung cấp thiết bị, lắp đặt, kiểm thử và bàn giao."],
    ["Bảo trì & Hỗ trợ", "Tối ưu, nâng cấp và hỗ trợ kỹ thuật trong suốt vòng đời hệ thống."]
  ],
  projects: [
    ["Novotel Naman Village", "Triển khai admin network theo tiêu chuẩn Accor."],
    ["Hilton Tapestry Casamia Hoian", "Tư vấn, thẩm định và giám sát IT & ELV."],
    ["Hyatt Regency Danang", "Triển khai và bảo trì Network & WiFi."],
    ["Amanoi Resort", "Network, WiFi, VDI và thiết bị văn phòng."],
    ["InterContinental Danang", "Triển khai WiFi và CCTV."],
    ["Wyndham Hoi An Resort", "IT Design & Build, IPTV, PABX và HSIA."]
  ]
};

const commonEn = {
  stats: [["18+", "Years of specialized experience"], ["Hospitality", "Core implementation focus"], ["End-to-end", "From consulting to operations"], ["24/7", "Technical support"]],
  productFeatures: [
    ["Topology Visibility", "See devices, dependencies, and connectivity for faster investigation."],
    ["Health Monitoring", "Track reachability, interfaces, uptime, and early degradation signals."],
    ["Contextual Syslog", "Move from alert to operational evidence inside the same workflow."],
    ["Config Review", "Compare configurations, detect drift, and validate changes clearly."],
    ["Asset Inventory", "Keep model, serial, role, and status visible in one place."],
    ["SSH / Raw Access", "Drill down to raw files and SSH when deep technical verification is needed."]
  ],
  services: [
    ["IT Infrastructure", "Network, WiFi, Server, Storage, Security, UPS, and Server Room."],
    ["ELV Systems", "CCTV, Access Control, PABX, PA, IPTV, and structured cabling."],
    ["Smart Home / Building", "Lighting, Curtain, HVAC, Audio, and control panels."],
    ["Consulting & Design", "Concept, schematic, construction design, and system supervision."],
    ["Installation & Configuration", "Equipment supply, installation, testing, and handover."],
    ["Maintenance & Support", "Optimization, upgrades, and technical support across the system lifecycle."]
  ],
  projects: [
    ["Novotel Naman Village", "Admin network deployment aligned with Accor standards."],
    ["Hilton Tapestry Casamia Hoian", "IT & ELV consulting, appraisal, and supervision."],
    ["Hyatt Regency Danang", "Network and WiFi implementation with maintenance."],
    ["Amanoi Resort", "Network, WiFi, VDI, and office equipment solutions."],
    ["InterContinental Danang", "WiFi and CCTV implementation."],
    ["Wyndham Hoi An Resort", "IT Design & Build, IPTV, PABX, and HSIA solutions."]
  ]
};

export const content = {
  vi: {
    locale: "vi",
    nav: [{ href: "/", label: "Trang chủ" }, { href: "/about", label: "Giới thiệu" }, { href: "/solutions", label: "Giải pháp" }, { href: "/services", label: "Dịch vụ" }, { href: "/projects", label: "Dự án" }, { href: "/contact", label: "Liên hệ" }],
    heroBadge: "Website doanh nghiệp tối giản, hiện đại",
    heroTitle: "Giải pháp ELV, CNTT và Network Intelligence",
    heroDesc: "NetworkAI tư vấn, thiết kế và triển khai hệ thống IT, ELV, Smart Building, đồng thời phát triển NetOps Argus cho vận hành hạ tầng mạng tập trung.",
    heroPrimary: "Xem giải pháp",
    heroSecondary: "Liên hệ",
    homeMiniTitle: "Thiết kế gọn hơn, dễ đọc hơn",
    homeMiniDesc: "Bố cục được làm lại theo hướng multi-page, typography vừa phải, nhiều khoảng trắng và animation nhẹ để giữ cảm giác chuyên nghiệp.",
    aboutEyebrow: "Về NetworkAI",
    aboutTitle: "Đội ngũ tập trung vào hệ thống, tính ổn định và hiệu quả vận hành",
    aboutDesc: "NetworkAI chuyên tư vấn, thiết kế và triển khai hệ thống CNTT, ELV, Smart Home và Smart Building cho khách sạn, resort và doanh nghiệp. Chúng tôi ưu tiên tính rõ ràng trong giải pháp, dễ vận hành sau triển khai và khả năng mở rộng lâu dài.",
    aboutExtra: "Cách trình bày nội dung được tối giản để khách hàng nhìn nhanh giá trị cốt lõi, sản phẩm nổi bật và năng lực dự án mà không bị rối bởi chữ quá lớn hoặc quá dày.",
    productEyebrow: "Sản phẩm nổi bật",
    productTitle: "NetOps Argus",
    productTag: "Nền tảng Network Intelligence On-Prem",
    productDesc: "NetOps Argus giúp đội ngũ vận hành quan sát topology, theo dõi health, điều tra syslog, quản lý inventory và rà soát thay đổi cấu hình trên một bề mặt làm việc thống nhất.",
    productPrimary: "Mở NetOps Argus",
    productSecondary: "Yêu cầu demo",
    servicesEyebrow: "Dịch vụ",
    servicesTitle: "Giải pháp đồng bộ cho hạ tầng CNTT và công trình thông minh",
    servicesDesc: "Chúng tôi kết hợp năng lực thiết kế hệ thống với triển khai thực tế để tạo ra giải pháp dễ vận hành, gọn gàng và phù hợp tiêu chuẩn dự án.",
    projectsEyebrow: "Dự án",
    projectsTitle: "Kinh nghiệm triển khai trên nhiều thương hiệu hospitality lớn",
    projectsDesc: "Danh mục dự án giúp khách hàng thấy năng lực làm việc với tiêu chuẩn quốc tế và môi trường yêu cầu độ ổn định cao.",
    contactEyebrow: "Liên hệ",
    contactTitle: "Trao đổi với chúng tôi về dự án của bạn",
    contactDesc: "Nếu bạn cần một đối tác có thể tư vấn, thiết kế, triển khai và đồng hành vận hành hệ thống, NetworkAI sẵn sàng hỗ trợ.",
    address: "Tầng 3, Tòa nhà Kim Sơn, 18 Phan Thanh Tài, Hải Châu, Đà Nẵng",
    consultationLabel: "Yêu cầu tư vấn",
    detailLabel: "Xem chi tiết",
    ctaStrip: "Thiết kế multi-page, animation nhẹ và tích hợp logo thương hiệu.",
    footerTagline: "Amazing Solutions for Modern Infrastructure",
    ...commonVi
  },
  en: {
    locale: "en",
    nav: [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/solutions", label: "Solutions" }, { href: "/services", label: "Services" }, { href: "/projects", label: "Projects" }, { href: "/contact", label: "Contact" }],
    heroBadge: "Minimal modern corporate website",
    heroTitle: "ELV, IT, and Network Intelligence Solutions",
    heroDesc: "NetworkAI delivers consulting, design, and implementation for IT, ELV, and Smart Building systems, while also developing NetOps Argus for centralized network operations visibility.",
    heroPrimary: "View solutions",
    heroSecondary: "Contact",
    homeMiniTitle: "Cleaner layout, calmer typography",
    homeMiniDesc: "This version is redesigned as a multi-page experience with smaller headings, more whitespace, and subtle motion for a more professional presentation.",
    aboutEyebrow: "About NetworkAI",
    aboutTitle: "A team focused on systems, stability, and operational usability",
    aboutDesc: "NetworkAI specializes in consulting, designing, and implementing IT, ELV, Smart Home, and Smart Building systems for hospitality, resort, and enterprise projects. We prioritize solution clarity, long-term scalability, and practical operation after delivery.",
    aboutExtra: "The content structure is simplified so clients can quickly understand the core value, featured product, and project experience without oversized text or heavy visual density.",
    productEyebrow: "Featured product",
    productTitle: "NetOps Argus",
    productTag: "On-Prem Network Intelligence Platform",
    productDesc: "NetOps Argus helps operations teams visualize topology, monitor health, investigate syslog, manage device inventory, and review configuration changes inside one connected operational surface.",
    productPrimary: "Open NetOps Argus",
    productSecondary: "Request demo",
    servicesEyebrow: "Services",
    servicesTitle: "A connected solution stack for IT infrastructure and smart buildings",
    servicesDesc: "We combine system design capability with practical delivery to create solutions that are operationally clean, scalable, and aligned with project standards.",
    projectsEyebrow: "Projects",
    projectsTitle: "Delivery experience across leading hospitality brands",
    projectsDesc: "The project portfolio highlights experience with international standards and environments that require high availability.",
    contactEyebrow: "Contact",
    contactTitle: "Talk to us about your next project",
    contactDesc: "If you need a partner who can consult, design, implement, and support systems in operation, NetworkAI is ready to help.",
    address: "3rd Floor, Kim Son Building, 18 Phan Thanh Tai, Hai Chau, Da Nang, Vietnam",
    consultationLabel: "Request consultation",
    detailLabel: "View details",
    ctaStrip: "Multi-page structure, subtle motion, and integrated brand logo.",
    footerTagline: "Amazing Solutions for Modern Infrastructure",
    ...commonEn
  }
};

export function getContent(searchParams) {
  const lang = searchParams && searchParams.lang === "en" ? "en" : "vi";
  return content[lang];
}
