# NG MERS 999 - Room Booking System

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/booking-room-ng-mers-999)

Sistem tempahan bilik untuk NG MERS 999 - War Room 1 dan War Room 2.

## 🚀 Demo

[Live Demo di Vercel](https://your-app-name.vercel.app)

## ✨ Ciri-ciri

- 📅 **Dashboard Kalendar**: Paparan kalendar bulanan untuk semua tempahan
- 📝 **Borang Tempahan**: Buat tempahan baru dengan pengesahan
- 🏢 **Dua War Room**: War Room 1 dan War Room 2 tersedia untuk ditempah
- 🔒 **Pengesanan Konflik**: Mencegah tempahan berganda
- 🇲🇾 **Penyetempatan Malaysia**: Antara muka dalam Bahasa Malaysia
- 📱 **Reka Bentuk Responsif**: Berfungsi di desktop dan mobile

## 🛠 Teknologi

- **Frontend**: Next.js 14 dengan TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB Atlas
- **Deployment**: Vercel
- **State Management**: React Hooks

## 📦 Deployment ke Vercel

### 1. Fork/Clone Repository

```bash
git clone https://github.com/your-username/booking-room-ng-mers-999.git
cd booking-room-ng-mers-999
npm install
```

### 2. Setup MongoDB Atlas

1. Buat akaun di [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Buat cluster baru
3. Dapatkan connection string anda
4. Whitelist IP Vercel (0.0.0.0/0 untuk semua IP)

### 3. Deploy ke Vercel

#### Cara 1: Deploy dengan Button
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/booking-room-ng-mers-999)

#### Cara 2: Manual Deploy

1. Push kod ke GitHub repository anda
2. Pergi ke [Vercel Dashboard](https://vercel.com/dashboard)
3. Klik "New Project"
4. Import GitHub repository anda
5. Set environment variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bookings?retryWrites=true&w=majority
```

6. Klik "Deploy"

### 4. Set Environment Variables di Vercel

Di Vercel Dashboard → Project Settings → Environment Variables, tambah:

| Name | Value |
|------|--------|
| `MONGODB_URI` | Connection string MongoDB Atlas anda |

### 5. Setup Custom Domain (Opsional)

1. Pergi ke Project Settings → Domains
2. Tambah domain custom anda
3. Update DNS settings mengikut arahan Vercel

## 🏃‍♂️ Local Development

### Prerequisites
- Node.js (v18 atau lebih tinggi)
- MongoDB Atlas account

### Installation

1. **Clone repository**:
   ```bash
   git clone https://github.com/your-username/booking-room-ng-mers-999.git
   cd booking-room-ng-mers-999
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` dan masukkan MongoDB connection string anda:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bookings?retryWrites=true&w=majority
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Buka aplikasi**: Layari http://localhost:3000

## Room Information

### War Room 1
- Color coding: Blue
- Available for booking

### War Room 2  
- Color coding: Green
- Available for booking

## Usage

1. **View Bookings**: Default dashboard shows calendar view of all bookings
2. **Create Booking**: Click "Buat Tempahan" tab to access booking form
3. **Form Fields**:
   - Nama: Your name
   - Tarikh: Date of booking
   - Masa Mula: Start time
   - Masa Tamat: End time
   - Nama Meeting: Meeting/event name
   - Bilik: Choose between War Room 1 or War Room 2

## Project Structure

```
src/
├── app/
│   ├── api/bookings/     # API routes for bookings
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main dashboard page
├── components/
│   ├── BookingCalendar.tsx  # Calendar component
│   └── BookingForm.tsx      # Booking form component
├── lib/
│   └── mongodb.ts        # Database connection
└── models/
    └── Booking.ts        # Booking data model
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## Contributing

When making changes to this project:

1. Maintain Bahasa Malaysia interface text
2. Ensure booking conflict validation works
3. Keep color coding consistent (Blue for War Room 1, Green for War Room 2)
4. Test calendar and form functionality
5. Follow TypeScript best practices
