import ContactPageContent from '@/components/ContactPageContent'
import { contactContent } from '@/lib/contact-content'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  locale: 'en',
  path: '/contact',
  title: 'Contact | NetworkAI',
  description:
    'Contact NetworkAI to discuss the right solution for your hospitality or enterprise project.',
})

export default async function EnglishContactPage() {
  const settings = await safeDb(
    'contact settings (en)',
    () =>
      prisma.setting.findMany({
        where: { key: { in: ['contact.email', 'contact.phone', 'contact.addressEn'] } },
      }),
    []
  )
  const s = settings.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {} as Record<string, string>)
  const copy = contactContent.en

  return (
    <ContactPageContent
      copy={copy}
      email={s['contact.email'] ?? 'sales@networkai.vn'}
      phone={s['contact.phone']}
      address={s['contact.addressEn'] ?? copy.fallbackAddress}
    />
  )
}
