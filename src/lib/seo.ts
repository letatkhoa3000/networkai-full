import type { Metadata } from 'next'
import { Locale, withLocalePath } from '@/lib/site-locale'

const FALLBACK_ORIGIN = 'http://localhost:3000'
export const DEFAULT_OG_IMAGE_PATH = '/opengraph-image'

export function getSiteOrigin() {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || FALLBACK_ORIGIN
}

export function absoluteUrl(path: string) {
  return new URL(path, getSiteOrigin()).toString()
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale
  path: string
  title: string
  description: string
  image?: string | null
}): Metadata {
  const localizedPath = withLocalePath(locale, path)
  const shareImage = image || DEFAULT_OG_IMAGE_PATH

  return {
    metadataBase: new URL(getSiteOrigin()),
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        vi: absoluteUrl(path),
        en: absoluteUrl(withLocalePath('en', path)),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath),
      siteName: 'NetworkAI',
      locale: locale === 'en' ? 'en_US' : 'vi_VN',
      type: 'website',
      images: [{ url: absoluteUrl(shareImage) }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(shareImage)],
    },
  }
}
