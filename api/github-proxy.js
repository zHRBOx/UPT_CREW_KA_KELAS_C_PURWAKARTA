// File: netlify/functions/github-proxy.js

const fetch = require('node-fetch');

// Konfigurasi ini diambil dari Environment Variables yang aman di dasbor Netlify
// BUKAN ditulis langsung di sini.
const { GITHUB_OWNER, GITHUB_REPO, GITHUB_PATH, GITHUB_TOKEN } = process.env;

const API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`;

// Fungsi utama yang akan dijalankan oleh Netlify
exports.handler = async function(event) {
    // Header ini penting untuk mengizinkan browser Anda mengakses fungsi ini
    // tanpa diblokir oleh kebijakan keamanan browser (CORS).
    const headers = {
        'Access-Control-Allow-Origin': '*', // Izinkan semua domain (bisa diganti dengan domain Anda jika sudah production)
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS'
    };
    
    // Browser akan mengirim request 'OPTIONS' terlebih dahulu untuk mengecek izin.
    // Kita harus menangani ini.
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204, // No Content
            headers,
            body: ''
        };
    }

    // --- Menangani permintaan GET (untuk mengambil/membaca data) ---
    if (event.httpMethod === 'GET') {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3.raw' // Minta konten mentah
                }
            });

            if (!response.ok) {
                return { statusCode: response.status, body: response.statusText };
            }

            const data = await response.text();
            return {
                statusCode: 200,
                headers,
                body: data // Kirim data mentah sebagai string
            };
        } catch (error) {
            return { statusCode: 500, body: `Error saat mengambil data dari GitHub: ${error.toString()}` };
        }
    }

    // --- Menangani permintaan PUT (untuk menyimpan/memperbarui data) ---
    if (event.httpMethod === 'PUT') {
        try {
            const dataToSave = JSON.parse(event.body);
            
            // 1. Dapatkan SHA file saat ini dari GitHub (wajib untuk update)
            const getFileResponse = await fetch(API_URL, {
                headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
            });

            let fileSha;
            if (getFileResponse.ok) {
                const fileData = await getFileResponse.json();
                fileSha = fileData.sha;
            } else if (getFileResponse.status !== 404) { // Abaikan jika file tidak ditemukan (404)
                throw new Error(`Gagal mendapatkan info file: ${getFileResponse.statusText}`);
            }

            // 2. Encode konten ke Base64 (syarat dari GitHub API)
            const contentEncoded = Buffer.from(JSON.stringify(dataToSave, null, 2)).toString('base64');
            
            // 3. Kirim permintaan untuk update file
            const saveResponse = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    message: `Pembaruan data otomatis dari dasbor: ${new Date().toISOString()}`,
                    content: contentEncoded,
                    sha: fileSha // Jika sha undefined, GitHub akan membuat file baru
                })
            });

            if (!saveResponse.ok) {
                const errorText = await saveResponse.text();
                throw new Error(`Gagal menyimpan ke GitHub: ${errorText}`);
            }
            
            const result = await saveResponse.json();
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'Data berhasil disimpan', commit: result.commit.sha })
            };

        } catch (error) {
            return { statusCode: 500, body: `Error saat menyimpan data ke GitHub: ${error.toString()}` };
        }
    }

    // Jika metode request bukan GET, PUT, atau OPTIONS
    return {
        statusCode: 405, // Method Not Allowed
        headers,
        body: 'Metode HTTP tidak didukung. Harap gunakan GET atau PUT.'
    };
};