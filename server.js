const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

// Inisialisasi aplikasi
const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi MySQL
const db = mysql.createConnection({
    host: 'localhost', // Alamat server MySQL
    user: 'root',      // Nama pengguna phpMyAdmin Anda
    password: '',      // Password MySQL Anda (biarkan kosong jika default)
    database: 'ulang_tahun', // Nama database
});

// Tes koneksi ke MySQL
db.connect((err) => {
    if (err) {
        console.error('Koneksi ke database gagal:', err);
        return;
    }
    console.log('Koneksi ke database berhasil.');
});

// Konfigurasi multer untuk upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder penyimpanan
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nama file unik
    },
});

const upload = multer({ storage });

// Endpoint untuk upload file
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Tidak ada file yang diunggah.');
    }

    const fileName = req.file.filename;

    // Simpan informasi file ke database
    const query = 'INSERT INTO uploads (filename) VALUES (?)';
    db.query(query, [fileName], (err, result) => {
        if (err) {
            console.error('Gagal menyimpan ke database:', err);
            return res.status(500).send('Gagal menyimpan ke database.');
        }

        res.status(200).send('File berhasil diunggah dan disimpan ke database.');
    });
});

// Serve static file (untuk file yang diunggah)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
