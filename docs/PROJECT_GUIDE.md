# NetworkAI Website Project Guide

## 1. Mục tiêu dự án

Website `NetworkAI` là một hệ thống giới thiệu doanh nghiệp và CMS nội bộ, phục vụ:

- hiển thị nội dung public song ngữ `Việt / Anh`
- quản trị nội dung qua CMS admin
- lưu trữ và biên tập:
  - trang chủ
  - giới thiệu
  - dịch vụ
  - sản phẩm
  - dự án
  - đối tác
  - cài đặt chung

Hệ thống được tối ưu để vẫn có thể hiển thị và chỉnh sửa nội dung trong trường hợp database Prisma / Supabase tạm thời lỗi kết nối.

## 2. Stack kỹ thuật

- Framework: `Next.js 16.2.4`
- Runtime UI: `React 19.2.4`
- ORM: `Prisma 6.19.3`
- Database chuẩn thiết kế: `PostgreSQL / Supabase`
- Auth CMS: `NextAuth v5 beta`
- Validation: `zod`
- Form handling: `react-hook-form`
- Mail: `resend`
- Styling: `Tailwind CSS 3.4.17`

## 3. Cấu trúc route chính

### Public routes

- `/`
- `/about`
- `/services`
- `/services/[slug]`
- `/products`
- `/products/[slug]`
- `/projects`
- `/projects/[slug]`
- `/partners`
- `/contact`

### English routes

- `/en`
- `/en/about`
- `/en/services`
- `/en/services/[slug]`
- `/en/products`
- `/en/products/[slug]`
- `/en/projects`
- `/en/projects/[slug]`
- `/en/partners`
- `/en/contact`

### Admin routes

- `/admin/login`
- `/admin/dashboard`
- `/admin/home`
- `/admin/about`
- `/admin/services`
- `/admin/services/[id]/edit`
- `/admin/projects`
- `/admin/projects/[id]/edit`
- `/admin/partners`
- `/admin/partners/[id]/edit`
- `/admin/products`
- `/admin/products/[slug]/edit`
- `/admin/settings`
- `/admin/users`

## 4. Nguồn dữ liệu hiện tại

Hệ thống đang dùng 3 lớp dữ liệu:

### 4.1. Database chính

Đọc/ghi qua Prisma:

- file schema: `prisma/schema.prisma`
- client: `src/lib/prisma.ts`

### 4.2. Backup dữ liệu chuẩn

Nguồn backup gốc:

- `backups/content-backup-20260422-200022.json`

File này đang được dùng làm fallback khi DB không truy cập được.

### 4.3. Local CMS fallback

Nguồn local hiện tại:

- `src/content/cms-local.json`

File này lưu các thay đổi CMS khi:

- database lỗi kết nối
- API admin fallback sang local store

## 5. Fallback logic hiện tại

### 5.1. Đọc dữ liệu

Helpers liên quan:

- `src/lib/safe-db.ts`
- `src/lib/backup-content.ts`

Nguyên tắc:

- nếu Prisma query thành công: dùng DB
- nếu Prisma query lỗi: dùng fallback từ backup/local

### 5.2. Ghi dữ liệu

Helpers liên quan:

- `src/lib/local-content-store.ts`

Nguyên tắc:

- nếu Prisma update thành công: ghi vào DB
- nếu Prisma update lỗi: ghi vào `src/content/cms-local.json`

## 6. CMS login hiện tại

Auth fallback hiện có trong:

- `src/lib/auth.ts`

Fallback login:

- Email: `admin@networkai.vn`
- Password: `NetworkAI@2025!`

Lưu ý:

- đây là fallback để vào CMS khi DB lỗi
- khi DB hoạt động ổn định, nên reset về user/password thật trong database

## 7. Dữ liệu quan trọng đang được quản lý

### 7.1. Homepage

- hero
- about short
- core values
- services teaser
- project teaser
- partner ecosystem
- CTA cuối trang

### 7.2. Services

Mỗi service hiện hỗ trợ:

- `titleVi`, `titleEn`
- `descriptionVi`, `descriptionEn`
- `shortDescVi`, `shortDescEn`
- `imageUrl`
- `problemPointsVi/En`
- `scopeItemsVi/En`
- `deliverablesVi/En`
- `processStepsVi/En`
- `fitForVi/En`
- `systemTagsVi/En`
- `benefitsVi/En`
- `faqItemsVi/En`
- `metaTitleVi/En`
- `metaDescVi/En`

### 7.3. Projects

Mỗi project hiện hỗ trợ:

- `slug`
- `nameVi`, `nameEn`
- `descriptionVi`, `descriptionEn`
- `shortDescVi`, `shortDescEn`
- `thumbnailUrl`
- `imageUrls`
- `location`
- `year`
- `hotelBrand`
- `featured`
- `isVisible`
- `sortOrder`
- `metaTitleVi/En`
- `metaDescVi/En`

### 7.4. Partners

- `name`
- `logoUrl`
- `websiteUrl`
- `type`
- `isVisible`
- `sortOrder`

### 7.5. Products

Hiện sản phẩm sử dụng nguồn:

- `src/content/products.json`

Admin phần product đã được thêm, nhưng phần logic dữ liệu sản phẩm chủ yếu vẫn theo file content.

## 8. Media và upload

Các thư mục upload hiện tại:

- `public/uploads/site-content`
- `public/uploads/services`
- `public/uploads/projects`
- `public/uploads/logos`

Ngoài ra còn có:

- `public/brand`
- `public/vendor-logos`

## 9. Cách chạy local

```bash
cd ~/projects/networkai
npm run dev
```

Mở:

- public: `http://localhost:3000`
- admin: `http://localhost:3000/admin/login`

## 10. Khi gặp lỗi DB

Nếu Supabase / Prisma không kết nối:

1. public site vẫn sẽ hiển thị qua fallback backup/local
2. nhiều màn admin vẫn mở được qua fallback
3. một số API admin sẽ ghi vào `src/content/cms-local.json`

Việc cần làm:

```bash
cd ~/projects/networkai
rm -rf .next
npm run dev
```

## 11. File quan trọng nên biết

- `src/lib/auth.ts`
- `src/lib/safe-db.ts`
- `src/lib/backup-content.ts`
- `src/lib/local-content-store.ts`
- `prisma/schema.prisma`
- `src/content/cms-local.json`
- `src/content/products.json`
- `backups/content-backup-20260422-200022.json`

## 12. Tình trạng hiện tại

Hiện codebase đang ở trạng thái:

- public site có fallback dữ liệu
- admin đã có nhiều fallback route
- DB thật vẫn đang có vấn đề kết nối
- local CMS data đang đóng vai trò nguồn thay thế tạm thời

Nếu muốn đưa hệ thống về production ổn định lâu dài, bước tiếp theo nên là:

1. khôi phục kết nối DB thật
2. đẩy toàn bộ nội dung local/backup ngược lại vào DB
3. bỏ dần các fallback tạm không còn cần thiết
