import { notFound } from 'next/navigation'
import ProductEditForm from '@/components/admin/ProductEditForm'
import { adminCopy, getAdminLocale } from '@/lib/admin-locale'
import { getProductBySlug } from '@/lib/products'

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].forms
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-slate-950">{copy.productTitle}</h1>
        <p className="mt-1 text-sm text-slate-500">{product.nameVi}</p>
      </div>
      <ProductEditForm product={product} locale={locale} />
    </div>
  )
}
