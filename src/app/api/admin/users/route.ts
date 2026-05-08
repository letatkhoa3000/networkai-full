import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireCmsUser } from '@/lib/admin-auth'

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'EDITOR']).default('EDITOR'),
})

export async function GET() {
  const gate = await requireCmsUser({ adminOnly: true })
  if (!gate.ok) return gate.response

  const users = await prisma.user.findMany({
    orderBy: [{ role: 'asc' }, { name: 'asc' }],
    select: { id: true, name: true, email: true, role: true },
  })
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const gate = await requireCmsUser({ adminOnly: true })
  if (!gate.ok) return gate.response

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
