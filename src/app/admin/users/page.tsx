import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { adminCopy, getAdminLocale, withAdminLocale } from '@/lib/admin-locale'
import UserManagementPanel from '@/components/admin/UserManagementPanel'
import { safeDb } from '@/lib/safe-db'
import type { UserRow } from "@/components/admin/UserManagementPanel"
export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].users
  const session = await auth()
  if (!session) redirect(withAdminLocale('/admin/login', locale))

  const currentUser = session.user as { id?: string; role?: string; email?: string } | undefined
  const users = await safeDb(
    'admin users list',
    () =>
      prisma.user.findMany({
        orderBy: [{ role: 'asc' }, { name: 'asc' }],
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      }),
    currentUser?.email
      ? [
          {
            id: String(currentUser.id ?? 'fallback-admin'),
            name: 'NetworkAI Admin',
            email: String(currentUser.email),
            role: String(currentUser.role ?? 'ADMIN'),
          },
        ]
      : []
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-slate-950">{copy.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{copy.subtitle}</p>
      </div>

      <UserManagementPanel
        locale={locale}
        users={users as UserRow[]}
        currentUserId={currentUser?.id}
        canManage={currentUser?.role === 'ADMIN'}
      />
    </div>
  )
}
