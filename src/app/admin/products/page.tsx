import Link from 'next/link'
import { getProducts } from '@/lib/products'
import { adminCopy, getAdminLocale, withAdminLocale } from '@/lib/admin-locale'

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].products
  const products = getProducts()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-slate-950">{copy.title}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {products.length} {copy.countSuffix}
        </p>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-[#f8fbfe]">
              {copy.headers.map((label) => (
                <th key={label} className="px-5 py-4 text-left text-xs font-600 uppercase tracking-wider text-slate-500">
                  {label}
                </th>
              ))}
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.slug} className={`border-b border-slate-200 transition-colors hover:bg-[#f8fbfe] ${index === products.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-5 py-3">
                  <p className="text-sm font-600 text-slate-950">{product.nameVi}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{product.nameEn}</p>
                </td>
                <td className="px-5 py-3 font-mono text-xs text-slate-500">{product.slug}</td>
                <td className="px-5 py-3 text-sm text-slate-600">{locale === 'en' ? product.categoryEn : product.categoryVi}</td>
                <td className="px-5 py-3">
                  <Link href={withAdminLocale(`/admin/products/${product.slug}/edit`, locale)} className="text-sm font-500 text-[#0f5bff] transition-colors hover:text-[#0848d6]">
                    {copy.edit}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
