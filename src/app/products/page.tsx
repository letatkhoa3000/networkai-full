import type { Metadata } from 'next'
import ProductsPageView from '@/components/public/ProductsPageView'
import { getProducts } from '@/lib/products'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  locale: 'vi',
  path: '/products',
  title: 'Sản phẩm | NetworkAI',
  description:
    'Khám phá các nền tảng do NetworkAI phát triển để giúp đội NetOps và hạ tầng theo dõi, điều tra, và vận hành mạng hiệu quả hơn.',
})

export default function ProductsPage() {
  return <ProductsPageView locale="vi" products={getProducts()} />
}
