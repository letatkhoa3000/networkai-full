import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['ADMIN', 'EDITOR']).optional(),
})

async function requireAdmin() {
  const session = await auth()
  const user = session?.user as { id?: string; role?: string } | undefined
  if (!session || user?.role !== 'ADMIN') {
    return null
  }
  return user
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = updateUserSchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const { id } = await params
  const data = parsed.data

  const updated = await prisma.user.update({
    where: { id },
    data: {
      ...(data.name ? { name: data.name } : {}),
      ...(data.email ? { email: data.email } : {}),
      ...(data.role ? { role: data.role } : {}),
      ...(data.password ? { password: await bcrypt.hash(data.password, 10) } : {}),
    },
    select: { id: true, name: true, email: true, role: true },
  })

  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (admin.id === id) {
    return NextResponse.json({ error: 'Cannot delete current user' }, { status: 400 })
  }

  await prisma.user.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
