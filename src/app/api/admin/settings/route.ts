import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { upsertLocalSettings } from '@/lib/local-content-store'

export async function PUT(req: NextRequest) {
  const data = await req.json()

  const entries = Object.entries(data).map(([key, value]) => ({
    key,
    value: value as string,
  }))

  try {
    await Promise.all(
      entries.map(({ key, value }) =>
        prisma.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    )
  } catch {
    upsertLocalSettings(entries)
  }

  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath('/contact')
  revalidatePath('/en/contact')
  return NextResponse.json({ success: true })
}
