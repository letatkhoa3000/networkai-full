import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ZodIssue, z } from 'zod'
import { NotificationEmail } from '@/lib/emails/notification'
import { AutoReplyEmail } from '@/lib/emails/autoreply'

const resend = new Resend(process.env.RESEND_API_KEY)

const localeSchema = z.enum(['vi', 'en']).default('vi')

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().min(10),
  honeypot: z.string().max(0).optional(),
  locale: localeSchema.optional(),
})

const messages = {
  vi: {
    rateLimit: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 1 giờ.',
    genericError: 'Có lỗi xảy ra. Vui lòng thử lại.',
    success: 'Yêu cầu đã được gửi thành công.',
    validation: {
      name: 'Tên phải có ít nhất 2 ký tự.',
      email: 'Email không hợp lệ.',
      message: 'Nội dung phải có ít nhất 10 ký tự.',
      honeypot: 'Yêu cầu không hợp lệ.',
      fallback: 'Vui lòng kiểm tra lại thông tin đã nhập.',
    },
  },
  en: {
    rateLimit: 'You have submitted too many requests. Please try again in 1 hour.',
    genericError: 'Something went wrong. Please try again.',
    success: 'Your request has been sent successfully.',
    validation: {
      name: 'Your name must be at least 2 characters.',
      email: 'Please enter a valid email address.',
      message: 'Your message must be at least 10 characters.',
      honeypot: 'Invalid request.',
      fallback: 'Please review the form information and try again.',
    },
  },
} as const

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 })
    return true
  }

  if (entry.count >= 5) return false

  entry.count++
  return true
}

function getLocale(value: unknown): 'vi' | 'en' {
  return value === 'en' ? 'en' : 'vi'
}

function getValidationMessage(locale: 'vi' | 'en', issue?: ZodIssue) {
  const t = messages[locale].validation
  const field = issue?.path[0]

  if (field === 'name') return t.name
  if (field === 'email') return t.email
  if (field === 'message') return t.message
  if (field === 'honeypot') return t.honeypot

  return t.fallback
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const body = await req.json()
  const locale = getLocale(body?.locale)

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: messages[locale].rateLimit },
      { status: 429 }
    )
  }

  if (body.honeypot) {
    return NextResponse.json({ success: true })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: getValidationMessage(locale, result.error.issues[0]) },
      { status: 400 }
    )
  }

  const { name, email, phone, company, serviceType, message, locale: parsedLocale } = result.data
  const activeLocale = parsedLocale ?? locale

  try {
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        serviceType: serviceType || null,
        message,
        ipAddress: ip,
        status: 'NEW',
      },
    })

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_NOTIFY_EMAIL!,
      subject: `[NetworkAI] Yêu cầu tư vấn mới từ ${name}`,
      html: NotificationEmail({ name, email, phone, company, serviceType, message }),
    })

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: activeLocale === 'en'
        ? 'NetworkAI - We received your request'
        : 'NetworkAI - Chúng tôi đã nhận được yêu cầu của bạn',
      html: AutoReplyEmail({ name, locale: activeLocale }),
    })

    return NextResponse.json({
      success: true,
      message: messages[activeLocale].success,
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: messages[activeLocale].genericError },
      { status: 500 }
    )
  }
}
