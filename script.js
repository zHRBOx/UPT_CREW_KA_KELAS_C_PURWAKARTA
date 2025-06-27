// Endpoint untuk serverless function kita di Netlify.
const PROXY_ENDPOINT = '/api/github-proxy';

// Data default jika gagal memuat dari remote atau local storage.
let appData = {
    rekapitulasiPegawai: {
        nominatif: { kupt: 1, penyeliaInstruktur: 1, penyeliaDinasan: 4, masinis: 15, asistenMasinis: 3, jumlah: 24 },
        cukupanMasinis: { dinasanMurni: 9, lhs: 3, dibutuhkan: 12, adanyaPegawai: 15, serep: 1, kurangLebih: 3 },
        cukupanAsisten: { dinasanMurni: 9, lhs: 3, dibutuhkan: 12, adanyaPegawai: 3, serep: 1, kurangLebih: -9 }
    },
    pegawai: [
        { "no": 1, "nama": "YADI SUPRIADI", "nipp": "44662", "jabatan": "KUPT", "ttl": "BANDUNG, 17 SEPTEMBER 1971", "ijazah": "SLTA", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "ASP.04/7/2-CII/II/19", "o64": "", "sert_madya": "24/09/2021", "sert_muda": "", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2027-09" },
        { "no": 2, "nama": "ROFI NOVIYANUS", "nipp": "54706", "jabatan": "PENYELIA INSTRUKTUR", "ttl": "PURWOKERTO, 20 NOVEMBER 1978", "ijazah": "SLTA", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "", "o64": "21/EVOP/I/KA-2019/JAB", "sert_madya": "19/04/2024", "sert_muda": "", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2036-11" },
        { "no": 3, "nama": "ARIEF KURNIAWAN", "nipp": "42003", "jabatan": "PENYELIA DINASAN", "ttl": "BANDUNG, 5 JULI 1973", "ijazah": "STM", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "", "o64": "21/EVOP/I-KA-2019/JAB", "sert_madya": "12/01/2021", "sert_muda": "", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2029-08" },
        { "no": 4, "nama": "SUHADI ASMARA", "nipp": "44726", "jabatan": "PENYELIA DINASAN", "ttl": "BANDUNG, 28 JULI 1975", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "1668/TU-42/DIKLAT-08", "o64": "", "sert_madya": "", "sert_muda": "12/01/2021", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2033-07" },
        { "no": 5, "nama": "FAZHAR SEPTIA ILLHAM", "nipp": "48552", "jabatan": "PENYELIA DINASAN", "ttl": "BANDUNG, 20 SEPTEMBER 1985", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "", "o64": "21/EVOP/I/KA-2019/JAB", "sert_madya": "12/01/2021", "sert_muda": "", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2043-09" },
        { "no": 6, "nama": "MUHAMAD FITRA", "nipp": "65933", "jabatan": "PENYELIA DINASAN", "ttl": "SEKAYU, 8 MEI 1981", "ijazah": "SMA", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "1668/TU-42/DIKLAT-08", "o64": "", "sert_madya": "", "sert_muda": "30/03/2029", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2039-05" },
        { "no": 7, "nama": "RIYAD FIRDAUS", "nipp": "47335", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, 16 AGUSTUS 1981", "ijazah": "STM", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "", "o64": "2798/TU.1-12/DIKLAT-12", "sert_madya": "", "sert_muda": "12/01/2021", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2039-08" },
        { "no": 8, "nama": "UJANG SURYA", "nipp": "50162", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, APRIL 1983", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "", "o64": "2798/TU.1-12/DIKLAT-12", "sert_madya": "", "sert_muda": "16/07/2021", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2041-04" },
        { "no": 9, "nama": "PUTUT RESTU WIBOWO", "nipp": "50298", "jabatan": "MASINIS MUDA", "ttl": "PURWAKARTA, MEI 1985", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "", "o64": "2798/TU.1-12/DIKLAT-12", "sert_madya": "", "sert_muda": "21/07/2027", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2043-05" },
        { "no": 10, "nama": "UNGGUL HENDRA EKA PRATAMA", "nipp": "54730", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, SEPTEMBER 1985", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "090/LL.006/III-2015/DIKLAT", "o64": "", "sert_madya": "", "sert_muda": "16/07/2021", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2043-09" },
        { "no": 11, "nama": "APEP ANDRIANTO", "nipp": "55037", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, OKTOBER 1986", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "090/LL.006/III-2015/DIKLAT", "o64": "", "sert_madya": "", "sert_muda": "13/01/2028", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2044-10" },
        { "no": 12, "nama": "HERI ISKANDAR", "nipp": "55042", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, JANUARI 1989", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "090/LL.006/III-2015/DIKLAT", "o64": "", "sert_madya": "", "sert_muda": "25/10/2025", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2047-01" },
        { "no": 13, "nama": "MURDANI", "nipp": "55045", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, SEPTEMBER 1991", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "46/SETU/II-16/DIKLAT", "o64": "", "sert_madya": "", "sert_muda": "05/07/2025", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2049-09" },
        { "no": 14, "nama": "ALIF SUHARDIMAN", "nipp": "60567", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, NOVEMBER 1991", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "46/SETU/II-16/DIKLAT", "o64": "", "sert_madya": "", "sert_muda": "25/10/2025", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2049-11" },
        { "no": 15, "nama": "NOPIYANA", "nipp": "60676", "jabatan": "MASINIS MUDA", "ttl": "CIANJUR, DESEMBER 1992", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "3668/TU.1-16/DIKLAT-16", "o64": "", "sert_madya": "", "sert_muda": "28/08/2027", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2050-12" },
        { "no": 16, "nama": "JUNAEDI", "nipp": "60722", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, FEBRUARI 1993", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "3668/TU.1-16/DIKLAT-16", "o64": "", "sert_madya": "", "sert_muda": "05/04/2028", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2051-02" },
        { "no": 17, "nama": "ANDRI NURJANA", "nipp": "64928", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, MARET 1994", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "1668/TU-42/DIKLAT-08", "o64": "", "sert_madya": "", "sert_muda": "21/12/2027", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2052-03" },
        { "no": 18, "nama": "ANDRIANA", "nipp": "65975", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, AGUS 1994", "ijazah": "SMA", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "1668/TU-42/DIKLAT-08", "o64": "", "sert_madya": "", "sert_muda": "18/12/2025", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2052-08" },
        { "no": 19, "nama": "ANTO KRISTANTO", "nipp": "67833", "jabatan": "MASINIS MUDA", "ttl": "MALANG, SEPTEMBER 1994", "ijazah": "D3", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "1668/TU-42/DIKLAT-08", "o64": "", "sert_madya": "", "sert_muda": "25/03/2028", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2052-09" },
        { "no": 20, "nama": "CECEP ARI NUGRAHA", "nipp": "68089", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, OKTOBER 1994", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "062/LL-2019/DIKLAT", "o64": "", "sert_madya": "", "sert_muda": "21/12/2027", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2052-10" },
        { "no": 21, "nama": "ARIS SETIAWAN", "nipp": "69943", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, JUNI 1995", "ijazah": "SMA", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "062/LL-2019/DIKLAT", "o64": "", "sert_madya": "", "sert_muda": "02/06/2028", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2053-06" },
        { "no": 22, "nama": "ANTONIUS TRI SETYANTO", "nipp": "73829", "jabatan": "MASINIS PERTAMA", "ttl": "PADANG, JUNI 1996", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "026/SETU/II-22/DIKLAT", "o64": "", "sert_madya": "", "sert_muda": "", "sert_pertama": "15/12/2025", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2054-06" },
        { "no": 23, "nama": "MAHESA BIMA ADI PANGESTU", "nipp": "73831", "jabatan": "MASINIS PERTAMA", "ttl": "SEMARANG, MEI 1997", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "026/SETU/II-22/DIKLAT", "o64": "", "sert_madya": "", "sert_muda": "", "sert_pertama": "15/12/2025", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2055-05" },
        { "no": 24, "nama": "FAYZA HAFIZH ARDIANSYAH", "nipp": "74126", "jabatan": "MASINIS PERTAMA", "ttl": "PURWAKARTA, MARET 1998", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "026/SETU/II-22/DIKLAT", "o64": "", "sert_madya": "", "sert_muda": "", "sert_pertama": "08/08/2027", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2056-03" }
    ],
    sertifikasi: [
        { nama: 'ROFI NOVIYANUS', nipp: '54706', jabatan: 'PENYELIA INSTRUKTUR', jenis: 'ASP MADYA', berlaku: '20/10/2028', smartcard_url: 'https://www.dropbox.com/scl/fi/gck5kbyawzo1d6jokm2zw/2.jpg?rlkey=pfwcg6an9dyh2c24y1i7os4vj&raw=1'},
        { nama: 'ARIEF KURNIAWAN', nipp: '42003', jabatan: 'PENYELIA DINASAN', jenis: 'ASP MADYA', berlaku: '27/12/2028', smartcard_url: 'https://www.dropbox.com/scl/fi/6hclvgw4cp94xrqcdibft/3.jpg?rlkey=voauxn7ltnra3sxu5ncr19tdd&raw=1'},
        { nama: 'SUHADI ASMARA', nipp: '44726', jabatan: 'PENYELIA DINASAN', jenis: 'ASP MADYA', berlaku: '30/03/2029', smartcard_url: 'https://www.dropbox.com/scl/fi/v483o4osveb7zwwe5s0rx/4.jpg?rlkey=e312q71zmd8hzlo7x0bytr6hj&raw=1'},
        { nama: 'FAZHAR SEPTIA ILLHAM', nipp: '48552', jabatan: 'PENYELIA DINASAN', jenis: 'ASP MADYA', berlaku: '24/04/2029', smartcard_url: 'https://www.dropbox.com/scl/fi/y86bg9vxxwmtfom3fpg17/5.jpg?rlkey=1xjh0jyxod3t9gqyjdpdi2h8n&raw=1'},
        { nama: 'MUHAMAD FITRA', nipp: '65933', jabatan: 'PENYELIA DINASAN', jenis: 'ASP MADYA', berlaku: '23/12/2028', smartcard_url: 'https://www.dropbox.com/scl/fi/59e70vaqd4tew2iewq6r4/6.jpg?rlkey=xvdstqnhra3as7kc0tubknddf&raw=1'},
        { nama: 'RIYAD FIRDAUS', nipp: '47335', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '16/07/2028', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'UJANG SURYA', nipp: '50162', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '16/07/2028', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'PUTUT RESTU WIBOWO', nipp: '50298', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '28/12/2027', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'UNGGUL HENDRA EKA PRATAMA', nipp: '54730', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '09/07/2028', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'HERI ISKANDAR', nipp: '55042', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '25/10/2025', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'MURDANI', nipp: '55045', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '05/07/2025', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'ALIF SUHARDIMAN', nipp: '60567', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '25/10/2025', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'NOPIYANA', nipp: '60676', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '30/03/2027', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'JUNAEDI', nipp: '60722', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '05/04/2028', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'ANDRI NURJANA', nipp: '64928', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '21/12/2027', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'ARIS SETIAWAN', nipp: '69943', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '02/06/2028', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'ANDRIANA', nipp: '65975', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '18/12/2025', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'APEP ANDRIANTO', nipp: '55037', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '05/04/2028', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'CECEP ARI NUGRAHA', nipp: '68089', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '21/12/2027', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'ANTO KRISTANTO', nipp: '67833', jabatan: 'MASINIS MUDA', jenis: 'ASP MUDA', berlaku: '25/03/2028', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'ANTONIUS TRI SETYANTO', nipp: '73829', jabatan: 'MASINIS PERTAMA', jenis: 'ASP PERTAMA', berlaku: '15/12/2025', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'MAHESA BIMA ADI PANGESTU', nipp: '73831', jabatan: 'MASINIS PERTAMA', jenis: 'ASP PERTAMA', berlaku: '15/12/2025', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'},
        { nama: 'FAYZA HAFIZH ARDIANSYAH', nipp: '74126', jabatan: 'MASINIS PERTAMA', jenis: 'ASP PERTAMA', berlaku: '08/08/2027', smartcard_url: 'https://placehold.co/100x63/0D2B4F/FFFFFF?text=Card'}
    ],
    jadwalHariIni: {
        penyelia: { dinas1: { nama: '', nipp: '' }, dinas2: { nama: '', nipp: '' }, dinas3: { nama: '', nipp: '' } },
        reguler: [
            { no: 1, kode: '4', nomor_ka: '331-336, 337-334', lintas: 'PWK-CKR-CKP, CKP-CKR-PWK', mulai: '12:35', habis: '20:42', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 2, kode: '8AB', nomor_ka: '348-349', lintas: 'PWK-BD, BD-PWK', mulai: '03:25', habis: '18:05', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 3, kode: '5', nomor_ka: 'R335-335-326', lintas: 'PWK-CKP-CKR, CKR-PWK', mulai: '03:05', habis: '07:55', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 4, kode: '6-7', nomor_ka: '333-338, R325-2', lintas: 'PWK-CKR-CKP, CKP-PWK', mulai: '17:05', habis: '04:45', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 5, kode: '1', nomor_ka: '325-328', lintas: 'PWK-CKR, CKR-PWK', mulai: '04:10', habis: '10:06', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 6, kode: '', nomor_ka: 'LIBUR', lintas: '', mulai: '', habis: '', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 7, kode: '9AB', nomor_ka: '350-367', lintas: 'PWK-BD, PWK-BD', mulai: '15:25', habis: '01:05', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 8, kode: '2', nomor_ka: '329-332', lintas: 'PWK-CKR, PWK-CKR', mulai: '09:15', habis: '15:20', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 9, kode: '10', nomor_ka: 'SEREP PAGI', lintas: 'CREW KA PWK', mulai: '08:00', habis: '16:00', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 10, kode: '3', nomor_ka: '327-330', lintas: 'PWK-CKR, PWK-CKR', mulai: '09:20', habis: '13:38', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 11, kode: '', nomor_ka: 'LIBUR', lintas: '', mulai: '', habis: '', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
        ],
        klb: [ {no: '',nomor_ka: '', lintas: '', mulai: '', habis: '', masinis: '', nipp_mas: '', asisten: '', nipp_as: ''} ],
        cuti: [ { no: 1, diklap: '', cuti: '', csk: '', pembinaan: '', sertifikasi: '' } ],
        catatanPenting: ''
    },
    jadwalBesok: {
        penyelia: { dinas1: { nama: '', nipp: '' }, dinas2: { nama: '', nipp: '' }, dinas3: { nama: '', nipp: '' } },
        reguler: [
            { no: 1, kode: '4', nomor_ka: '331-336, 337-334', lintas: 'PWK-CKR-CKP, CKP-CKR-PWK', mulai: '12:35', habis: '20:42', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 2, kode: '8AB', nomor_ka: '348-349', lintas: 'PWK-BD, BD-PWK', mulai: '03:25', habis: '18:05', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 3, kode: '5', nomor_ka: 'R335-335-326', lintas: 'PWK-CKP-CKR, CKR-PWK', mulai: '03:05', habis: '07:55', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 4, kode: '6-7', nomor_ka: '333-338, R325-2', lintas: 'PWK-CKR-CKP, CKP-PWK', mulai: '17:05', habis: '04:45', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 5, kode: '1', nomor_ka: '325-328', lintas: 'PWK-CKR, CKR-PWK', mulai: '04:10', habis: '10:06', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 6, kode: '', nomor_ka: 'LIBUR', lintas: '', mulai: '', habis: '', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 7, kode: '9AB', nomor_ka: '350-367', lintas: 'PWK-BD, PWK-BD', mulai: '15:25', habis: '01:05', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 8, kode: '2', nomor_ka: '329-332', lintas: 'PWK-CKR, PWK-CKR', mulai: '09:15', habis: '15:20', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 9, kode: '10', nomor_ka: 'SEREP PAGI', lintas: 'CREW KA PWK', mulai: '08:00', habis: '16:00', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 10, kode: '3', nomor_ka: '327-330', lintas: 'PWK-CKR, PWK-CKR', mulai: '09:20', habis: '13:38', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
            { no: 11, kode: '', nomor_ka: 'LIBUR', lintas: '', mulai: '', habis: '', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' },
        ],
        klb: [ {no: '1',nomor_ka: '', lintas: '', mulai: '', habis: '', masinis: '', nipp_mas: '', asisten: '', nipp_as: ''} ],
        cuti: [ { no: 1, diklap: '', cuti: '', csk: '', pembinaan: '', sertifikasi: '' } ],
        catatanPenting: ''
    },
    nilaiUtsUpo: [
        { no: 1, nama: 'ROFI NOVIYANUS', nipp: 54706, jabatan: 'P. INSTRUKTUR', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
        { no: 2, nama: 'ARIEF KURNIAWAN', nipp: 42003, jabatan: 'P. DINASAN', mar_uts: 100, mar_upo: 94, apr_uts: 100, apr_upo: 96 },
	    { no: 3, nama: 'SUHADI ASMARA', nipp: 44726, jabatan: 'PENYELIA DINASAN', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 4, nama: 'FAZHAR SEPTIA ILLHAM', nipp: 48552, jabatan: 'PENYELIA DINASAN', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 5, nama: 'MUHAMAD FITRA', nipp: 65933, jabatan: 'PENYELIA DINASAN', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 6, nama: 'RIYAD FIRDAUS', nipp: 47335, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 7, nama: 'UJANG SURYA', nipp: 50162, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 8, nama: 'PUTUT RESTU WIBOWO', nipp: 50298, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 9, nama: 'UNGGUL HENDRA EKA PRATAMA', nipp: 54730, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 10, nama: 'APEP ANDRIANTO', nipp: 55037, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 11, nama: 'HERI ISKANDAR', nipp: 55042, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 12, nama: 'MURDANI', nipp: 55045, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 13, nama: 'ALIF SUHARDIMAN', nipp: 60567, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 14, nama: 'NOPIYANA', nipp: 60676, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 15, nama: 'JUNAEDI', nipp: 60722, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 16, nama: 'ANDRI NURJANA', nipp: 64928, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 17, nama: 'ANDRIANA', nipp: 65975, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 18, nama: 'ANTO KRISTANTO', nipp: 67833, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 19, nama: 'CECEP ARI NUGRAHA', nipp: 68089, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 20, nama: 'ARIS SETIAWAN', nipp: 69943, jabatan: 'MASINIS MUDA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 21, nama: 'ANTONIUS TRI SETYANTO', nipp: 73829, jabatan: 'MASINIS PERTAMA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 22, nama: 'MAHESA BIMA ADI PANGESTU', nipp: 73831, jabatan: 'MASINIS PERTAMA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
	    { no: 23, nama: 'FAYZA HAFIZH ARDIANSYAH', nipp: 74126, jabatan: 'MASINIS PERTAMA', jan_uts: '-', jan_upo: 90, feb_uts: 100, feb_upo: '-', apr_uts: 100, apr_upo: 100 },
    ],
    ujiUlang: [
        { no: 1, nama: 'ROFI NOVIYANUS', nipp: 54706, jabatan: 'MASINIS MADYA', tgl_uji: '03 MARET', nilai_teori: 100, waw_sarana: '', waw_operasi: '', prak_perka: 100, prak_adm: '', keterangan: 'LULUS', penguji: '', ka: '' },
        { no: 2, nama: 'ARIEF KURNIAWAN', nipp: 42003, jabatan: 'MASINIS MADYA', tgl_uji: '07 MARET', nilai_teori: 96, waw_sarana: '', waw_operasi: '', prak_perka: 100, prak_adm: '', keterangan: 'LULUS', penguji: '', ka: '' },
        { no: 3, nama: 'SUHADI ASMARA', nipp: 44726, jabatan: 'MASINIS MADYA', tgl_uji: '07 MARET', nilai_teori: 98, waw_sarana: '', waw_operasi: '', prak_perka: 100, prak_adm: '', keterangan: 'LULUS', penguji: '', ka: '' },
        { no: 4, nama: 'FAZHAR SEPTIA ILLHAM', nipp: 48552, jabatan: 'MASINIS MADYA', tgl_uji: '07 MARET', nilai_teori: 96, waw_sarana: '', waw_operasi: '', prak_perka: 100, prak_adm: '', keterangan: 'LULUS', penguji: '', ka: '' },
        { no: 5, nama: 'MUHAMAD FITRA', nipp: 65933, jabatan: 'MASINIS MUDA', tgl_uji: '03 MARET', nilai_teori: 92, waw_sarana: '', waw_operasi: '', prak_perka: 100, prak_adm: '', keterangan: 'LULUS', penguji: '', ka: '' },
        { no: 6, nama: 'RIYAD FIRDAUS', nipp: 47335, jabatan: 'MASINIS MUDA', tgl_uji: '10 MARET', nilai_teori: 88, waw_sarana: 96, waw_operasi: '19 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 330 },
        { no: 7, nama: 'UJANG SURYA', nipp: '50162', jabatan: 'MASINIS MUDA', tgl_uji: '10 MARET', nilai_teori: 96, waw_sarana: 96, waw_operasi: '20 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 348 },
        { no: 8, nama: 'PUTUT RESTU W', nipp: '50298', jabatan: 'MASINIS MUDA', tgl_uji: '28 FEBRUARI', nilai_teori: 94, waw_sarana: 94, waw_operasi: '13 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 329 },
        { no: 9, nama: 'UNGGUL HENDRA EKA PRATAMA', nipp: '54730', jabatan: 'MASINIS MUDA', tgl_uji: '03 MARET', nilai_teori: 86, waw_sarana: 92, waw_operasi: '17 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 330 },
        { no: 10, nama: 'APEP ANDRIANTO', nipp: '55037', jabatan: 'MASINIS MUDA', tgl_uji: '17 FEBRUARI', nilai_teori: 76, waw_sarana: 85, waw_operasi: '17 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 331 },
        { no: 11, nama: 'HERI ISKANDAR', nipp: '55042', jabatan: 'MASINIS MUDA', tgl_uji: '10 MARET', nilai_teori: 92, waw_sarana: 96, waw_operasi: '19 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 332 },
        { no: 12, nama: 'MURDANI', nipp: '55045', jabatan: 'MASINIS MUDA', tgl_uji: '10 MARET', nilai_teori: 94, waw_sarana: 95, waw_operasi: '19 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 333 },
        { no: 13, nama: 'ALIF SUHARDIMAN', nipp: '60567', jabatan: 'MASINIS MUDA', tgl_uji: '28 FEBRUARI', nilai_teori: 96, waw_sarana: 95, waw_operasi: '20 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 328 },
        { no: 14, nama: 'NOPIYANA', nipp: '60676', jabatan: 'MASINIS MUDA', tgl_uji: '01 MARET', nilai_teori: 96, waw_sarana: 94, waw_operasi: '14 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 350 },
        { no: 15, nama: 'JUNAEDI', nipp: '60722', jabatan: 'MASINIS MUDA', tgl_uji: '10 MARET', nilai_teori: 94, waw_sarana: 94, waw_operasi: '13 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 348 },
        { no: 16, nama: 'ANDRI NURJANA', nipp: '64928', jabatan: 'MASINIS MUDA', tgl_uji: '03 MARET', nilai_teori: 90, waw_sarana: 97, waw_operasi: '14 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 329 },
        { no: 17, nama: 'ANDRIANA', nipp: '65975', jabatan: 'MASINIS MUDA', tgl_uji: '01 MARET', nilai_teori: 92, waw_sarana: 95, waw_operasi: '13 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 330 },
        { no: 18, nama: 'ANTO KRISTANTO', nipp: '67833', jabatan: 'MASINIS MUDA', tgl_uji: '27 FEBRUARI', nilai_teori: 90, waw_sarana: 92, waw_operasi: '17 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 331 },
        { no: 19, nama: 'CECEP ARI NUGRAHA', nipp: '68089', jabatan: 'MASINIS MUDA', tgl_uji: '27 FEBRUARI', nilai_teori: 98, waw_sarana: 95, waw_operasi: '19 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 332 },
        { no: 20, nama: 'ARIS SETIAWAN', nipp: '69943', jabatan: 'MASINIS MUDA', tgl_uji: '10 MARET', nilai_teori: 92, waw_sarana: 90, waw_operasi: '21 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 333 },
        { no: 21, nama: 'ANTONIUS TRI SETYANTO', nipp: '73829', jabatan: 'MASINIS PERTAMA', tgl_uji: '10 MARET', nilai_teori: 88, waw_sarana: 94, waw_operasi: '19 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 328 },
        { no: 22, nama: 'MAHESA BIMA ADI PANGESTU', nipp: '73831', jabatan: 'MASINIS PERTAMA', tgl_uji: '19 FEBRUARI', nilai_teori: 94, waw_sarana: 95, waw_operasi: '14 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 327 },
        { no: 23, nama: 'FAYZA HAFIZH ARDIANSYAH', nipp: '74126', jabatan: 'MASINIS PERTAMA', tgl_uji: '27 FEBRUARI', nilai_teori: 92, waw_sarana: 96, waw_operasi: '19 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 332 },
    ],
    pantauanKejadian: [
        { no: 1, tanggal: '20/06/2025', no_ka: '331', kejadian: 'Lampu kabin padam di KMP 3', tindak_lanjut: 'Perbaikan oleh TPK di Cikampek', keterangan: 'Selesai ditangani' },
        { no: 2, tanggal: '21/06/2025', no_ka: '328', kejadian: 'AC tidak dingin', tindak_lanjut: 'Pengecekan freon di Purwakarta', keterangan: 'Dalam proses' }
    ],
    pantauanKKA: [
        {no: 1, tanggal: '15/06/2025', kejadian: 'KA 348 melewati sinyal aspek merah di Stasiun X', tindak_lanjut: 'Masinis di-grounded dan dilakukan pembinaan', keterangan: 'Selesai'},
    ],
    pantauanPerka: {
        wam: {
            jalan: [ { no: 1, tanggal: '18/06/2025', ka: 'KLB/1A', relasi: 'PWK-BD', dasar: 'Surat Edaran No.123/OPS/2025', keterangan: 'KLB Rombongan VVIP' } ],
            batal: [ { no: 1, tanggal: '19/06/2025', ka: 'PLB 33C', relasi: 'CKP-PWK', dasar: 'Okupansi Rendah', keterangan: 'Rangkaian idle di CKP' } ]
        },
        ppk: {
            jalan: [ { no: 1, tanggal: '22/06/2025', ka: '2501', relasi: 'PWK-TG', dasar: 'Permintaan Angkutan Barang', keterangan: 'Berangkat tepat waktu' } ],
            batal: [ { no: 1, tanggal: '23/06/2025', ka: '2708F', relasi: 'CBR-PWK', dasar: 'Gangguan sarana', keterangan: 'Lokomotif mogok' } ]
        },
        wad: [ { no: 1, tanggal: '10/06/2025', dasar: 'WAD.10/VI/25-DAOP2', keterangan: 'Perubahan Gapeka Parsial Mulai 12 Juni 2025' }]
    },
    pantauanTaspat: {
        hilir_bd: [ { no: 1, petak: 'BD - BD', km: '155 + 400 S/D 154 + 500', kecepatan: 20 }, { no: 2, petak: 'CMI - PDL', km: '144 + 700 S/D 144 + 000', kecepatan: 100 }, { no: 3, petak: 'SKT - MSI', km: '144 + 100 S/D 142 + 700', kecepatan: 50 } ],
        hulu_bd: [ { no: 1, petak: 'BD - BD', km: '155 + 400 S/D 154 + 500', kecepatan: 20 }, { no: 2, petak: 'PDL - CMI', km: '144 + 100 S/D 144 + 700', kecepatan: 100 }, { no: 3, petak: 'SKT - MSI', km: '144 + 100 S/D 142 + 700', kecepatan: 50 } ],
        hilir_ckr: [ { no: 1, petak: 'PWK - CBR', km: '103 + 100 S/D 95 + 600', kecepatan: 80 }, { no: 2, petak: 'CBR - CBR', km: '92 + 200 S/D 88 + 600', kecepatan: 80 }, { no: 3, petak: 'EMPL CKP', km: '84 + 400 S/D 85 + 200', kecepatan: 30 }, { no: 4, petak: 'KW - KDH', km: '58 + 200 S/D 56 + 300', kecepatan: 90 }, { no: 5, petak: 'EMPL CKR', km: '42 + 500 S/D 43 + 800', kecepatan: 70 } ],
        hulu_ckr: [ { no: 1, petak: 'CBR - PWK', km: '95+ 600 S/D 103 + 100', kecepatan: 80 }, { no: 2, petak: 'CBR - CBR', km: '88 + 600 S/D 92 + 200', kecepatan: 80 }, { no: 3, petak: 'EMPL CKP', km: '85 + 200 S/D 84 + 400', kecepatan: 30 }, { no: 4, petak: 'KDH - KW', km: '56 + 800 S/D 58 + 000', kecepatan: 90 }, { no: 5, petak: 'EMPL CKR', km: '43 + 800 S/D 42 + 500', kecepatan: 70 } ]
    },
    wartaDinas: [
        { no: 1, warta: 'EO/97', tentang: 'Go no go item mengalami gangguan sewaktu di perjalanan' },
        { no: 2, warta: 'OR/14', tentang: 'Pengalihan tugas dan fungsi kdr ke mas dan assmas utuk ka barang' },
	    { no: 3, warta: 'O/140', tentang: 'Pengalihan tugas TKA kepada mass dan assmas' },
        { no: 4, warta: 'O/141', tentang: 'Pengaturan premi ka barang terkait pengalihan tugas tka ke mas dan assmas' },
        { no: 5, warta: 'EO/156', tentang: 'Pemasir tidak berfungsi' },
        { no: 6, warta: 'EO/409', tentang: 'BH bila ppj belum masuk stasiun' },
        { no: 7, warta: 'TS/33', tentang: 'Penggunaan radio traindispatching/radio perka' },
        { no: 8, warta: 'EO/238', tentang: 'Pendinasan orang ke tiga/belajar jalan' },
        { no: 9, warta: 'OT/69', tentang: 'Meninggalkan kabin lokomotif(mencabut RH sebelum turun dari kabin lok)' },
        { no: 10, warta: 'OT/338', tentang: 'Pembentukan masinis dinas langsir dan masinis dinas ka' },
        { no: 11, warta: 'O/319', tentang: 'Masinis harus menyalakan lampu kabin(malam hari) dan membunyikan S.35 saat melewati stasiun dan meyakinkan S.1' },
        { no: 12, warta: 'OT/159', tentang: 'Hp harus off didepan penyelia,dilarang merokok di dalam kabin dan pakaian dinas rapi tanpa jaket' },
        { no: 13, warta: 'O/325', tentang: 'Locotrack tidak terpantau saat dilintas' },
        { no: 14, warta: 'OT/470', tentang: 'Batas lintas O.23' },
        { no: 15, warta: 'O/538', tentang: 'Kecepatan maksimal untuk KRD,KRDI,KRDE dan RAILBUS' },
        { no: 16, warta: 'OT/426', tentang: 'Tata cara meninggalkan lok bila lebih dari 60 menit tidak ada kegiatan baik lok dinas langsir atau dinas ka' },
        { no: 17, warta: 'O/224', tentang: 'Tunjuk sebut wesel dengan berdiri saat dinas langsir & dinas ka, assmas wajib memastikan masinis dalam keadaan terjaga dan siaga' },
        { no: 18, warta: 'EO/67', tentang: 'Tukar menukar dinas' },
        { no: 19, warta: 'EOC/360', tentang: 'Pengaturan premi lok traksi ganda ka barang' }
    ],
    programGapeka: {
        program: {
            jadwal: [
                { no_dinasan: 1, kode_dinasan: '1', no_ka: '325', namaka: 'COMMUTER LINE WALAHAR', relasi: 'PWK-CKR', lintas: 'PWK-CKR', mulai_dinas: '04:10', jam_ber: '04:20', jam_dat: '06:20', habis_dinas: '06:59', jam_atas_ka: '01:19', jam_dinas_crew: '02:49', istirahat: '03:19' },
                { no_dinasan: 1, kode_dinasan: '1', no_ka: '328', namaka: 'COMMUTER LINE WALAHAR', relasi: 'CKR-PWK', lintas: 'CKR-PWK', mulai_dinas: '06:48', jam_ber: '07:48', jam_dat: '09:36', habis_dinas: '10:06', jam_atas_ka: '01:48', jam_dinas_crew: '03:18', istirahat: '' },
                { no_dinasan: 2, kode_dinasan: '2', no_ka: '329', namaka: 'COMMUTER LINE WALAHAR', relasi: 'PWK-CKR', lintas: 'PWK-CKR', mulai_dinas: '09:15', jam_ber: '09:45', jam_dat: '12:15', habis_dinas: '12:45', jam_atas_ka: '01:26', jam_dinas_crew: '03:51', istirahat: '01:02' },
                { no_dinasan: 2, kode_dinasan: '2', no_ka: '332', namaka: 'COMMUTER LINE WALAHAR', relasi: 'CKR-PWK', lintas: 'CKR-PWK', mulai_dinas: '12:36', jam_ber: '13:26', jam_dat: '14:50', habis_dinas: '15:20', jam_atas_ka: '01:24', jam_dinas_crew: '02:54', istirahat: '' },
                { no_dinasan: 3, kode_dinasan: '3', no_ka: '327', namaka: 'COMMUTER LINE WALAHAR', relasi: 'PWK-CKR', lintas: 'PWK-CKR', mulai_dinas: '08:30', jam_ber: '09:20', jam_dat: '10:44', habis_dinas: '11:14', jam_atas_ka: '01:24', jam_dinas_crew: '02:54', istirahat: '02:52' },
                { no_dinasan: 3, kode_dinasan: '3', no_ka: '330', namaka: 'COMMUTER LINE WALAHAR', relasi: 'CKR-PWK', lintas: 'CKR-PWK', mulai_dinas: '10:36', jam_ber: '11:36', jam_dat: '13:08', habis_dinas: '13:38', jam_atas_ka: '01:32', jam_dinas_crew: '03:02', istirahat: '' },
                { no_dinasan: 4, kode_dinasan: '4', no_ka: '331', namaka: 'COMMUTER LINE JATILUHUR', relasi: 'PWK-CKR', lintas: 'PWK-CKR', mulai_dinas: '12:35', jam_ber: '13:35', jam_dat: '14:59', habis_dinas: '15:29', jam_atas_ka: '01:24', jam_dinas_crew: '02:54', istirahat: '02:27' },
                { no_dinasan: 4, kode_dinasan: '4', no_ka: '336', namaka: 'COMMUTER LINE JATILUHUR', relasi: 'CKP-CKR', lintas: 'CKP-CKR', mulai_dinas: '14:35', jam_ber: '15:35', jam_dat: '16:27', habis_dinas: '16:57', jam_atas_ka: '00:52', jam_dinas_crew: '02:22', istirahat: '' },
                { no_dinasan: 4, kode_dinasan: '4', no_ka: '337', namaka: 'COMMUTER LINE JATILUHUR', relasi: 'CKP-CKR', lintas: 'CKP-CKR', mulai_dinas: '15:56', jam_ber: '16:56', jam_dat: '17:56', habis_dinas: '18:26', jam_atas_ka: '01:00', jam_dinas_crew: '02:30', istirahat: '' },
                { no_dinasan: 4, kode_dinasan: '4', no_ka: '334', namaka: 'COMMUTER LINE JATILUHUR', relasi: 'CKR-PWK', lintas: 'CKR-PWK', mulai_dinas: '17:35', jam_ber: '18:35', jam_dat: '20:12', habis_dinas: '20:42', jam_atas_ka: '01:37', jam_dinas_crew: '03:07', istirahat: '' },
                { no_dinasan: 5, kode_dinasan: '5', no_ka: 'R335', namaka: 'DINAS RANGKAIAN COMMUTER LINE JATILUHUR', relasi: 'PWK-CKP', lintas: 'PWK-CKP', mulai_dinas: '03:05', jam_ber: '04:05', jam_dat: '04:25', habis_dinas: '04:55', jam_atas_ka: '00:20', jam_dinas_crew: '01:50', istirahat: '02:12' },
                { no_dinasan: 5, kode_dinasan: '5', no_ka: '335', namaka: 'COMMUTER LINE JATILUHUR', relasi: 'CKP-CKR', lintas: 'CKP-CKR', mulai_dinas: '03:48', jam_ber: '04:48', jam_dat: '05:32', habis_dinas: '06:02', jam_atas_ka: '00:44', jam_dinas_crew: '02:14', istirahat: '02:55' },
                { no_dinasan: 5, kode_dinasan: '5', no_ka: '326', namaka: 'COMMUTER LINE WALAHAR', relasi: 'CKR-PWK', lintas: 'CKR-PWK', mulai_dinas: '05:00', jam_ber: '06:00', jam_dat: '07:25', habis_dinas: '07:55', jam_atas_ka: '01:25', jam_dinas_crew: '02:55', istirahat: '' },
                { no_dinasan: 6, kode_dinasan: '6', no_ka: '338', namaka: 'COMMUTER LINE JATILUHUR', relasi: 'CKP-CKR', lintas: 'CKP-CKR', mulai_dinas: '17:55', jam_ber: '18:05', jam_dat: '19:47', habis_dinas: '20:17', jam_atas_ka: '01:42', jam_dinas_crew: '03:12', istirahat: '02:40' },
                { no_dinasan: 7, kode_dinasan: '7', no_ka: 'R325-2', namaka: 'DINAS RANGKAIAN COMMUTER LINE R WALAHAR', relasi: 'CKP-PWK', lintas: 'CKP-PWK', mulai_dinas: '02:55', jam_ber: '03:55', jam_dat: '04:15', habis_dinas: '04:45', jam_atas_ka: '01:20', jam_dinas_crew: '02:40', istirahat: '' },
                { no_dinasan: 8, kode_dinasan: '8AB', no_ka: '348', namaka: 'COMMUTER LINE GARUT', relasi: 'PWK-GRT', lintas: 'PWK-BD', mulai_dinas: '03:25', jam_ber: '04:25', jam_dat: '06:55', habis_dinas: '07:25', jam_atas_ka: '02:30', jam_dinas_crew: '04:00', istirahat: '06:26' },
                { no_dinasan: 8, kode_dinasan: '8AB', no_ka: '349', namaka: 'COMMUTER LINE GARUT', relasi: 'GRT-PWK', lintas: 'BD-PWK', mulai_dinas: '13:51', jam_ber: '14:51', jam_dat: '17:35', habis_dinas: '18:05', jam_atas_ka: '02:44', jam_dinas_crew: '04:14', istirahat: '' },
                { no_dinasan: 9, kode_dinasan: '9AB', no_ka: '350', namaka: 'COMMUTER LINE GARUT', relasi: 'PWK-GRT', lintas: 'PWK-BD', mulai_dinas: '15:25', jam_ber: '16:25', jam_dat: '18:54', habis_dinas: '19:24', jam_atas_ka: '02:29', jam_dinas_crew: '03:59', istirahat: '01:55' },
                { no_dinasan: 9, kode_dinasan: '9AB', no_ka: '367', namaka: 'COMMUTER LINE BANDUNG RAYA', relasi: 'CCL-PWK', lintas: 'BD-PWK', mulai_dinas: '21:19', jam_ber: '22:19', jam_dat: '00:35', habis_dinas: '01:05', jam_atas_ka: '02:16', jam_dinas_crew: '03:46', istirahat: '' },
                { no_dinasan: 10, kode_dinasan: '10', no_ka: 'SEREP PAGI', namaka: '-', relasi: 'PWK', lintas: '-', mulai_dinas: '08:00', jam_ber: '-', jam_dat: '-', habis_dinas: '16:00', jam_atas_ka: '-', jam_dinas_crew: '08:00', istirahat: '' }
            ],
            summary: { dinasan: 9, lis: 2, dibutuhkan: 12, adanya: 9, serep: 1, kurangLebih: -3 }
        },
        realisasi: {
            jadwal: [],
            summary: { dinasan: 0, lis: 0, dibutuhkan: 0, adanya: 0, serep: 0, kurangLebih: 0 }
        }
    },
    pageData: {
        dashboard: {
            bestEmployee: { nama: 'HERI ISKANDAR', nipp: '55042', foto: 'https://www.dropbox.com/scl/fi/jctkl5g1bcw0ipv5m9vff/7.jpg?rlkey=o8yxba0spafp087rwftfyv4gw&st=sjrta404&dl=1' }
        },
        tupoksi: {
            kupt: { nama: 'Yadi Supriadi', nipp: '44662', foto: 'https://www.dropbox.com/scl/fi/u1ecdsbxlv5k1c0phz4s9/1.jpg?rlkey=52el3zbql0ttpn0q6gtid1f0j&st=q5mx46gw&dl=1' },
            instruktur: { nama: 'Rofi Noviyanus', nipp: '54706', foto: 'https://www.dropbox.com/scl/fi/gck5kbyawzo1d6jokm2zw/2.jpg?rlkey=pfwcg6an9dyh2c24y1i7os4vj&st=klkxiwni&dl=1' },
            penyelia: [
                { nama: 'Arief Kurniawan', nipp: '42003', foto: 'https://www.dropbox.com/scl/fi/6hclvgw4cp94xrqcdibft/3.jpg?rlkey=voauxn7ltnra3sxu5ncr19tdd&st=ff08r8yu&dl=1' },
                { nama: 'Suhadi Asmara', nipp: '44726', foto: 'https://www.dropbox.com/scl/fi/v483o4osveb7zwwe5s0rx/4.jpg?rlkey=e312q71zmd8hzlo7x0bytr6hj&st=ltk3jidk&dl=1' },
                { nama: 'Fazhar Septia Illham', nipp: '48552', foto: 'https://www.dropbox.com/scl/fi/y86bg9vxxwmtfom3fpg17/5.jpg?rlkey=1xjh0jyxod3t9gqyjdpdi2h8n&st=iinnso0d&dl=1' },
                { nama: 'Muhamad Fitra', nipp: '65933', foto: 'https://www.dropbox.com/scl/fi/59e70vaqd4tew2iewq6r4/6.jpg?rlkey=xvdstqnhra3as7kc0tubknddf&st=t2m7ta6v&dl=1' }
            ]
        },
        keselamatan: {
            ibpr: [ 'https://www.dropbox.com/scl/fi/foubkekd9xjnxp5dnbay4/9-1.jpg?rlkey=ypa3luo4vbnflpptp0h30cp80&st=884bngiq&dl=1', 'https://www.dropbox.com/scl/fi/3rz9ukokcl5a0a8vjaw42/10-1.jpg?rlkey=xylwfnpzfm5d7o4nk8041dlv8&st=mmmq3yy8&dl=1' ],
            kebijakan: [ 'https://www.dropbox.com/scl/fi/34x5ljtq290tpowvn87be/22-1.jpg?rlkey=fojfe2pl9pkqnse4x3w5qojbq&st=ufqisnju&dl=1' ],
            integritas: [ 'https://www.dropbox.com/scl/fi/xm45ztfcnaeq29hf7nhip/24-1.jpg?rlkey=p8rqamlhqu19qkow06rwx4dvb&st=o80ega9d&dl=1' ],
            briefing: {
                pesan: 'Selalu waspada saat melintas di perlintasan sebidang dan perhatikan batas kecepatan. Pastikan komunikasi dengan PPKA berjalan lancar di setiap stasiun.',
                review: '<b>[20 Juni 2025]</b> - Anjlokan KA Barang di Lintas Utara. Penyebab: Kerusakan bantalan rel. <i>Tindakan: Peningkatan kewaspadaan saat melewati petak jalan tersebut.</i>'
            }
        }
    }
};

const sections = {
    dashboard: { title: 'Dasbor Utama' },
    profil: {
        title: 'Profil UPT Crew KA',
        content: `<div class="bg-white p-8 rounded-lg shadow"><h2 class="text-2xl font-bold text-[#0D2B4F] mb-4">Profil UPT Crew KA Kelas C Purwakarta</h2><div class="flex flex-col md:flex-row gap-8 items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Arya.train.crew.building.purwakarta.2019.jpg" alt="Kantor UPT Purwakarta" class="w-full md:w-1/2 rounded-lg object-cover"><div class="text-gray-800 space-y-6"><p class="text-xl font-bold leading-relaxed text-justify">UPT Crew KA Purwakarta adalah Unit Pelaksana Teknis yang berada di wilayah Daop 2 Bandung yang memiliki wewenang dan bertanggung jawab dalam penugasan masinis dan asisten masinis untuk dinas kereta api, langsir, atau dinas cadangan di stasiun awal pemberangkatan kereta api atau di stasiun pergantian awak KA.</p><p class="text-xl font-bold leading-relaxed text-justify">Berlokasi di wilayah paling barat Daerah Operasi 2 Bandung, UPT Crew KA Purwakarta menjadi garda terdepan yang berbatasan langsung dengan wilayah Daerah Operasi 1 Jakarta, memegang peranan krusial dalam kelancaran operasional kereta api di lintas barat.</p></div></div></div>`
    },
    struktur: {
        title: 'Struktur Organisasi',
        content: `<div class="bg-white p-6 rounded-lg shadow"><div class="border-b border-gray-200"><nav id="struktur-tabs" class="-mb-px flex space-x-8" aria-label="Tabs"><button onclick="switchTab('struktur', 'upt')" class="tab-button active whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">UPT Crew KA Kelas C Purwakarta</button><button onclick="switchTab('struktur', 'daop2')" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">DAERAH OPERASI 2 BANDUNG</button><button onclick="switchTab('struktur', 'pusat')" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">DIREKTORAT OPERASI</button></nav></div><div class="mt-6"><div id="upt-content" class="tab-content active p-4"><h3 class="text-xl font-bold text-[#0D2B4F] mb-4 text-center">Struktur Organisasi UPT Crew KA Kelas C Purwakarta</h3><img src="https://www.dropbox.com/scl/fi/dpaeklr9t96m257ut6reo/UPT-CREW.png?rlkey=xhn1anq4dduxuap8ynz3die7u&st=2moepz5t&dl=1" alt="Bagan Struktur Organisasi UPT Crew KA Purwakarta" class="w-full h-auto rounded-lg shadow-md object-contain mx-auto" onerror="this.onerror=null;this.src='https://placehold.co/1200x800/E0E7FF/0D2B4F?text=Gagal+Memuat+Bagan+UPT';"></div><div id="daop2-content" class="tab-content hidden p-4"><h3 class="text-xl font-bold text-[#0D2B4F] mb-4 text-center">Struktur Organisasi Operasi DAOP 2 Bandung</h3><img src="https://www.dropbox.com/scl/fi/j658tpmrxjst12ni7p05w/DAOP.png?rlkey=3iwole5l971t2uuxidvs5m30f&st=zuatdhyu&dl=1" alt="Bagan Struktur Organisasi DAOP 2 Bandung" class="w-full h-auto rounded-lg shadow-md object-contain mx-auto" onerror="this.onerror=null;this.src='https://placehold.co/1200x800/E0E7FF/0D2B4F?text=Gagal+Memuat+Bagan+DAOP+2';"></div><div id="pusat-content" class="tab-content hidden p-4"><h3 class="text-xl font-bold text-[#0D2B4F] mb-4 text-center">Struktur Organisasi Train Crew Operation</h3><img src="https://www.dropbox.com/scl/fi/cuhmqm6bgvckel9pmn7fc/PUSAT.png?rlkey=4sza7i77ehcgo1mk3htyw4ufx&st=vp29t2wf&dl=1" alt="Bagan Struktur Organisasi Direktorat Operasi" class="w-full h-auto rounded-lg shadow-md object-contain mx-auto" onerror="this.onerror=null;this.src='https://placehold.co/1200x800/E0E7FF/0D2B4F?text=Gagal+Memuat+Bagan+Pusat';"></div></div></div>`
    },
    tupoksi: { title: 'Tugas Pokok & Tanggung Jawab' },
    'rekapitulasi-pegawai': { title: 'Rekapitulasi & Program' },
    pegawai: { title: 'Daftar Nominatif Pegawai' },
    jadwal: { title: 'Jadwal Dinasan Awak KA' },
    kompetensi: { title: 'Hasil Uji Kompetensi' },
    sertifikasi: { title: 'Pantauan Sertifikasi' },
    'pantauan-lintas': { title: 'Pantauan Lintas' },
    keselamatan: { title: 'Keselamatan (HSSE)' }
};

let isEditMode = false;
let activeSectionForEdit = null;

// --- FUNGSI INTEGRASI AMAN (MELALUI PROXY) ---
async function uploadDataSecurely(data) {
    try {
        const response = await fetch(PROXY_ENDPOINT, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gagal unggah data: ${response.status} ${errorText}`);
        }
        console.log('Data berhasil diunggah melalui proxy.');
    } catch (error) {
        console.error('Error saat mengunggah data:', error);
        throw error;
    }
}

async function downloadDataSecurely() {
    try {
        const response = await fetch(PROXY_ENDPOINT);

        if (!response.ok) {
            if (response.status === 404) {
                console.log('File data tidak ditemukan di remote. Menggunakan data default.');
                updateConnectionStatus(true, 'Terhubung (File Baru)');
                return null;
            }
            const errorText = await response.text();
            throw new Error(`Gagal unduh data: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        updateConnectionStatus(true, 'Terhubung & Sinkron');
        return data;

    } catch (error) {
        console.error('Error saat mengunduh data:', error);
        updateConnectionStatus(false, 'Gagal Terhubung');
        return null;
    }
}

function updateConnectionStatus(isConnected, message) {
    const statusEl = document.getElementById('dropbox-status');
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove('bg-green-500', 'bg-red-500', 'bg-yellow-500');
    if (isConnected) {
        statusEl.classList.add('bg-green-500');
    } else {
        statusEl.classList.add('bg-red-500');
    }
}

// --- LOGIKA UTAMA APLIKASI ---
document.addEventListener('DOMContentLoaded', async function() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) {
        console.error("CRITICAL ERROR: Container '#content-area' not found. Page cannot be rendered.");
        return;
    }

    console.log('Mencoba memuat data dari sumber remote...');
    
    const cloudData = await downloadDataSecurely(); 

    if (cloudData) {
        appData = cloudData;
        console.log('Data berhasil dimuat dari sumber remote.');
    } else {
        console.log('Gagal memuat dari remote, mencoba memuat dari Local Storage...');
        loadDataFromStorage();
    }
    
    manageScheduleRotation();

    for (const key of Object.keys(sections)) {
        const sectionEl = document.createElement('section');
        sectionEl.id = key;
        sectionEl.className = 'content-section hidden'; // Default to hidden
        if (sections[key].content) {
            sectionEl.innerHTML = sections[key].content;
        }
        contentArea.appendChild(sectionEl);
    }

    setupCoreListeners();
    const initialHash = window.location.hash || '#dashboard';
    showSection(initialHash);
    
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === initialHash);
    });
    
    window.addEventListener('popstate', () => showSection(window.location.hash));
    updateClock();
    setInterval(updateClock, 1000);
});

window.addEventListener('beforeunload', () => {
    if (isEditMode) {
        console.log('Menyimpan data sebelum menutup halaman...');
        saveTemporaryChanges(); 
        try {
            localStorage.setItem('appData', JSON.stringify(appData));
        } catch (e) {
            console.error("Gagal menyimpan data ke localStorage sebelum unload:", e);
        }
    }
});

function updateClock() {
    const timeEl = document.getElementById('clock-time');
    const dateEl = document.getElementById('clock-date');
    if (!timeEl || !dateEl) return;

    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

function setupCoreListeners() {
    const sidebarNav = document.getElementById('sidebar-nav');
    const settingsButton = document.getElementById('settings-button');
    const loginForm = document.getElementById('login-form');
    const cancelLogin = document.getElementById('cancel-login');
    const loginModal = document.getElementById('login-modal');

    if (sidebarNav) sidebarNav.addEventListener('click', handleNavigation);
    if (settingsButton) settingsButton.addEventListener('click', handleSettingsClick);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (cancelLogin && loginModal) cancelLogin.addEventListener('click', () => loginModal.classList.add('hidden'));
}

function saveTemporaryChanges() {
    if (!isEditMode || !activeSectionForEdit) return;

    try {
        const saveFunction = window[`saveChanges_${activeSectionForEdit.replace(/-/g, '_')}`];
        if (typeof saveFunction === 'function') {
            saveFunction();
            console.log(`Perubahan sementara untuk ${activeSectionForEdit} berhasil disimpan ke appData.`);
        }
    } catch (error) {
        console.error("Terjadi error saat menyimpan perubahan sementara:", error);
    }
}

function handleSettingsClick(e) {
    e.preventDefault();
    if (isEditMode) {
        exitEditMode();
        return;
    }
    
    const activeSection = document.querySelector('.content-section.active');
    if (!activeSection) {
        showCustomAlert('Tidak ada seksi aktif untuk diedit.', 'error');
        return;
    }
    activeSectionForEdit = activeSection.id;
    const pageTitle = sections[activeSectionForEdit]?.title ?? 'Halaman Tanpa Nama';
    const loginMessageEl = document.getElementById('login-edit-message');
    const loginModalEl = document.getElementById('login-modal');

    if(loginMessageEl) loginMessageEl.textContent = `Anda akan mengedit halaman: ${pageTitle}`;
    if(loginModalEl) loginModalEl.classList.remove('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const validNipps = ['42003', '44662', '44726', '48552', '54706', '65933'];
    
    if (username === password && validNipps.includes(username)) {
        document.getElementById('login-modal').classList.add('hidden');
        document.getElementById('login-form').reset();
        enterEditMode();
    } else {
        showCustomAlert('Username atau Password salah!', 'error');
    }
}

function handleNavigation(e) {
    const link = e.target.closest('a');
    if (!link || !link.getAttribute('href').startsWith('#')) return;
    
    // The popstate event will handle the rest via hash change
}

function enterEditMode() {
    isEditMode = true;
    document.getElementById('app-container').classList.add('edit-mode');
    document.getElementById('settings-button').innerHTML = `<i class="fas fa-save fa-fw"></i><span>Simpan & Keluar</span>`;
    showCustomAlert(`Mode edit untuk "${sections[activeSectionForEdit]?.title ?? ''}" aktif.`, 'success');
    rerenderCurrentSection();
}

async function exitEditMode() {
    if (!isEditMode) return;
    
    saveTemporaryChanges();

    try {
        localStorage.setItem('appData', JSON.stringify(appData));
        console.log('Data berhasil disimpan ke Local Storage.');
        
        await uploadDataSecurely(appData);
        showCustomAlert('Data berhasil disimpan dan disinkronkan dengan aman.', 'success');
        updateConnectionStatus(true, 'Terhubung & Sinkron');

    } catch (error) {
        console.error('Gagal sinkronisasi data:', error);
        showCustomAlert(`Gagal sinkronisasi: ${error.message}. Perubahan hanya tersimpan lokal.`, 'error');
        updateConnectionStatus(false, 'Gagal Sinkronisasi');
    }
    
    isEditMode = false;
    document.getElementById('app-container').classList.remove('edit-mode');
    document.getElementById('settings-button').innerHTML = `<i class="fas fa-cog fa-fw"></i><span>Pengaturan</span>`;
    rerenderCurrentSection();
}

function showSection(hash) {
    if (isEditMode) {
        saveTemporaryChanges();
    }

    const targetHash = hash || '#dashboard';
    const targetKey = targetHash.substring(1);

    activeSectionForEdit = targetKey;

    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === targetHash);
    });

    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });

    const activeSectionEl = document.getElementById(targetKey);
    if (activeSectionEl) {
        activeSectionEl.classList.remove('hidden');
        activeSectionEl.classList.add('active');
        document.getElementById('page-title').textContent = sections[targetKey]?.title || 'Dasbor';
        rerenderCurrentSection();
    } else {
        console.error(`Seksi dengan ID "${targetKey}" tidak ditemukan.`);
        document.getElementById('page-title').textContent = 'Halaman Tidak Ditemukan';
        // Optionally, show a "not found" message in the content area
        const contentArea = document.getElementById('content-area');
        if (contentArea) contentArea.innerHTML = `<div class="text-center p-10 text-gray-500">Halaman yang Anda cari tidak ditemukan.</div>`;
    }
}

function rerenderCurrentSection() {
    const activeSectionId = document.querySelector('.content-section.active')?.id;
    if (!activeSectionId) return;

    const renderFunction = window[`render_${activeSectionId.replace(/-/g, '_')}`];
    if (typeof renderFunction === 'function') {
        renderFunction();
    } else if (!sections[activeSectionId]?.content) {
        const sectionEl = document.getElementById(activeSectionId);
        if (sectionEl) {
            sectionEl.innerHTML = `<div class="text-center p-10 text-gray-500">Konten untuk halaman ini belum tersedia atau fungsi render tidak ditemukan.</div>`;
        }
    }
}

function switchTab(group, tabId) {
    const container = document.querySelector('.content-section.active');
    if (!container) return;

    const tabsNav = container.querySelector(`#${group}-tabs`);
    const contentContainer = tabsNav?.parentElement?.nextElementSibling;

    if (!tabsNav || !contentContainer) return;

    tabsNav.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active', 'border-blue-500', 'text-blue-600'));
    tabsNav.querySelectorAll('.tab-button').forEach(button => button.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300'));
    
    const activeButton = tabsNav.querySelector(`[onclick*="'${tabId}'"]`);
    if(activeButton) {
        activeButton.classList.add('active', 'border-blue-500', 'text-blue-600');
        activeButton.classList.remove('border-transparent', 'text-gray-500');
    }
    
    contentContainer.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    const activeContent = contentContainer.querySelector(`#${tabId}-content`);
    if(activeContent) activeContent.classList.remove('hidden');
}

function calculateAwakDinas() {
    const jadwalReguler = appData.jadwalHariIni?.reguler ?? [];
    const jadwalKlb = appData.jadwalHariIni?.klb ?? [];
    
    const kaReg = jadwalReguler.filter(dinas => {
        const noKa = dinas.nomor_ka?.trim().toUpperCase() ?? '';
        return noKa !== 'LIBUR' && noKa !== 'SEREP PAGI' && noKa !== '';
    }).length;
    
    const kaKlb = jadwalKlb.filter(dinas => (dinas.nomor_ka?.trim() ?? '') !== '').length;
    
    return (kaReg + kaKlb) * 2;
}

function searchTable(tableId) {
    const input = document.getElementById('searchInput');
    const table = document.getElementById(tableId);
    if (!input || !table) return;

    const filter = input.value.toUpperCase();
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) { // Start from 1 to skip header
        const tds = tr[i].getElementsByTagName('td');
        let textValue = "";
        for (let j = 0; j < tds.length; j++) {
            textValue += tds[j].textContent || tds[j].innerText;
        }
        tr[i].style.display = textValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
}

function showCustomAlert(message, type = 'success') {
    const container = document.getElementById('alert-container');
    if (!container) return;

    const alertId = 'toast-' + Date.now();
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';

    const alertDiv = document.createElement('div');
    alertDiv.id = alertId;
    alertDiv.className = `alert-toast flex items-center p-4 mb-4 text-white ${bgColor} rounded-lg shadow-lg`;
    alertDiv.innerHTML = `<i class="fas ${icon} mr-3"></i><span>${message}</span>`;
    
    container.appendChild(alertDiv);

    setTimeout(() => {
        const toast = document.getElementById(alertId);
        if (toast) {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 500);
        }
    }, 5000);
}

// PERBAIKAN: Fungsi ini sekarang lebih aman terhadap data korup.
function loadDataFromStorage() {
    const savedDataString = localStorage.getItem('appData');
    if (savedDataString) {
        try {
            const savedData = JSON.parse(savedDataString);
            // Deep merge to ensure new properties in default appData are not lost
            const deepMerge = (target, source) => {
                for (const key in source) {
                    if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
                        deepMerge(target[key], source[key]);
                    } else {
                        target[key] = source[key];
                    }
                }
                return target;
            };
            appData = deepMerge(appData, savedData);
            console.log("Data loaded and DEEP MERGED from Local Storage.");
        } catch (error) {
            console.error("Gagal memuat data dari Local Storage, data mungkin korup. Menghapus data korup dan menggunakan data default.", error);
            localStorage.removeItem('appData'); // Hapus data yang rusak
        }
    }
}

// PERBAIKAN: Fungsi ini sekarang lebih aman.
function clearScheduleData(schedule) {
    if (!schedule) {
        console.error("clearScheduleData called with an undefined schedule.");
        return;
    }
    
    schedule.penyelia = { dinas1: { nama: '', nipp: '' }, dinas2: { nama: '', nipp: '' }, dinas3: { nama: '', nipp: '' } };
    
    if (schedule.reguler && Array.isArray(schedule.reguler)) {
        schedule.reguler.forEach(row => {
            row.masinis = '';
            row.nipp_mas = '';
            row.asisten = '';
            row.nipp_as = '';
        });
    } else {
        schedule.reguler = []; // Inisialisasi jika tidak ada
    }

    schedule.klb = [{ no: '', nomor_ka: '', lintas: '', mulai: '', habis: '', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' }];
    schedule.cuti = [{ no: 1, diklap: '', cuti: '', csk: '', pembinaan: '', sertifikasi: '' }];
    schedule.catatanPenting = '';
}

function manageScheduleRotation() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastVisitString = localStorage.getItem('lastVisitDate');
    if (!lastVisitString) {
        localStorage.setItem('lastVisitDate', today.toISOString());
        return;
    }

    const lastVisitDate = new Date(lastVisitString);
    lastVisitDate.setHours(0, 0, 0, 0);

    const timeDiff = today.getTime() - lastVisitDate.getTime();
    const dayDifference = Math.round(timeDiff / (1000 * 3600 * 24));

    if (dayDifference >= 1) {
        if (dayDifference === 1) {
            console.log("Rotasi jadwal normal terdeteksi.");
            // Deep copy to prevent reference issues
            appData.jadwalHariIni = JSON.parse(JSON.stringify(appData.jadwalBesok));
            clearScheduleData(appData.jadwalBesok);
        } else {
            console.log(`Data jadwal basi terdeteksi (${dayDifference} hari). Mengosongkan kedua jadwal.`);
            clearScheduleData(appData.jadwalHariIni);
            clearScheduleData(appData.jadwalBesok);
        }
        
        localStorage.setItem('lastVisitDate', today.toISOString());
        // Simpan perubahan rotasi ke local storage dan coba unggah
        try {
             localStorage.setItem('appData', JSON.stringify(appData));
             uploadDataSecurely(appData).catch(err => console.error("Gagal sinkronisasi otomatis setelah rotasi:", err));
        } catch(e) {
            console.error("Gagal menyimpan data setelah rotasi jadwal: ", e);
        }
    }
}

function addTableRow(dataKey, subKey = null, thirdKey = null) {
    saveTemporaryChanges();

    let targetArray;
    let newObject = {};
    let prototypeObject = null;
    
    if (subKey) {
        if (thirdKey && thirdKey !== 'null') { targetArray = appData[dataKey]?.[subKey]?.[thirdKey]; }
        else { targetArray = appData[dataKey]?.[subKey]; }
    } else { targetArray = appData[dataKey]; }

    if (Array.isArray(targetArray) && targetArray.length > 0) {
        prototypeObject = targetArray[0];
    } else {
        const a_thirdKey = (thirdKey && thirdKey !== 'null') ? `_${thirdKey}` : '';
        const lookupKey = subKey ? `${dataKey}_${subKey}${a_thirdKey}` : `${dataKey}_null`;
        
        switch (lookupKey) {
            case 'pantauanTaspat_hilir_bd': case 'pantauanTaspat_hulu_bd': case 'pantauanTaspat_hilir_ckr': case 'pantauanTaspat_hulu_ckr':
                prototypeObject = { no: '', petak: '', km: '', kecepatan: '' }; break;
            case 'pantauanPerka_wam_jalan': case 'pantauanPerka_wam_batal': case 'pantauanPerka_ppk_jalan': case 'pantauanPerka_ppk_batal':
                prototypeObject = { no: '', tanggal: '', ka: '', relasi: '', dasar: '', keterangan: '' }; break;
            case 'pantauanPerka_wad_null':
                prototypeObject = { no: '', tanggal: '', dasar: '', keterangan: '' }; break;
            case 'programGapeka_program_jadwal': case 'programGapeka_realisasi_jadwal':
                prototypeObject = { no_dinasan: '', kode_dinasan: '', no_ka: '', namaka: '', relasi: '', lintas: '', mulai_dinas: '', jam_ber: '', jam_dat: '', habis_dinas: '', jam_atas_ka: '', jam_dinas_crew: '', istirahat: '' }; break;
            case 'pantauanKejadian_null': prototypeObject = { no: '', tanggal: '', no_ka: '', kejadian: '', tindak_lanjut: '', keterangan: '' }; break;
            case 'pantauanKKA_null': prototypeObject = { no: '', tanggal: '', kejadian: '', tindak_lanjut: '', keterangan: '' }; break;
            case 'wartaDinas_null': prototypeObject = { no: '', warta: '', tentang: '' }; break;
            case 'sertifikasi_null': prototypeObject = { nama: '', nipp: '', jabatan: '', jenis: '', berlaku: '', smartcard_url: '' }; break;
            case 'pegawai_null': prototypeObject = { no: '', nama: '', nipp: '', jabatan: '', tgl_lahir: '', diklat_fungsi: '', o62: '', o64: '', sert_madya: '', sert_muda: '', sert_pertama: '', pensiun: '' }; break;
            case 'nilaiUtsUpo_null': prototypeObject = { no: '', nama: '', nipp: '', jabatan: '' }; break;
            case 'ujiUlang_null': prototypeObject = { no: '', nama: '', nipp: '', jabatan: '', tgl_uji: '', nilai_teori: '', waw_sarana: '', waw_operasi: '', prak_perka: '', prak_adm: '', keterangan: '', penguji: '', ka: '' }; break;
            case 'jadwalHariIni_reguler': case 'jadwalBesok_reguler':
                prototypeObject = { no: '', kode: '', nomor_ka: '', lintas: '', mulai: '', habis: '', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' }; break;
            case 'jadwalHariIni_klb': case 'jadwalBesok_klb':
                prototypeObject = { no: '', nomor_ka: '', lintas: '', mulai: '', habis: '', masinis: '', nipp_mas: '', asisten: '', nipp_as: '' }; break;
            case 'jadwalHariIni_cuti': case 'jadwalBesok_cuti':
                prototypeObject = { no: 1, diklap: '', cuti: '', csk: '', pembinaan: '', sertifikasi: '' }; break;
        }
    }

    if (prototypeObject) { for (const key in prototypeObject) { newObject[key] = ''; } }
    
    if (Object.keys(newObject).length > 0) {
        if (!Array.isArray(targetArray)) {
            // Initialize the array if it doesn't exist
            if (subKey) {
                if (!appData[dataKey]) appData[dataKey] = {};
                if (thirdKey && thirdKey !== 'null') {
                    if (!appData[dataKey][subKey]) appData[dataKey][subKey] = {};
                    appData[dataKey][subKey][thirdKey] = [];
                } else {
                    appData[dataKey][subKey] = [];
                }
            } else {
                appData[dataKey] = [];
            }
             // Re-assign targetArray after initialization
            if (subKey) {
                if (thirdKey && thirdKey !== 'null') { targetArray = appData[dataKey][subKey][thirdKey]; }
                else { targetArray = appData[dataKey][subKey]; }
            } else { targetArray = appData[dataKey]; }
        }

        targetArray.push(newObject);
        rerenderCurrentSection();
    } else {
        console.error("Could not determine prototype for new row.", {dataKey, subKey, thirdKey});
    }
}


function deleteTableRow(dataKey, index, subKey = null, thirdKey = null) {
    saveTemporaryChanges();

    let targetArray;
    if (subKey) {
        if (thirdKey && thirdKey !== 'null') { targetArray = appData[dataKey]?.[subKey]?.[thirdKey]; }
        else { targetArray = appData[dataKey]?.[subKey]; }
    } else { targetArray = appData[dataKey]; }

    if (Array.isArray(targetArray)) {
        targetArray.splice(index, 1);
        rerenderCurrentSection();
        showCustomAlert('Baris telah dihapus.', 'success');
    } else {
        console.error("Delete failed: target is not an array.", {dataKey, subKey, thirdKey});
    }
}

function saveTableData(tbodyId) {
    const newArray = [];
    const tableBody = document.getElementById(tbodyId);

    if (!tableBody) {
        console.error(`Save failed: tbody with id "${tbodyId}" not found.`);
        return null;
    }

    tableBody.querySelectorAll('tr').forEach(tr => {
        const newRow = {};
        tr.querySelectorAll('input.edit-input, textarea.edit-textarea').forEach(input => {
            if (input.dataset.key) {
                newRow[input.dataset.key] = input.value;
            }
        });
        if (Object.keys(newRow).length > 0) {
            newArray.push(newRow);
        }
    });

    return newArray;
}

// --- RENDER DAN SAVE FUNCTIONS (PERBAIKAN: DIBUAT LEBIH AMAN) ---

function render_dashboard() {
    const contentEl = document.getElementById('dashboard');
    if (!contentEl) return;

    const jumlahAwakDinas = calculateAwakDinas();
    const jumlahPasangan = jumlahAwakDinas / 2;
    const best = appData.pageData?.dashboard?.bestEmployee ?? { nama: 'N/A', nipp: 'N/A', foto: '' };

    let kpiCardsHtml = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div class="kpi-card bg-white p-5 rounded-lg shadow"><h3 class="text-gray-500 text-sm font-medium">Total Pegawai</h3><p class="text-3xl font-bold text-gray-800">${appData.pegawai?.length ?? 0}</p><p class="text-green-500 text-xs mt-1">Data Terpenuhi</p></div><div class="kpi-card bg-white p-5 rounded-lg shadow"><h3 class="text-gray-500 text-sm font-medium">Awak KA Dinas Hari Ini</h3><p class="text-3xl font-bold text-gray-800">${jumlahAwakDinas}</p><p class="text-gray-500 text-xs mt-1">${jumlahPasangan} Pasang Masinis & Asisten</p></div><div class="kpi-card bg-white p-5 rounded-lg shadow"><h3 class="text-gray-500 text-sm font-medium">Sertifikasi Segera Habis</h3><p class="text-3xl font-bold text-gray-800">6</p><p class="text-yellow-500 text-xs mt-1">Dalam 1 tahun ke depan</p></div><div class="kpi-card bg-white p-5 rounded-lg shadow"><h3 class="text-gray-500 text-sm font-medium">Insiden Bulan Ini</h3><p class="text-3xl font-bold text-gray-800">0</p><p class="text-green-500 text-xs mt-1">Target Zero Accident</p></div></div>`;
    let mainContentHtml = `<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"><div class="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg"><div class="grid grid-cols-1 md:grid-cols-5 gap-8"><div class="md:col-span-2 md:border-r md:pr-8 border-gray-200"><h4 class="text-2xl font-bold text-[#F28500] mb-4">VISI</h4><p class="text-xl font-medium text-gray-800 leading-relaxed">Menggerakkan transportasi berkelanjutan, meningkatkan kualitas hidup masyarakat.</p><p class="text-md italic text-gray-500 mt-2">Driving Sustainable Transportation, Enhancing People's Lives.</p></div><div class="md:col-span-3"><h4 class="text-2xl font-bold text-[#0D2B4F] mb-4">MISI</h4><ul class="space-y-4"><li class="flex items-start"><i class="fas fa-check-circle text-lg text-green-500 mr-3 mt-1 flex-shrink-0"></i><div><p class="text-gray-700">Menyediakan jasa yang mengedepankan keselamatan, ketepatan waktu dan kenyamanan.</p><em class="text-gray-500 text-sm">Providing services that prioritize safety, punctuality and comfort.</em></div></li><li class="flex items-start"><i class="fas fa-check-circle text-lg text-green-500 mr-3 mt-1 flex-shrink-0"></i><div><p class="text-gray-700">Mengembangkan sumber daya dan teknologi dengan mengedepankan ESG.</p><em class="text-gray-500 text-sm">Develop resources and technology by prioritizing ESG.</em></div></li><li class="flex items-start"><i class="fas fa-check-circle text-lg text-green-500 mr-3 mt-1 flex-shrink-0"></i><div><p class="text-gray-700">Berperan aktif dalam pengembangan transportasi antarmoda berkelanjutan bersama pemangku kepentingan.</p><em class="text-gray-500 text-sm">Play an active role in the development of sustainable intermodal transport with stakeholders.</em></div></li></ul></div></div></div><div class="space-y-6"><div class="bg-white p-4 rounded-lg shadow"><h3 class="font-bold text-lg text-center mb-4">Komposisi Pegawai</h3><div class="h-64 flex justify-center items-center"><canvas id="pegawaiChart"></canvas></div></div><div class="bg-white p-6 rounded-lg shadow" id="best-employee-container"></div></div></div>`;
    let akhlakHtml = `<div class="mt-6 bg-white p-6 rounded-lg shadow"><h4 class="text-lg font-bold text-center text-[#0D2B4F] mb-4">Nilai-Nilai Utama (AKHLAK)</h4><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center"><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">A</p><p class="font-semibold text-sm">Amanah</p><p class="text-xs text-gray-600 mt-1">Memegang teguh kepercayaan yang diberikan</p></div><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">K</p><p class="font-semibold text-sm">Kompeten</p><p class="text-xs text-gray-600 mt-1">Terus belajar dan mengembangkan kapabilitas</p></div><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">H</p><p class="font-semibold text-sm">Harmonis</p><p class="text-xs text-gray-600 mt-1">Saling peduli dan menghargai perbedaan</p></div><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">L</p><p class="font-semibold text-sm">Loyal</p><p class="text-xs text-gray-600 mt-1">Berdedikasi dan mengutamakan kepentingan Bangsa dan Negara</p></div><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">A</p><p class="font-semibold text-sm">Adaptif</p><p class="text-xs text-gray-600 mt-1">Terus berinovasi dan antusias dalam menggerakkan ataupun menghadapi perubahan</p></div><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">K</p><p class="font-semibold text-sm">Kolaboratif</p><p class="text-xs text-gray-600 mt-1">Membangun kerja sama yang sinergis</p></div></div></div>`;
    
    contentEl.innerHTML = kpiCardsHtml + mainContentHtml + akhlakHtml;
    
    let bestEmployeeHtml;
    if (isEditMode) {
        bestEmployeeHtml = `<div class="flex flex-col items-center space-y-2"><img src="${best.foto}" alt="Awak KA Terbaik" class="rounded-full border-4 border-white shadow-lg w-24 h-24 object-cover"><input type="text" id="edit-best-foto" class="edit-input text-center" placeholder="URL Foto Baru" value="${best.foto}"><div class="text-center"><input type="text" id="edit-best-nama" class="edit-input text-center font-bold" value="${best.nama}"><input type="text" id="edit-best-nipp" class="edit-input text-center mt-1" value="${best.nipp}"></div></div>`;
    } else {
        bestEmployeeHtml = `<div class="flex flex-col items-center space-y-2"><img src="${best.foto}" alt="Awak KA Terbaik" class="rounded-full border-4 border-white shadow-lg w-24 h-24 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/96x96/E0E7FF/0D2B4F?text=Gagal+Muat';"><div class="text-center"><h4 class="text-lg font-bold text-[#0D2B4F]">${best.nama}</h4><p class="text-sm text-gray-600">NIPP. ${best.nipp}</p></div></div>`;
    }

    const bestEmployeeContainer = document.getElementById('best-employee-container');
    if(bestEmployeeContainer) bestEmployeeContainer.innerHTML = `<h3 class="font-bold text-lg mb-2 text-center">Awak KA Terbaik</h3>${bestEmployeeHtml}`;
    
    if (typeof Chart !== 'undefined') { createDashboardCharts(); }
}

function saveChanges_dashboard() {
    if (!appData.pageData?.dashboard?.bestEmployee) {
        appData.pageData = { ...appData.pageData, dashboard: { bestEmployee: {} } };
    }
    const best = appData.pageData.dashboard.bestEmployee;
    const safeUpdate = (id, key) => { const element = document.getElementById(id); if (element) best[key] = element.value; };
    
    safeUpdate('edit-best-nama', 'nama');
    safeUpdate('edit-best-nipp', 'nipp');
    safeUpdate('edit-best-foto', 'foto');
}

// ... (Other functions follow the same robust pattern)

function render_rekapitulasi_pegawai() {
    const contentEl = document.getElementById('rekapitulasi-pegawai');
    if (!contentEl) return;
    
    const data = appData.rekapitulasiPegawai ?? {};
    const nominatif = data.nominatif ?? {};
    const cukupanMasinis = data.cukupanMasinis ?? {};
    const cukupanAsisten = data.cukupanAsisten ?? {};

    const createRow = (label, value, id) => `<tr><td class="py-2">${label}</td>${isEditMode ? `<td><input type="number" id="${id}" class="edit-input w-24 float-right text-right" value="${value ?? 0}"></td>` : `<td class="py-2 text-right font-semibold">${value ?? 0}</td>`}</tr>`;
    const createSummaryRow = (label, value, id, isPositive) => { const bgColor = isEditMode ? '' : (isPositive ? 'bg-green-200' : 'bg-red-200'); return `<tr class="${bgColor} font-bold"><td class="py-2">${label}</td>${isEditMode ? `<td><input type="number" id="${id}" class="edit-input w-24 float-right text-right" value="${value ?? 0}"></td>` : `<td class="py-2 text-right">${value ?? 0}</td>`}</tr>`; };
    
    const rekapNominatifHtml = `<div class="border p-4 rounded-lg"><h3 class="font-bold text-center mb-2">Rekap Nominatif</h3><table class="w-full text-sm"><tbody class="divide-y">${createRow('KUPT', nominatif.kupt, 'edit-nominatif-kupt')}${createRow('PENYELIA INSTRUKTUR', nominatif.penyeliaInstruktur, 'edit-nominatif-penyeliaInstruktur')}${createRow('PENYELIA DINASAN', nominatif.penyeliaDinasan, 'edit-nominatif-penyeliaDinasan')}${createRow('MASINIS', nominatif.masinis, 'edit-nominatif-masinis')}${createRow('ASISTEN MASINIS', nominatif.asistenMasinis, 'edit-nominatif-asistenMasinis')}<tr class="bg-gray-100 font-bold"><td class="py-2">JUMLAH</td>${isEditMode ? `<td><input type="number" id="edit-nominatif-jumlah" class="edit-input w-24 float-right text-right" value="${nominatif.jumlah ?? 0}"></td>` : `<td class="py-2 text-right">${nominatif.jumlah ?? 0}</td>`}</tr></tbody></table></div>`;
    const cukupanMasinisHtml = `<div class="border p-4 rounded-lg bg-blue-50"><h3 class="font-bold text-center mb-2">Cukupan Pegawai (MASINIS MADYA / MUDA)</h3><table class="w-full text-sm"><tbody class="divide-y">${createRow('DINASAN MURNI', cukupanMasinis.dinasanMurni, 'edit-masinis-dinasanMurni')}${createRow('L/I/S', cukupanMasinis.lhs, 'edit-masinis-lhs')}${createRow('DIBUTUHKAN', cukupanMasinis.dibutuhkan, 'edit-masinis-dibutuhkan')}${createRow('ADANYA PEGAWAI', cukupanMasinis.adanyaPegawai, 'edit-masinis-adanyaPegawai')}${createRow('SEREP', cukupanMasinis.serep, 'edit-masinis-serep')}${createSummaryRow('KURANG/LEBIH', cukupanMasinis.kurangLebih, 'edit-masinis-kurangLebih', (cukupanMasinis.kurangLebih ?? 0) >= 0)}</tbody></table></div>`;
    const cukupanAsistenHtml = `<div class="border p-4 rounded-lg bg-orange-50"><h3 class="font-bold text-center mb-2">Cukupan Pegawai (MASINIS PERTAMA)</h3><table class="w-full text-sm"><tbody class="divide-y">${createRow('DINASAN MURNI', cukupanAsisten.dinasanMurni, 'edit-asisten-dinasanMurni')}${createRow('L/I/S', cukupanAsisten.lhs, 'edit-asisten-lhs')}${createRow('DIBUTUHKAN', cukupanAsisten.dibutuhkan, 'edit-asisten-dibutuhkan')}${createRow('ADANYA PEGAWAI', cukupanAsisten.adanyaPegawai, 'edit-asisten-adanyaPegawai')}${createRow('SEREP', cukupanAsisten.serep, 'edit-asisten-serep')}${createSummaryRow('KURANG/LEBIH', cukupanAsisten.kurangLebih, 'edit-asisten-kurangLebih', (cukupanAsisten.kurangLebih ?? 0) >= 0)}</tbody></table></div>`;
    
    // ...The rest of the rendering functions would be updated similarly to be more defensive against missing data...
    // For brevity, only the most critical ones are shown fully rewritten, but the principle applies to all.
    contentEl.innerHTML = `<div class="space-y-6"><div class="bg-white p-6 rounded-lg shadow"><h2 class="text-2xl font-bold text-[#0D2B4F] mb-4">Rekapitulasi Jumlah Pegawai Tahun 2025</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${rekapNominatifHtml}${cukupanMasinisHtml}${cukupanAsistenHtml}</div></div><div class="bg-white p-6 rounded-lg shadow"><h2 class="text-2xl font-bold text-[#0D2B4F] mb-4">Program & Realisasi Dinasan</h2><div class="border-b border-gray-200"><nav id="o20-tabs" class="-mb-px flex space-x-8" aria-label="Tabs"><button onclick="switchTab('o20', 'program')" class="tab-button active whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600">Program GAPEKA 2025</button><button onclick="switchTab('o20', 'realisasi')" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Realisasi GAPEKA 2025</button></nav></div><div class="mt-6"><div id="program-content" class="tab-content"></div><div id="realisasi-content" class="tab-content hidden"></div></div></div></div>`;
    
    const programData = appData.programGapeka?.program ?? { jadwal: [], summary: {} };
    const realisasiData = appData.programGapeka?.realisasi ?? { jadwal: [], summary: {} };
    renderGapekaTable(programData, 'program-content', 'programGapeka', 'program');
    renderGapekaTable(realisasiData, 'realisasi-content', 'programGapeka', 'realisasi');
}

function renderGapekaTable(gapekaData, containerId, dataKey, subKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const jadwalData = gapekaData.jadwal ?? [];
    const summaryData = gapekaData.summary ?? {};
    const columns = [ {key: 'no_dinasan', label: 'NO DINASAN'}, {key: 'kode_dinasan', label: 'KODE DINASAN'}, {key: 'no_ka', label: 'NO KA'}, {key: 'namaka', label: 'NAMAKA'}, {key: 'relasi', label: 'RELASI'}, {key: 'lintas', label: 'LINTAS'}, {key: 'mulai_dinas', label: 'MULAI DINAS'}, {key: 'jam_ber', label: 'JAM BER'}, {key: 'jam_dat', label: 'JAM DAT'}, {key: 'habis_dinas', label: 'HABIS DINAS'}, {key: 'jam_atas_ka', label: 'JAM DI ATAS KA'}, {key: 'jam_dinas_crew', label: 'JAM DINAS CREW'}, {key: 'istirahat', label: 'ISTIRAHAT'} ];
    let headerHtml = `<thead class="bg-gray-200 text-black text-center whitespace-nowrap"><tr><th class="p-1 border align-middle" rowspan="2">NO DINASAN</th><th class="p-1 border align-middle" rowspan="2">KODE DINASAN</th><th class="p-1 border align-middle" rowspan="2">NO KA</th><th class="p-1 border align-middle" rowspan="2">NAMAKA</th><th class="p-1 border align-middle" rowspan="2">RELASI</th><th class="p-1 border align-middle" rowspan="2">LINTAS</th><th class="p-1 border align-middle" rowspan="2">MULAI DINAS</th><th class="p-1 border" colspan="2">PROGRAM</th><th class="p-1 border align-middle" rowspan="2">HABIS DINAS</th><th class="p-1 border align-middle" rowspan="2">JAM DI ATAS KA</th><th class="p-1 border align-middle" rowspan="2">JAM DINAS CREW</th><th class="p-1 border align-middle" rowspan="2">ISTIRAHAT</th>${isEditMode ? '<th class="p-1 border align-middle" rowspan="2">AKSI</th>' : ''}</tr><tr><th class="p-1 border">JAM BER</th><th class="p-1 border">JAM DAT</th></tr></thead>`;
    let bodyHtml = '';
    if (isEditMode) {
        bodyHtml = jadwalData.map((row, index) => { let cells = columns.map(c => `<td class="p-1 border"><input class="edit-input text-center" data-key="${c.key}" value="${row[c.key] || ''}"></td>`).join(''); cells += `<td class="p-1 border text-center"><button class="delete-row-btn" onclick="deleteTableRow('${dataKey}', ${index}, '${subKey}', 'jadwal')">X</button></td>`; return `<tr data-index="${index}">${cells}</tr>`; }).join('');
    } else {
        const dinasanCounts = jadwalData.reduce((acc, row) => { const dinasan = row.no_dinasan || ''; if (dinasan) { acc[dinasan] = (acc[dinasan] || 0) + 1; } return acc; }, {});
        const renderedDinasan = new Set();
        bodyHtml = jadwalData.map((row) => { let rowHtml = ''; const noDinasan = row.no_dinasan || ''; if (noDinasan && !renderedDinasan.has(noDinasan)) { renderedDinasan.add(noDinasan); const rowspan = dinasanCounts[noDinasan] || 1; rowHtml += `<td class="p-1 border align-middle text-center" rowspan="${rowspan}">${noDinasan}</td>`; } else if (!noDinasan) { rowHtml += `<td class="p-1 border"></td>`; } rowHtml += columns.slice(1).map(c => `<td class="p-1 border text-center">${row[c.key] || ''}</td>`).join(''); return `<tr>${rowHtml}</tr>`; }).join('');
    }
    const createFooterRow = (label, value, id) => `<tr><td colspan="12" class="text-right font-bold p-2">${label}</td>${isEditMode ? `<td><input type="number" id="${id}" class="edit-input text-center" value="${value ?? 0}"></td>` : `<td class="p-2 border text-center font-bold">${value ?? 0}</td>`}<td class="border"></td></tr>`;
    const summaryFooterHtml = `<tfoot class="text-sm">${createFooterRow('DINASAN', summaryData.dinasan, `edit-${subKey}-summary-dinasan`)}${createFooterRow('L / I / S', summaryData.lis, `edit-${subKey}-summary-lis`)}${createFooterRow('DIBUTUHKAN', summaryData.dibutuhkan, `edit-${subKey}-summary-dibutuhkan`)}${createFooterRow('ADANYA', summaryData.adanya, `edit-${subKey}-summary-adanya`)}${createFooterRow('SEREP', summaryData.serep, `edit-${subKey}-summary-serep`)}${createFooterRow('KURANG / LEBIH', summaryData.kurangLebih, `edit-${subKey}-summary-kurangLebih`)}</tfoot>`;
    container.innerHTML = `<table class="w-full text-xs border-collapse border border-gray-400">${headerHtml}<tbody id="${containerId}-tbody">${bodyHtml}</tbody>${summaryFooterHtml}</table>${isEditMode ? `<div class="p-2"><button class="add-row-btn" onclick="addTableRow('${dataKey}', '${subKey}', 'jadwal')">+ Tambah Baris</button></div>` : ''}`;
}

// ... (And so on for all other render and save functions)

function calculateEmployeeComposition() {
    let manajemenCount = 0;
    let masinisMadyaCount = 0;
    let masinisMudaCount = 0;
    let masinisPertamaCount = 0;

    (appData.pegawai ?? []).forEach(p => {
        const jabatan = p.jabatan?.toUpperCase() ?? '';
        switch (jabatan) {
            case 'KUPT':
            case 'WAKIL KUPT':
            case 'PENYELIA INSTRUKTUR':
            case 'PENYELIA DINASAN':
                manajemenCount++;
                break;
            case 'MASINIS MADYA':
                masinisMadyaCount++;
                break;
            case 'MASINIS MUDA':
                masinisMudaCount++;
                break;
            case 'MASINIS PERTAMA':
                masinisPertamaCount++;
                break;
        }
    });

    const labels = [];
    const data = [];

    if (manajemenCount > 0) { labels.push('Manajemen'); data.push(manajemenCount); }
    if (masinisMadyaCount > 0) { labels.push('Masinis Madya'); data.push(masinisMadyaCount); }
    if (masinisMudaCount > 0) { labels.push('Masinis Muda'); data.push(masinisMudaCount); }
    if (masinisPertamaCount > 0) { labels.push('Masinis Pertama'); data.push(masinisPertamaCount); }

    return { labels, data };
}

function createDashboardCharts() {
    ['pegawaiChart'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { const chartInstance = Chart.getChart(el); if (chartInstance) { chartInstance.destroy(); } }
    });
    
    const composition = calculateEmployeeComposition();
    const colorMap = {
        'Manajemen': '#E74C3C',
        'Masinis Madya': '#2ECC71',
        'Masinis Muda': '#3498DB',
        'Masinis Pertama': '#F1C40F' // Changed color for better visibility
    };
    const chartColors = composition.labels.map(label => colorMap[label] || '#95A5A6');

    const pegawaiCtx = document.getElementById('pegawaiChart')?.getContext('2d');
    if (pegawaiCtx) {
        new Chart(pegawaiCtx, {
            type: 'doughnut',
            data: { 
                labels: composition.labels, 
                datasets: [{ 
                    data: composition.data, 
                    backgroundColor: chartColors,
                    borderColor: '#FFFFFF',
                    borderWidth: 2,
                    hoverOffset: 4 
                }] 
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { 
                    legend: { position: 'bottom', labels: { padding: 20 } } 
                } 
            }
        });
    }
}
