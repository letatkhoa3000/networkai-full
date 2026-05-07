export function AutoReplyEmail({
  name,
  locale = 'vi',
}: {
  name: string
  locale?: 'vi' | 'en'
}) {
  const copy = locale === 'en'
    ? {
        title: 'NetworkAI - We received your request',
        subtitle: 'Thank you for contacting us',
        greeting: `Hello ${name},`,
        intro:
          'Thank you for reaching out to NetworkAI. We have received your request and our team will review the details shortly.',
        notice:
          'We normally respond within 24 hours on business days. If your request is urgent, please reply directly to this email.',
        outro:
          'If you want to add more context such as timeline, budget, or technical requirements, just reply to this email and we will include it in the review.',
        cta: 'Visit NetworkAI',
        footer: 'This is an automated confirmation email from networkai.vn.',
      }
    : {
        title: 'NetworkAI - Chúng tôi đã nhận được yêu cầu của bạn',
        subtitle: 'Cảm ơn bạn đã liên hệ với chúng tôi',
        greeting: `Xin chào ${name},`,
        intro:
          'Cảm ơn bạn đã liên hệ với NetworkAI. Chúng tôi đã nhận được yêu cầu và đội ngũ sẽ xem xét thông tin trong thời gian sớm nhất.',
        notice:
          'Thông thường chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc. Nếu yêu cầu của bạn gấp, hãy trả lời trực tiếp email này.',
        outro:
          'Nếu bạn muốn bổ sung thêm thông tin như tiến độ, ngân sách hoặc yêu cầu kỹ thuật, chỉ cần trả lời email này và chúng tôi sẽ cập nhật vào quá trình tư vấn.',
        cta: 'Truy cập NetworkAI',
        footer: 'Đây là email xác nhận tự động từ networkai.vn.',
      }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
    .header { background: #0a1628; padding: 24px 32px; }
    .header h1 { color: white; margin: 0; font-size: 20px; }
    .header p { color: #60a5fa; margin: 4px 0 0; font-size: 14px; }
    .body { padding: 32px; color: #111827; line-height: 1.7; }
    .card { margin: 20px 0; padding: 18px 20px; background: #f9fafb; border-left: 3px solid #3b82f6; border-radius: 8px; }
    .cta { display: inline-block; margin-top: 12px; padding: 12px 18px; background: #2563eb; color: white !important; text-decoration: none; border-radius: 8px; font-size: 14px; }
    .footer { background: #f9fafb; padding: 16px 32px; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${copy.title}</h1>
      <p>${copy.subtitle}</p>
    </div>
    <div class="body">
      <p>${copy.greeting}</p>
      <p>${copy.intro}</p>
      <div class="card">${copy.notice}</div>
      <p>${copy.outro}</p>
      <a class="cta" href="https://networkai.vn">${copy.cta}</a>
    </div>
    <div class="footer">${copy.footer}</div>
  </div>
</body>
</html>
  `.trim()
}
