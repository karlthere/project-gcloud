/** @format */
// Memberi tahu tool seperti Prettier bahwa file ini perlu diformat otomatis

// Import library bcrypt untuk meng-hash dan membandingkan password
import bcrypt from "bcrypt";

// ====================================================
// ✅ Fungsi: hashPassword
// Deskripsi: Mengenkripsi (hash) password asli menjadi bentuk aman
// Digunakan saat user mendaftar atau mengubah password
// ====================================================
export const hashPassword = async (plain) => {
	const salt = await bcrypt.genSalt(10); // Membuat "garam" (salt) dengan tingkat keamanan 10
	return await bcrypt.hash(plain, salt); // Meng-hash password menggunakan salt yang dibuat
};

// ====================================================
// ✅ Fungsi: comparePassword
// Deskripsi: Membandingkan password asli dengan password yang sudah di-hash
// Digunakan saat login untuk verifikasi kecocokan password
// ====================================================
export const comparePassword = async (plain, hash) => {
	return await bcrypt.compare(plain, hash); // Bandingkan input user dengan hash di database
};
