import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { requireCmsUser } from '@/lib/admin-auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const gate = await requireCmsUser()
  if (!gate.ok) return gate.response

  const { id } = await params
  const data = await req.json()

  const lead = await prisma.contactSubmission.update({
    where: { id },
    data: { status: data.status },
  })

  return NextResponse.json(lead)
}
