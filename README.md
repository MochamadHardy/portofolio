# Portfolio Mochamad Hardy - Fullstack Developer

Portfolio profesional modern dengan arsitektur Dark Glassmorphism, performa tinggi, dan responsif di seluruh perangkat (Desktop, Tablet, Mobile).

## 🚀 Fitur & Keunggulan
- **Design System Modern**: Dark glassmorphism, ambient gradient glow, tipografi *Plus Jakarta Sans* & *JetBrains Mono*, serta FontAwesome 6 icons.
- **Fullstack Focus**: Menyorot keahlian utama di bidang backend (**Laravel**, **Flask**, **PHP**, **Python**, **PostgreSQL**, **MySQL**, **RESTful API**) dan frontend (**Vue.js**, **JavaScript ES6+**, **Tailwind/Bootstrap**).
- **Bingkai Modular Siap Pakai**:
  - **Avatar Frame**: Bingkai foto profil dengan glowing border dan *floating tech badges* (Vue.js, Laravel, Flask).
  - **Mockup Project Frame**: Tampilan browser modern (macOS style window dots + URL bar). Dilengkapi sistem deteksi otomatis: jika screenshot belum dimasukkan, bingkai placeholder elegan tetap tampil rapi; saat file gambar ditambahkan, otomatis tampil seketika.
- **Filter Proyek Interaktif**: Filter dinamis (Semua, Laravel & Vue, Flask & Python, Fullstack) tanpa reload.
- **Aksi Cepat Kontak**: Fitur salin alamat email satu klik (*Copy to Clipboard*), integrasi WhatsApp langsung, dan formulir pesan responsif.
- **ScrollSpy & Smooth Reveal**: Navigasi pintar yang menandai menu aktif secara otomatis saat halaman digulir.

---

## 📸 Panduan Mengisi Foto & Gambar

### 1. Foto Profil Wajah
- File foto profil diarahkan ke: `assets/images/dys.jpeg`
- Anda cukup menimpa file `dys.jpeg` dengan foto baru Anda, atau ganti atribut `src` di `index.html` pada bagian `<div class="avatar-frame-inner">`.
- Sudah dilengkapi dengan fallback otomatis jika gambar bermasalah.

### 2. Tangkapan Layar Proyek (Project Screenshots)
Simpan file screenshot proyek Anda di folder `assets/images/` dengan penamaan berikut:
- **Proyek 1 (Client Project Live)**: `assets/images/garuda-tac.png` (Garuda Tactical - GARTAC E-Commerce) — *Sudah aktif dan terpasang!*
- **Proyek 2**: `assets/images/project-2.jpg` (Realtime Data Analytics & Microservice API)
- **Proyek 3**: `assets/images/project-3.jpg` (Collaborative Kanban & Task Management)
- **Proyek 4**: `assets/images/project-4.jpg` (Dynamic Web Portal & Notification Engine)

*Catatan: Sistem secara otomatis menampilkan gambar segera setelah Anda menaruh file dengan nama di atas di folder `assets/images/`.*

---

## 🛠️ Kustomisasi Kontak & Tautan
Buka `index.html` dan sesuaikan informasi berikut:
1. **Email**: Ubah `hardy@example.com` dan atribut `data-email` pada tombol salin.
2. **WhatsApp**: Ganti nomor pada link `https://wa.me/6281234567890`.
3. **GitHub & LinkedIn**: Sesuaikan tautan profil di bagian Proyek, Kontak, dan Footer.
