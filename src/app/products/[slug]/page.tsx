import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetailPageView from '@/components/public/ProductDetailPageView'
import { getProductBySlug } from '@/lib/products'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}

  return buildMetadata({
    locale: 'vi',
    path: `/products/${slug}`,
    title: product.metaTitleVi,
    description: product.metaDescVi,
  })
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return <ProductDetailPageView locale="vi" product={product} />
}
