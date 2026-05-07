const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '/home/khoa/projects/networkai/.env' })

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@networkai.vn'
  const plain = 'NetworkAI@2025!'
  const hash = await bcrypt.hash(plain, 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hash,
      name: 'NetworkAI Admin',
      role: 'ADMIN',
    },
    create: {
      email,
      password: hash,
      name: 'NetworkAI Admin',
      role: 'ADMIN',
    },
  })

  console.log(JSON.stringify({ ok: true, email: user.email, role: user.role, password: plain }, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
