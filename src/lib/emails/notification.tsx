export function NotificationEmail({
  name, email, phone, company, serviceType, message
}: {
  name: string
  email: string
  phone?: string
  company?: string
  serviceType?: string
  message: string
}) {
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
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .value { font-size: 15px; color: #111827; }
    .message-box { background: #f9fafb; border-radius: 8px; padding: 16px; border-left: 3px solid #3b82f6; }
    .footer { background: #f9fafb; padding: 16px 32px; font-size: 12px; color: #9ca3af; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>NetworkAI — Yêu cầu tư vấn mới</h1>
      <p>Có khách hàng mới liên hệ qua website</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Họ và tên</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}" style="color:#3b82f6">${email}</a></div>
      </div>
      ${phone ? `<div class="field"><div class="label">Điện thoại</div><div class="value">${phone}</div></div>` : ''}
      ${company ? `<div class="field"><div class="label">Công ty</div><div class="value">${company}</div></div>` : ''}
      ${serviceType ? `<div class="field"><div class="label">Dịch vụ quan tâm</div><div class="value">${serviceType}</div></div>` : ''}
      <hr class="divider">
      <div class="field">
        <div class="label">Nội dung</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      Email này được gửi tự động từ website networkai.vn
    </div>
  </div>
</body>
</html>
  `.trim()
}