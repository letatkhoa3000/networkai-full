# Backup and Restore Guide

## 1. Backup vừa tạo

Backup dữ liệu hiện tại đã được tạo tại:

- `backups/manual-20260506-112557`

Trong đó có:

- `src/content`
- `prisma`
- `public/uploads`
- `public/brand`
- `public/vendor-logos`
- `backups/content-backup-20260422-200022.json`
- `.env`
- `.env.local`
- `package.json`
- `package-lock.json`
- `prisma.config.ts`
- `README.md`
- `AGENTS.md`
- `CLAUDE.md`
- `manifest.json`

## 2. Ý nghĩa từng phần trong backup

### 2.1. `src/content`

Chứa dữ liệu CMS local hiện tại:

- `cms-local.json`
- `products.json`

### 2.2. `prisma`

Chứa:

- schema hiện tại
- seed
- migrations

### 2.3. `public/uploads`

Chứa toàn bộ hình ảnh upload từ CMS:

- site content
- logos
- services
- projects

### 2.4. `public/brand`

Chứa logo thương hiệu chính.

### 2.5. `public/vendor-logos`

Chứa logo vendor/partner public.

### 2.6. `.env` và `.env.local`

Chứa biến môi trường hiện tại.

Lưu ý:

- các file này có thể chứa thông tin nhạy cảm
- không nên public ra ngoài

## 3. Cách restore nhanh

### Phương án 1: restore dữ liệu content/upload

Nếu code vẫn còn nhưng dữ liệu mất:

1. Copy từ backup vào project hiện tại:

- `src/content/*`
- `public/uploads/*`
- `public/brand/*`
- `public/vendor-logos/*`

2. Khởi động lại:

```bash
cd ~/projects/networkai
rm -rf .next
npm run dev
```

### Phương án 2: restore cả schema/migrations

Nếu cần trả lại cả cấu trúc Prisma:

1. Copy thư mục `prisma` từ backup vào project
2. Chạy:

```bash
cd ~/projects/networkai
npx prisma generate
```

3. Nếu DB hoạt động:

```bash
npx prisma migrate deploy
```

### Phương án 3: restore toàn bộ file cấu hình

Nếu cần đưa project về đúng trạng thái vận hành tại thời điểm backup:

1. copy các file:

- `.env`
- `.env.local`
- `package.json`
- `package-lock.json`
- `prisma.config.ts`

2. cài lại package nếu cần:

```bash
npm install
```

3. chạy lại:

```bash
npm run dev
```

## 4. Cách kiểm tra backup

### 4.1. Kiểm tra manifest

Mở file:

- `backups/manual-20260506-112557/manifest.json`

File này liệt kê:

- đường dẫn file
- kích thước
- thời gian sửa cuối

### 4.2. Kiểm tra public site

Mở:

- `/`
- `/about`
- `/services`
- `/projects`
- `/partners`
- `/contact`

và bản `/en/...`

### 4.3. Kiểm tra admin

Mở:

- `/admin/login`
- `/admin/dashboard`
- `/admin/home`
- `/admin/about`
- `/admin/services`
- `/admin/projects`
- `/admin/partners`
- `/admin/products`
- `/admin/settings`

## 5. Khi DB vẫn lỗi nhưng cần chạy site

Nếu Prisma/Supabase lỗi:

1. giữ nguyên backup hiện tại
2. dùng fallback content trong:
   - `backups/content-backup-20260422-200022.json`
   - `src/content/cms-local.json`
3. chạy:

```bash
cd ~/projects/networkai
rm -rf .next
npm run dev
```

Public site và phần lớn admin vẫn có thể hoạt động ở mức fallback.

## 6. Khuyến nghị vận hành

Nên duy trì 3 lớp backup:

1. `backup JSON content`
2. `public/uploads`
3. `database export` thật từ Supabase/Postgres

Nếu muốn hệ thống an toàn hơn nữa, nên thêm:

- backup DB định kỳ dạng `.sql`
- backup media định kỳ ra ổ ngoài hoặc cloud storage
- backup `src/content/cms-local.json` sau mỗi đợt chỉnh CMS quan trọng

## 6.1. Restore database từ backup JSON

Script restore hiện có tại:

- `scripts/restore-db-backup.js`

### Kiểm tra backup trước khi restore

```bash
cd ~/projects/networkai
node scripts/restore-db-backup.js --file backups/db-20260507-082840/database-backup.json
```

Lệnh này chỉ in ra:

- file backup sẽ dùng
- số bản ghi hiện tại trong DB
- số bản ghi sắp restore

Nó **không ghi đè dữ liệu**.

### Restore thật vào database

```bash
cd ~/projects/networkai
node scripts/restore-db-backup.js --file backups/db-20260507-082840/database-backup.json --force
```

Lưu ý rất quan trọng:

- script sẽ **xóa dữ liệu hiện có** trong các bảng được backup
- sau đó chèn lại dữ liệu từ `database-backup.json`
- thứ tự restore đã được xử lý theo quan hệ bảng

### Các bảng được restore

- `users`
- `settings`
- `homepageSections`
- `coreValues`
- `services`
- `solutions`
- `projects`
- `projectServices`
- `partners`
- `teamMembers`
- `contactSubmissions`

### File mặc định

Nếu không truyền `--file`, script hiện sẽ mặc định dùng:

- `backups/db-20260507-082840/database-backup.json`

## 7. Ghi chú thực tế cho dự án này

Ở thời điểm tài liệu này được tạo:

- DB production/dev đang có lỗi kết nối
- CMS đã được vá nhiều lớp fallback
- vì vậy backup local content và upload là cực kỳ quan trọng

Nếu về sau DB được sửa xong, nên làm thêm:

1. đồng bộ `cms-local.json` vào DB
2. xác minh public routes dùng dữ liệu DB đúng lại
3. tạo backup DB chuẩn sau khi đồng bộ thành công
