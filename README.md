# Nusantara Global Logistics (NGL) - Landing Page Ekspor Impor

Landing page modern, responsif, dan siap pakai untuk perusahaan jasa ekspor impor, *freight forwarding*, dan Pengusaha Pengurusan Jasa Kepabeanan (PPJK) resmi di Indonesia.

---

## 🚀 Fitur Unggulan

1. **Interactive Freight Rate Calculator (Kalkulator Estimasi Tarif Kargo)**
   - Pilihan rute negara asal (China, Singapura, USA, Jepang, Korea, Uni Eropa) ke pelabuhan utama Indonesia (Tanjung Priok, Tanjung Perak, Belawan, Tanjung Emas, Makassar).
   - Mendukung perhitungan moda Laut LCL (per CBM), Laut FCL (per Kontainer), dan Udara Express (per Kg).
   - Hasil kalkulasi instan lengkap dengan tombol pengiriman format rincian langsung ke WhatsApp.

2. **Live Container & AWB Tracking Simulation (Simulasi Pelacakan Kargo)**
   - Cek status resi/kontainer dengan status dinamis dan progress bar visual.
   - Dilengkapi *preset resi sampel*:
     - `NGL-882910` (Pengiriman Laut Guangzhou - Sedang Customs Clearance)
     - `NGL-554102` (Pengiriman Udara Changi - Telah Tiba & Diterima)
     - `NGL-110293` (Pengiriman FCL Kontainer 40ft dari Los Angeles USA)
   - Input nomor resi kargo kustom lainnya juga akan menampilkan simulasi timeline status logistik.

3. **Showcase Layanan Ekspor-Impor Terpadu**
   - Sea Freight (FCL / LCL)
   - Air Freight Express
   - Customs Clearance & PPJK Jalur Hijau
   - Door-to-Door All-In (Terima Beres)
   - Pusat Logistik Berikat (PLB) & Pergudangan
   - Pendampingan Ekspor Produk UMKM (Sertifikat COO / SKA)

4. **Tabel Perbandingan Nilai & Kepatuhan Hukum**
   - Menegaskan kredibilitas legalitas resmi PPJK vs ekspedisi non-resmi tanpa izin.

5. **Pusat Bantuan & FAQ Interaktif**
   - Accordion interaktif untuk pertanyaan penting seputar perizinan NIB/API, asuransi Marine Cargo, dan durasi pengiriman.

6. **Formulir Permintaan Penawaran & Integrasi WhatsApp Otomatis**
   - Pengunjung dapat mengisi form dan langsung membuka chat WhatsApp dengan teks pesan kargo yang terstruktur rapi.

7. **Desain Modern & Sepenuhnya Responsif**
   - Dibangun dengan semantic HTML5, Tailwind CSS, Lucide Icons, dan Google Fonts (*Plus Jakarta Sans* & *Outfit*).

---

## 📂 Struktur File

```
landing-pages/
├── index.html          # Struktur halaman utama landing page
├── css/
│   └── styles.css      # Styling custom (glassmorphism, animations, glow effect)
├── js/
│   └── main.js         # Logika interaktif kalkulator tarif, tracking kargo, FAQ, & WhatsApp
└── README.md           # Dokumentasi proyek
```

---

## 💻 Cara Menjalankan

Anda dapat langsung membuka file `index.html` menggunakan browser apa saja:

### Opsi 1: Buka Langsung di Browser
Klik dua kali pada file `index.html` atau buka file tersebut melalui browser (Google Chrome, Microsoft Edge, Firefox, Safari).

### Opsi 2: Menggunakan Local Development Server (Node.js)
Jalankan perintah berikut di terminal:
```bash
npx serve .
```
Lalu buka alamat `http://localhost:3000` di browser Anda.

---

## ⚙️ Cara Kustomisasi Kontak & Branding

1. **Ubah Nomor WhatsApp & Telepon**:
   - Buka `index.html` dan `js/main.js`.
   - Cari nomor `6281234567890` dan gantikan dengan nomor WhatsApp bisnis Anda.
2. **Ubah Nama Perusahaan / Logo**:
   - Buka `index.html` dan ganti teks `NUSANTARA Global Logistics` dengan nama perusahaan Anda.
3. **Ubah Tarif Dasar**:
   - Buka `js/main.js` pada objek `routeData` untuk memperbarui tarif per CBM, per Kg, atau per kontainer sesuai fluktuasi *shipping line*.
