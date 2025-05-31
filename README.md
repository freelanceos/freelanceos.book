# FreelanceOS

موقع FreelanceOS هو منصة متكاملة لإدارة المشاريع والعمل الحر.

## المتطلبات

- Node.js 18 أو أحدث
- npm 7 أو أحدث

## التثبيت

1. قم بنسخ المستودع:
```bash
git clone <repository-url>
cd freelanceos
```

2. قم بتثبيت التبعيات:
```bash
npm install
```

3. قم بإنشاء ملف `.env` وأضف المتغيرات التالية:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RESEND_API_KEY=your_resend_api_key
```

## التطوير

لتشغيل المشروع في بيئة التطوير:
```bash
npm run dev
```

## البناء

لبناء المشروع للإنتاج:
```bash
npm run build
```

## النشر

يتم نشر المشروع تلقائياً على Netlify عند دفع التغييرات إلى الفرع الرئيسي.

## المتغيرات البيئية المطلوبة في Netlify

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_RESEND_API_KEY` 