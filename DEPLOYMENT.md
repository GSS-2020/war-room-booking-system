# DEPLOYMENT GUIDE - NG MERS 999 Room Booking System

## 🚀 Langkah-langkah Deploy ke GitHub & Vercel

### 1. PERSIAPAN GITHUB

#### a) Buat GitHub Repository
1. Pergi ke [GitHub](https://github.com)
2. Klik "New Repository"
3. Nama repository: `booking-room-ng-mers-999`
4. Set sebagai Public
5. Jangan centang "Initialize with README" (kerana sudah ada)
6. Klik "Create Repository"

#### b) Push Code ke GitHub
Buka terminal/command prompt di folder projek dan jalankan:

```bash
# Initialize git (jika belum)
git init

# Add semua files
git add .

# Commit pertama
git commit -m "Initial commit: NG MERS 999 Room Booking System"

# Add remote repository (ganti YOUR_USERNAME dengan username GitHub anda)
git remote add origin https://github.com/YOUR_USERNAME/booking-room-ng-mers-999.git

# Push ke GitHub
git push -u origin main
```

### 2. SETUP MONGODB ATLAS

#### a) Whitelist Vercel IPs
1. Masuk ke [MongoDB Atlas](https://cloud.mongodb.com)
2. Pergi ke Security → Network Access
3. Klik "Add IP Address"
4. Pilih "Allow Access from Anywhere" atau masukkan `0.0.0.0/0`
5. Klik "Confirm"

#### b) Get Connection String
1. Pergi ke Database → Connect
2. Pilih "Connect your application"
3. Copy connection string
4. Ganti `<password>` dengan password sebenar

### 3. DEPLOY KE VERCEL

#### a) Setup Vercel Account
1. Pergi ke [Vercel](https://vercel.com)
2. Sign up/Login dengan GitHub account
3. Authorize Vercel untuk access GitHub repositories

#### b) Deploy Project
1. Di Vercel dashboard, klik "New Project"
2. Import repository `booking-room-ng-mers-999`
3. Configure Project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

#### c) Add Environment Variables
Sebelum deploy, tambah environment variables:

1. Klik "Environment Variables"
2. Tambah variable:
   - **Name**: `MONGODB_URI`
   - **Value**: Connection string MongoDB Atlas anda
   - **Environment**: Production, Preview, Development

3. Klik "Deploy"

### 4. TESTING DEPLOYMENT

#### a) Selepas Deploy Selesai
1. Vercel akan beri URL seperti: `https://booking-room-ng-mers-999.vercel.app`
2. Klik URL untuk test aplikasi
3. Test semua fungsi:
   - Dashboard kalendar
   - Buat tempahan baru
   - Lihat tempahan existing

#### b) Setup Custom Domain (Opsional)
1. Di Vercel dashboard → Project Settings → Domains
2. Tambah domain custom anda
3. Update DNS settings mengikut arahan

### 5. MAINTENANCE & UPDATES

#### a) Update Code
```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push origin main
```
Vercel akan auto-deploy setiap kali anda push ke main branch.

#### b) Monitor Aplikasi
1. Vercel Dashboard → Analytics untuk lihat usage
2. MongoDB Atlas → Metrics untuk monitor database
3. Check logs di Vercel Functions tab jika ada error

### 6. TROUBLESHOOTING

#### a) Build Errors
- Check TypeScript errors di Vercel build logs
- Pastikan semua dependencies ada dalam package.json
- Test `npm run build` secara local dahulu

#### b) Database Connection Issues
- Verify MONGODB_URI di Vercel environment variables
- Pastikan MongoDB Atlas whitelist IP Vercel
- Check MongoDB Atlas connection limits

#### c) API Errors
- Check Vercel Functions logs
- Verify API routes syntax
- Test API endpoints secara manual

### 7. BACKUP STRATEGY

#### a) Database Backup
- Setup automated backup di MongoDB Atlas
- Download backup secara berkala

#### b) Code Backup
- GitHub serve sebagai source code backup
- Consider branching strategy untuk different environments

## 📞 Support

Jika ada masalah semasa deployment:
1. Check Vercel documentation
2. MongoDB Atlas support documentation  
3. GitHub repository issues

## ✅ Checklist Deployment

- [ ] GitHub repository created dan code pushed
- [ ] MongoDB Atlas cluster setup dengan proper IP whitelist
- [ ] Vercel account connected dengan GitHub
- [ ] Environment variables configured di Vercel
- [ ] Application deployed dan accessible
- [ ] All features tested di production
- [ ] Custom domain setup (jika diperlukan)
- [ ] Monitoring setup untuk production usage
