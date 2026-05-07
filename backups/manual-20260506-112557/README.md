# Manual Backup 2026-05-06 11:25:57

Đây là bản backup dữ liệu và cấu hình vận hành của dự án `NetworkAI` tại thời điểm tạo backup.

## Nội dung chính

- `src/content`
- `prisma`
- `public/uploads`
- `public/brand`
- `public/vendor-logos`
- `content-backup-20260422-200022.json`
- `.env`
- `.env.local`
- `package.json`
- `package-lock.json`
- `prisma.config.ts`
- `README.md`
- `AGENTS.md`
- `CLAUDE.md`
- `manifest.json`

## File tài liệu liên quan

- `docs/PROJECT_GUIDE.md`
- `docs/BACKUP_RESTORE_GUIDE.md`

## Mục đích

Bản backup này dùng để:

- khôi phục nội dung CMS local
- khôi phục hình ảnh upload
- khôi phục schema/migrations Prisma
- khôi phục cấu hình môi trường và package

## Gợi ý restore nhanh

1. Copy lại các thư mục:
   - `src/content`
   - `public/uploads`
   - `public/brand`
   - `public/vendor-logos`
2. Nếu cần, copy lại:
   - `prisma`
   - `.env`
   - `.env.local`
3. Chạy lại:

```bash
cd ~/projects/networkai
rm -rf .next
npm run dev
```
