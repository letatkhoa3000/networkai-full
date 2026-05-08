import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const FALLBACK_ADMIN_EMAIL = process.env.CMS_FALLBACK_EMAIL
const FALLBACK_ADMIN_PASSWORD = process.env.CMS_FALLBACK_PASSWORD

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id
      }
      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }).safeParse(credentials)

        if (!parsed.success) return null
        const { email, password } = parsed.data

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          })

          if (!user) return null

          const valid = await bcrypt.compare(password, user.password)
          if (!valid) return null

          return { id: user.id, email: user.email, name: user.name, role: user.role }
        } catch {
          if (
            FALLBACK_ADMIN_EMAIL &&
            FALLBACK_ADMIN_PASSWORD &&
            email === FALLBACK_ADMIN_EMAIL &&
            password === FALLBACK_ADMIN_PASSWORD
          ) {
            return {
              id: 'fallback-admin',
              email: FALLBACK_ADMIN_EMAIL,
              name: 'NetworkAI Admin',
              role: 'ADMIN',
            }
          }

          return null
        }
      },
    }),
  ],
})
