# LAPORAN HASIL PENGUJIAN PERANGKAT LUNAK
## Aplikasi PP-TOUR-TRAVEL

| Detail Proyek | |
|---|---|
| **Nama Aplikasi** | PP-TOUR-TRAVEL |
| **Repositori** | [GitHub Repository](https://github.com/Ruziqnahm/PP-TOUR-TRAVEL.git) |
| **Tanggal Uji** | 25 Mei 2026 |
| **Environment** | Node.js 22.13.0, Jest 30.4.2, React Testing Library |

---

### 1. RINGKASAN EKSEKUTIF
Pengujian dilakukan terhadap aplikasi web **PP-TOUR-TRAVEL** yang dibangun menggunakan Next.js. Pengujian mencakup dua level: **Unit Testing** pada komponen UI dasar dan **Integration Testing** pada alur pengisian formulir pemesanan.

| Level Pengujian | Total Test Case | Passed | Failed |
|---|---|---|---|
| Unit Testing | 10 | 10 | 0 |
| Integration Testing | 2 | 2 | 0 |
| **TOTAL** | **12** | **12** | **0 (0%)** |

---

### 2. HASIL UNIT TESTING
Unit testing difokuskan pada komponen reusable di folder `components/ui/`.

#### 2.1 Rekap Test Suite
| Test Suite (Kelas) | Skenario Utama | Jumlah TC | Passed | Status |
|---|---|---|---|---|
| **Button.test.tsx** | Pengujian rendering, varian, state disabled, dan event klik pada komponen Button. | 6 | 6 | **PASS** |
| **Input.test.tsx** | Pengujian rendering label, placeholder, input value, dan icon pada komponen Input. | 4 | 4 | **PASS** |

#### 2.2 Detail Temuan
- **Button Component**: Berhasil menangani berbagai varian (primary, secondary) dan merespon interaksi pengguna dengan benar.
- **Input Component**: Validasi visual dan fungsionalitas input teks berjalan sesuai ekspektasi.

---

### 3. HASIL INTEGRATION TESTING
Integration testing difokuskan pada komponen formulir pemesanan yang menggabungkan beberapa input dan logika validasi.

#### 3.1 Rekap Test Suite Integrasi
| Test Suite | Skenario Utama | Jumlah TC | Status |
|---|---|---|---|
| **BookingForm.test.tsx** | Validasi input wajib, format data, dan simulasi pengiriman formulir sukses. | 2 | **PASS** |

#### 3.2 Verifikasi Alur Bisnis
- **Validasi Input**: Sistem berhasil mencegah pengiriman formulir jika data wajib (Nama, Tanggal, Email, WA) kosong.
- **Simulasi Submit**: Setelah semua data valid diisi, sistem menampilkan pesan sukses ("Pesanan Anda telah dikirim") menggunakan `react-hot-toast`.

---

### 4. ANALISIS KUALITAS
#### 4.1 Distribusi Jenis Test Case
| Jenis Test Case | Unit Testing | Integration Testing | Persentase |
|---|---|---|---|
| Happy Path (valid input) | 7 | 1 | 66.7% |
| Error Handling (invalid/empty) | 3 | 1 | 33.3% |

#### 4.2 Waktu Eksekusi
Seluruh 12 test case berhasil dieksekusi dalam **2.51 detik**. Waktu eksekusi rata-rata per test case sangat efisien, mendukung proses CI/CD yang cepat.

---

### 5. DOKUMENTASI HASIL (SCREENSHOT)
*Hasil eksekusi terminal:*
```text
 PASS  __tests__/Button.test.tsx
 PASS  __tests__/Input.test.tsx
 PASS  __tests__/BookingForm.test.tsx

Test Suites: 3 passed, 3 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        2.513 s
```

---

### 6. REKOMENDASI
1. **Peningkatan Coverage**: Menambahkan pengujian untuk halaman admin dan dashboard.
2. **E2E Testing**: Mengimplementasikan Playwright atau Cypress untuk pengujian alur pengguna dari ujung ke ujung di browser.
3. **Mocking API**: Menggunakan MSW (Mock Service Worker) untuk simulasi respon API yang lebih kompleks.
