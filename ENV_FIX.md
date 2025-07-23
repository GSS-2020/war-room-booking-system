# QUICK FIX - Environment Variables Setup

## ❌ Error yang Anda Alami:
```
environment variable "MONGODB_URI" references secret "mongodb_url", which does not exist.
```

## ✅ Penyelesaian:

### 1. Fix vercel.json (Sudah Diperbaiki)
Fail `vercel.json` sudah dikemaskini untuk mengeluarkan references kepada secrets yang tidak wujud.

### 2. Set Environment Variables di Vercel

1. **Pergi ke Vercel Dashboard**
   - Login ke https://vercel.com
   - Pilih project anda

2. **Navigate ke Settings**
   - Klik tab "Settings"
   - Klik "Environment Variables" dari sidebar

3. **Add Environment Variable**
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://NG999:F98sycXDgpYKbxnX@cluster0.bjsvjuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   - **Environments**: Tick semua (Production, Preview, Development)
   - Klik "Save"

4. **Redeploy Application**
   - Pergi ke tab "Deployments"
   - Klik "..." pada deployment terbaru
   - Pilih "Redeploy"

### 3. Verify Local Setup
Pastikan fail `.env.local` anda sudah betul:

```bash
MONGODB_URI=mongodb+srv://NG999:F98sycXDgpYKbxnX@cluster0.bjsvjuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### 4. Test Local Development
```bash
npm run dev
```

Buka http://localhost:3000 dan test aplikasi.

## 🔧 Alternative Solution

Jika masih ada masalah, cuba delete dan re-create environment variable:

1. Delete existing `MONGODB_URI` di Vercel
2. Add baru dengan nama dan value yang sama
3. Redeploy

## ✅ Verification

Selepas fix, aplikasi anda sepatutnya:
- Build successfully di Vercel
- Connect ke MongoDB Atlas
- Display dashboard kalendar dengan betul
- Allow create booking baru

Jika masih ada isu, check Vercel function logs untuk error details.
