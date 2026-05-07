import type { Metadata } from 'next'
import ProductsPageView from '@/components/public/ProductsPageView'
import { getProducts } from '@/lib/products'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  path: '/products',
  title: 'Products | NetworkAI',
  description:
    'Explore platforms developed by NetworkAI to help NetOps and infrastructure teams monitor, investigate, and operate complex environments with more context.',
})

export default function ProductsPage() {
  return <ProductsPageView locale="en" products={getProducts()} />
}
