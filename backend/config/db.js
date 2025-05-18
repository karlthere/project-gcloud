/** @format */

// /** @format */

// /**
//  * "Backend config" itu adalah pengaturan di bagian belakang (server) dari sebuah aplikasi.
// Fungsinya buat ngatur hal-hal penting biar aplikasi bisa jalan dengan benar.

// Contohnya:

// Nyambungin ke database (tempat nyimpan data)

// Ngatur port server (biar bisa diakses di internet atau lokal)

// Simpan password atau kunci rahasia (misalnya buat login atau akses API)

// Bedain pengaturan antara versi percobaan (development) dan versi asli (production)
//  */
// /* global process */
// // Ini memberi tahu linter bahwa variabel `process` adalah variabel global (agar tidak dianggap error)

// import mysql from "mysql2/promise";
// // Mengimpor library `mysql2` versi promise, agar bisa pakai async/await saat koneksi database

// import dotenv from "dotenv";
// // Mengimpor library `dotenv` untuk bisa baca file `.env` yang isinya pengaturan rahasia (seperti user/password database)

// dotenv.config();
// // Menjalankan `dotenv.config()` supaya semua variabel dari file `.env` bisa digunakan di kode ini lewat `process.env`

// export const getConnection = async () => {
// 	// Fungsi `getConnection` dibuat sebagai fungsi async (karena akan menunggu koneksi ke database)

// 	const connection = await mysql.createConnection({
// 		// Membuat koneksi ke database MySQL pakai pengaturan dari file `.env
// 		host: process.env.DB_HOST,
// 		user: process.env.DB_USER,
// 		password: process.env.DB_PASSWORD,
// 		database: process.env.DB_NAME,
// 	});

// 	return connection;
// 		// Mengembalikan koneksi database supaya bisa digunakan di bagian lain program
// };
/** @format */
/* global process */

import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // Load .env config ke process.env

// Deteksi environment: development atau production
const isProduction = process.env.NODE_ENV === "production";

// Konfigurasi koneksi database
const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true, // Pool akan menunggu koneksi jika penuh
	connectionLimit: 10, // Maksimum koneksi dalam pool
	queueLimit: 0, // Tidak batasi jumlah query yang ngantri
};

if (isProduction) {
	// Koneksi ke Cloud SQL via Unix Socket (untuk Google App Engine)
	config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
} else {
	// Koneksi lokal ke MySQL (misalnya XAMPP)
	config.host = process.env.DB_HOST || "localhost";
	config.port = process.env.DB_PORT || 3306;
}

// Buat koneksi pool
const pool = mysql.createPool(config).promise(); // Pakai .promise() agar bisa async/await

export default pool;
