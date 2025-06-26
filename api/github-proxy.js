// ===== KODE YANG BENAR UNTUK VERCEL - Salin semua di bawah ini =====

import fetch from 'node-fetch';

// Konfigurasi ini diambil dari Environment Variables yang aman di dasbor Vercel
const { GITHUB_OWNER, GITHUB_REPO, GITHUB_PATH, GITHUB_TOKEN } = process.env;

const API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`;

// Ini adalah format export yang benar untuk Vercel
export default async function handler(req, res) {
    // Mengatur header CORS agar browser tidak menolak permintaan
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Menangani pre-flight request dari browser
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    // Menangani permintaan GET (membaca data)
    if (req.method === 'GET') {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3.raw',
                },
            });

            if (!response.ok) {
                return res.status(response.status).json({ error: response.statusText });
            }

            const data = await response.text();
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(data);

        } catch (error) {
            return res.status(500).json({ error: `Error saat mengambil data dari GitHub: ${error.toString()}` });
        }
    }

    // Menangani permintaan PUT (menyimpan data)
    if (req.method === 'PUT') {
        try {
            const dataToSave = req.body;

            const getFileResponse = await fetch(API_URL, {
                headers: { 'Authorization': `token ${GITHUB_TOKEN}` },
            });

            let fileSha;
            if (getFileResponse.ok) {
                const fileData = await getFileResponse.json();
                fileSha = fileData.sha;
            } else if (getFileResponse.status !== 404) {
                throw new Error(`Gagal mendapatkan info file: ${getFileResponse.statusText}`);
            }

            const contentEncoded = Buffer.from(JSON.stringify(dataToSave, null, 2)).toString('base64');

            const saveResponse = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json',
                },
                body: JSON.stringify({
                    message: `Pembaruan data otomatis dari dasbor: ${new Date().toISOString()}`,
                    content: contentEncoded,
                    sha: fileSha,
                }),
            });

            if (!saveResponse.ok) {
                const errorText = await saveResponse.text();
                throw new Error(`Gagal menyimpan ke GitHub: ${errorText}`);
            }

            const result = await saveResponse.json();
            return res.status(200).json({ message: 'Data berhasil disimpan', commit: result.commit.sha });

        } catch (error) {
            return res.status(500).json({ error: `Error saat menyimpan data ke GitHub: ${error.toString()}` });
        }
    }

    return res.status(405).json({ error: 'Metode HTTP tidak didukung.' });
}
