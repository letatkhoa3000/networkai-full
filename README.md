# NetworkAI Website

Production-ready multi-page Next.js website for NetworkAI.

## Pages
- /
- /about
- /solutions
- /services
- /projects
- /contact

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Import the folder into Vercel.

## Notes
- Contact form currently validates and posts to `/api/contact`.
- The API currently returns success for testing. You can later connect Resend or another email service.
- Replace `/public/logo.png` with your official logo if needed.