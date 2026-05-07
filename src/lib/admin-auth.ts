import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

type CmsRole = 'ADMIN' | 'EDITOR'

type SessionUser = {
  id?: string
  email?: string
  role?: string
}

export async function requireCmsUser(options?: { adminOnly?: boolean }) {
  const session = await auth()
  const user = session?.user as SessionUser | undefined

  if (!session || !user?.role) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  if (options?.adminOnly && user.role !== 'ADMIN') {
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    }
  }

  return {
    ok: true as const,
    user: {
      id: user.id ?? '',
      email: user.email ?? '',
      role: user.role as CmsRole,
    },
  }
}
