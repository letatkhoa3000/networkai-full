import ContactPageContent from '@/components/ContactPageContent'
import { contactContent } from '@/lib/contact-content'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  locale: 'vi',
  path: '/contact',
  title: 'Liên hệ | NetworkAI',
  description:
    'Liên hệ NetworkAI để được tư vấn giải pháp phù hợp cho dự án khách sạn hoặc doanh nghiệp của bạn.',
})

export default async function ContactPage() {
  const settings = await safeDb(
    'contact settings (vi)',
    () =>
      prisma.setting.findMany({
        where: { key: { in: ['contact.email', 'contact.phone', 'contact.addressVi'] } },
      }),
    []
  )
  const s = settings.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {} as Record<string, string>)
  const copy = contactContent.vi

  return (
    <ContactPageContent
      copy={copy}
      email={s['contact.email'] ?? 'sales@networkai.vn'}
      phone={s['contact.phone']}
      address={s['contact.addressVi'] ?? copy.fallbackAddress}
    />
  )
}
