import type { Metadata } from 'next'
import HtmlLangSync from '@/components/HtmlLangSync'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { DEFAULT_OG_IMAGE_PATH, absoluteUrl, getSiteOrigin } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: 'NetworkAI - Smart Infrastructure Solutions',
  description:
    'NetworkAI provides consulting and implementation for ICT, ELV, Smart Home, and Smart Building systems for hospitality and enterprise projects.',
  openGraph: {
    title: 'NetworkAI - Smart Infrastructure Solutions',
    description:
      'Consulting and implementation for ICT, ELV, Smart Home, and Smart Building systems.',
    siteName: 'NetworkAI',
    type: 'website',
    images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE_PATH) }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NetworkAI - Smart Infrastructure Solutions',
    description:
      'Consulting and implementation for ICT, ELV, Smart Home, and Smart Building systems.',
    images: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)],
  },
}

const fontFamilyMap: Record<string, string> = {
  aptos: '"Aptos", "Aptos Display", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  segoe: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
  helvetica: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await safeDb(
    'theme settings',
    () =>
      prisma.setting.findMany({
      where: {
        key: {
          in: ['theme.fontFamily', 'theme.headingScale', 'theme.bodyScale'],
        },
      },
      select: {
        key: true,
        value: true,
      },
    }),
    [] as Array<{ key: string; value: string }>
  )

  const s = settings.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {} as Record<string, string>)
  const siteFontFamily = fontFamilyMap[s['theme.fontFamily']] ?? fontFamilyMap.aptos
  const headingScale = Number.parseFloat(s['theme.headingScale'] ?? '1')
  const bodyScale = Number.parseFloat(s['theme.bodyScale'] ?? '1')

  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className="antialiased"
        style={
          {
            ['--site-font-family' as any]: siteFontFamily,
            ['--heading-scale' as any]: Number.isFinite(headingScale) ? headingScale : 1,
            ['--body-scale' as any]: Number.isFinite(bodyScale) ? bodyScale : 1,
          } as React.CSSProperties
        }
      >
        <HtmlLangSync />
        {children}
      </body>
    </html>
  )
}
