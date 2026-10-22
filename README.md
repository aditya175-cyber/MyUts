# My App — UTS Mobile 1

Aplikasi mobile React Native (Expo SDK 57) dengan halaman **Login** dan **Home** bergaya glassmorphism ala Apple. Latar putih, card dan aksen biru, serta navbar bawah berbahan kaca. Dibuat untuk tugas UTS Mobile 1.

## Fitur
- **Login**: input email dan password (bisa lihat/sembunyikan), validasi, pesan error, dan animasi shake jika salah.
- **Home**: foto profil, nama, grid menu 2×2, dan tombol logout.
- **Navbar glass**: tab Beranda, Menu, dan Profil.
- **Profil**: foto, nama, email, dan status.
- Animasi halus saat halaman muncul dan saat tombol ditekan (mengikuti pengaturan Reduce Motion).

## Teknologi
- React Native + Expo (JavaScript)
- `expo-blur` dan `expo-linear-gradient` untuk efek kaca
- `@expo/vector-icons` untuk ikon
- `react-native-safe-area-context` untuk area aman layar
- Animasi memakai `Animated` bawaan React Native

## Struktur Folder
```
MyUts/
├── App.js
├── index.js
├── app.json
├── package.json
├── PRD.md
├── README.md
├── assets/
│   └── foto-profil.jpg
└── src/
    ├── theme.js
    ├── components/
    │   ├── Glass.js
    │   ├── Motion.js
    │   └── NavBar.js
    └── screens/
        ├── LoginScreen.js
        └── HomeScreen.js
```

## Cara Menjalankan
1. Pastikan Node.js sudah terpasang dan aplikasi **Expo Go** (versi terbaru) ada di HP.
2. Buka terminal di folder project, lalu:
   ```
   npm install
   npx expo start -c
   ```
3. Scan QR code dengan Expo Go. HP dan laptop harus satu jaringan WiFi.

## Cara Login
Login masih tiruan (tanpa server). Isi email yang formatnya valid, misalnya `budi.santoso@gmail.com`, dan password minimal 6 karakter. Nama di Home diambil dari email, jadi contoh di atas tampil sebagai "Budi Santoso".

## Mengganti Foto Profil
Timpa file `assets/foto-profil.jpg` dengan fotomu, dengan nama yang sama persis. Foto persegi paling pas. Kalau formatnya `.png`, ubah satu baris `require('../../assets/foto-profil.jpg')` di `src/screens/HomeScreen.js`.

## Masalah Umum
- **Unable to resolve module**: periksa nama file dan foldernya. Metro membedakan huruf besar dan kecil (`NavBar.js`, bukan `Navbar.js`), dan folder harus bernama `src`. Di Windows, ganti nama file yang hanya beda huruf besar/kecil dua kali (lewat nama sementara) supaya benar-benar berubah.
- **Layar putih atau tampilan tidak berubah**: jalankan `npx expo start -c` untuk membersihkan cache.
- **Peringatan versi di Expo Go**: perbarui Expo Go, karena project ini memakai SDK 57.

## Dokumen Lain
Rincian kebutuhan dan desain ada di [PRD.md](PRD.md).