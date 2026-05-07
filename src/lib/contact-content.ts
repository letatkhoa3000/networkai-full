export type ContactLocale = 'vi' | 'en'

export type ContactFormCopy = {
  eyebrow: string
  title: string
  description: string
  labels: {
    name: string
    email: string
    phone: string
    company: string
    service: string
    message: string
  }
  placeholders: {
    name: string
    email: string
    phone: string
    company: string
    service: string
    message: string
  }
  submitIdle: string
  submitLoading: string
  success: string
  genericError: string
}

export type ContactPageCopy = {
  locale: ContactLocale
  pageTag: string
  title: {
    leading: string
    accent: string
  }
  description: string
  contactLabels: {
    email: string
    phone: string
    address: string
  }
  fallbackAddress: string
  switchLabel: string
  switchHref: string
  form: ContactFormCopy
  serviceOptions: string[]
}

export const contactContent: Record<ContactLocale, ContactPageCopy> = {
  vi: {
    locale: 'vi',
    pageTag: 'Liên hệ',
    title: {
      leading: 'Hãy nói chuyện',
      accent: 'với chúng tôi',
    },
    description:
      'Chúng tôi sẵn sàng tư vấn giải pháp phù hợp nhất cho dự án của bạn. Hãy để lại thông tin và đội ngũ sẽ liên hệ trong 24 giờ.',
    contactLabels: {
      email: 'Email',
      phone: 'Điện thoại',
      address: 'Địa chỉ',
    },
    fallbackAddress:
      'Tầng 3, Kim Sơn Building - 18 Phan Thành Tài, Q. Hải Châu, TP. Đà Nẵng',
    switchLabel: 'English',
    switchHref: '/en/contact',
    form: {
      eyebrow: 'Bắt đầu dự án',
      title: 'Cho chúng tôi biết nhu cầu của bạn',
      description:
        'Chia sẻ phạm vi công việc, timeline và mục tiêu. Chúng tôi sẽ phản hồi trong vòng 24 giờ.',
      labels: {
        name: 'Họ và tên *',
        email: 'Email *',
        phone: 'Số điện thoại',
        company: 'Công ty',
        service: 'Dịch vụ',
        message: 'Nội dung dự án *',
      },
      placeholders: {
        name: 'Nguyễn Văn A',
        email: 'ban@congty.com',
        phone: '+84 123 456 789',
        company: 'Tên công ty',
        service: 'Chọn dịch vụ',
        message: 'Mô tả mục tiêu, timeline và vấn đề bạn muốn giải quyết.',
      },
      submitIdle: 'Gửi yêu cầu',
      submitLoading: 'Đang gửi...',
      success: 'Yêu cầu đã được gửi. Chúng tôi sẽ liên hệ với bạn sớm.',
      genericError: 'Gửi yêu cầu thất bại. Vui lòng thử lại.',
    },
    serviceOptions: [
      'Chiến lược AI',
      'Phần mềm tùy chỉnh',
      'Cloud & Hạ tầng',
      'Nền tảng dữ liệu',
      'Tự động hóa',
    ],
  },
  en: {
    locale: 'en',
    pageTag: 'Contact',
    title: {
      leading: "Let's talk",
      accent: 'about your project',
    },
    description:
      'We are ready to recommend the right solution for your project. Leave your details and our team will contact you within 24 hours.',
    contactLabels: {
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
    },
    fallbackAddress:
      '3rd Floor, Kim Son Building - 18 Phan Thanh Tai, Hai Chau District, Da Nang, Vietnam',
    switchLabel: 'Tiếng Việt',
    switchHref: '/contact',
    form: {
      eyebrow: 'Start a project',
      title: 'Tell us what you need',
      description:
        'Share the scope, timeline, and goals. We will review and get back to you within 24 hours.',
      labels: {
        name: 'Full name *',
        email: 'Email *',
        phone: 'Phone',
        company: 'Company',
        service: 'Service',
        message: 'Project details *',
      },
      placeholders: {
        name: 'Nguyen Van A',
        email: 'you@company.com',
        phone: '+84 123 456 789',
        company: 'Your company',
        service: 'Select a service',
        message: 'Describe your project goals, expected timeline, and the problems you want to solve.',
      },
      submitIdle: 'Send request',
      submitLoading: 'Sending...',
      success: 'Your request has been sent. We will contact you shortly.',
      genericError: 'Failed to send your request. Please try again.',
    },
    serviceOptions: [
      'AI Strategy',
      'Custom Software',
      'Cloud & Infrastructure',
      'Data Platform',
      'Automation',
    ],
  },
}
