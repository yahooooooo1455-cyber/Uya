# Media Pembelajaran Bangun Datar Kelas 4 SD (React + Supabase + Cloudinary + Netlify)

Aplikasi web interaktif **Kearifan Lokal di Kalimantan Selatan — Materi Bangun Datar Kelas IV SD (Fase B)** yang telah dikonversi menggunakan:
- **React 18 + Vite + React Router** (Single Page Application cepat tanpa reload halaman)
- **Supabase** (Database PostgreSQL untuk menyimpan Link Soal Web Lain, QR Code, Video, Soal Pilihan Ganda & Isian)
- **Cloudinary** (Cloud Media Storage untuk mengunggah gambar sampul/thumbnail dan QR Code kustom)
- **Netlify** (Siap di-online-kan lengkap dengan konfigurasi routing `netlify.toml`)

---

## ✨ Fitur Unggulan: Sistem Link Soal Eksternal & QR Code Otomatis
Di halaman **Pilihan Ganda** (`/pilihan-ganda`), **Isian** (`/isian`), **Daftar Pustaka** (`/daftar-pustaka`), maupun halaman **⚙️ Kelola** (`/kelola`):
1. **QR Code Otomatis dari Link**: Cukup tempelkan link soal dari web lain (Wordwall, Quizizz, Google Form, Kahoot, dll.), maka sistem **otomatis men-generate QR Code tajam** langsung dari URL tersebut tanpa perlu membuat gambar QR manual.
2. **Dukungan Upload Gambar & QR Kustom via Cloudinary**: Jika ingin memakai gambar sampul (thumbnail) atau gambar QR Code sendiri, tinggal pilih file gambar dan sistem otomatis mengunggahnya ke **Cloudinary**.
3. **Perbesar & Unduh QR Code**: Siswa dapat melakukan scan langsung dari layar proyektor di kelas menggunakan tombol **🔍 Perbesar** atau guru dapat mengunduh file `.png` QR Code lewat tombol **⬇️ Unduh QR**.

---

## 🚀 Cara Menghubungkan Supabase, Cloudinary & Netlify

### 1. Hubungkan Database Supabase
1. Buat akun dan project baru di [supabase.com](https://supabase.com).
2. Buka menu **SQL Editor** → klik **New Query**, lalu copy-paste seluruh isi file [`supabase-schema.sql`](./supabase-schema.sql) dan klik **Run**.
3. Buka **Project Settings → API**, lalu salin **Project URL** dan **anon public key**.

### 2. Hubungkan Penyimpanan Gambar Cloudinary
1. Buat akun di [cloudinary.com](https://cloudinary.com) dan catat **Cloud Name** di Dashboard.
2. Buka **Settings → Upload → Upload Presets → Add Upload Preset**.
3. Ubah *Signing Mode* menjadi **Unsigned**, klik **Save**, lalu catat nama Upload Preset tersebut.

### 3. Masukkan Kunci API (Bisa Lewat Web Langsung atau `.env`)
- **Cara Paling Mudah (Langsung di Web):** Buka menu **⚙️ Kelola** (`/kelola`) → tab **🔑 3. Kunci Supabase, Cloudinary & Netlify**, lalu tempelkan ke-4 kunci di atas dan klik **Simpan**.
- **Cara via File `.env` / Netlify:** Salin file `.env.example` menjadi `.env` (atau masukkan di menu **Site Configuration → Environment Variables** di Netlify):
  ```env
  VITE_SUPABASE_URL=https://project-kamu.supabase.co
  VITE_SUPABASE_ANON_KEY=kunci-anon-supabase-kamu
  VITE_CLOUDINARY_CLOUD_NAME=cloud-name-kamu
  VITE_CLOUDINARY_UPLOAD_PRESET=upload-preset-unsigned-kamu
  ```

### 4. Online-kan ke Netlify
- Hubungkan repository GitHub ke [app.netlify.com](https://app.netlify.com) (konfigurasi `npm run build` dan folder `dist` sudah otomatis diatur oleh [`netlify.toml`](./netlify.toml)), **ATAU**
- Jalankan `npm run build` di komputer lalu tarik (*drag & drop*) folder `dist` ke Netlify Drop.
