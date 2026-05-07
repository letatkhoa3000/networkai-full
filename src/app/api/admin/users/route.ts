import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'EDITOR']).default('EDITOR'),
})

async function requireAdmin() {
  const session = await auth()
  const user = session?.user as { role?: string } | undefined
  if (!session || user?.role !== 'ADMIN') {
    return null
  }
  return user
}

export async function GET() {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const users = await prisma.user.findMany({
    orderBy: [{ role: 'asc' }, { name: 'asc' }],
    select: { id: true, name: true, email: true, role: true },
  })
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = createUserSchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } })
  if (exists) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
  }

  const password = await bcrypt.hash(parsed.data.password, 10)
  const created = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password,
      role: parsed.data.role,
    },
    select: { id: true, name: true, email: true, role: true },
  })

  return NextResponse.json(created)
}
