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
        { "no": 10, "nama": "UNGGUL HENDRA EKA PRANOTO", "nipp": "54730", "jabatan": "MASINIS MUDA", "ttl": "BANDUNG, SEPTEMBER 1985", "ijazah": "SMK", "mulai_bekerja": "", "diklat_fungsional": "", "lulus": "", "o62": "090/LL.006/III-2015/DIKLAT", "o64": "", "sert_madya": "", "sert_muda": "16/07/2021", "sert_pertama": "", "diklat_nama": "", "diklat_tgl": "", "pensiun": "2043-09" },
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
    ],
    ujiUlang: [
        { no: 1, nama: 'ROFI NOVIYANUS', nipp: 54706, jabatan: 'MASINIS MADYA', tgl_uji: '03 MARET', nilai_teori: 100, waw_sarana: '', waw_operasi: '', prak_perka: 100, prak_adm: '', keterangan: 'LULUS', penguji: '', ka: '' },
        { no: 6, nama: 'RIYAD FIRDAUS', nipp: '47335', jabatan: 'MASINIS MUDA', tgl_uji: '10 MARET', nilai_teori: 88, waw_sarana: 96, waw_operasi: '19 FEBRUARI', prak_perka: 100, prak_adm: 96, keterangan: 'LULUS', penguji: 'INSTRUKTUR', ka: 330 },
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
        wad: [ { no: 1, tanggal: '10/06/2025', dasar: 'WAD.10/VI/25-DAOP2', keterangan: 'Perubahan Gapeka Parsial Mulai 12 Juni 2025' } ]
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
        content: `<div class="bg-white p-6 rounded-lg shadow"><div class="border-b border-gray-200"><nav id="struktur-tabs" class="-mb-px flex space-x-8" aria-label="Tabs"><button onclick="switchTab('struktur', 'upt')" class="tab-button active whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">UPT Crew KA Kelas C Purwakarta</button><button onclick="switchTab('struktur', 'daop2')" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">DAERAH OPERASI 2 BANDUNG</button><button onclick="switchTab('struktur', 'pusat')" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">DIREKTORAT OPERASI</button></nav></div><div class="mt-6"><div id="upt-content" class="tab-content active p-4"><h3 class="text-xl font-bold text-[#0D2B4F] mb-4 text-center">Struktur Organisasi UPT Crew KA Kelas C Purwakarta</h3><img src="https://www.dropbox.com/scl/fi/dpaeklr9t96m257ut6reo/UPT-CREW.png?rlkey=xhn1anq4dduxuap8ynz3die7u&st=2moepz5t&dl=1" alt="Bagan Struktur Organisasi UPT Crew KA Purwakarta" class="w-full h-auto rounded-lg shadow-md object-contain mx-auto" onerror="this.onerror=null;this.src='https://placehold.co/1200x800/E0E7FF/0D2B4F?text=Gagal+Memuat+Bagan+UPT';"></div><div id="daop2-content" class="tab-content p-4"><h3 class="text-xl font-bold text-[#0D2B4F] mb-4 text-center">Struktur Organisasi Operasi DAOP 2 Bandung</h3><img src="https://www.dropbox.com/scl/fi/j658tpmrxjst12ni7p05w/DAOP.png?rlkey=3iwole5l971t2uuxidvs5m30f&st=zuatdhyu&dl=1" alt="Bagan Struktur Organisasi DAOP 2 Bandung" class="w-full h-auto rounded-lg shadow-md object-contain mx-auto" onerror="this.onerror=null;this.src='https://placehold.co/1200x800/E0E7FF/0D2B4F?text=Gagal+Memuat+Bagan+DAOP+2';"></div><div id="pusat-content" class="tab-content p-4"><h3 class="text-xl font-bold text-[#0D2B4F] mb-4 text-center">Struktur Organisasi Train Crew Operation</h3><img src="https://www.dropbox.com/scl/fi/cuhmqm6bgvckel9pmn7fc/PUSAT.png?rlkey=4sza7i77ehcgo1mk3htyw4ufx&st=vp29t2wf&dl=1" alt="Bagan Struktur Organisasi Direktorat Operasi" class="w-full h-auto rounded-lg shadow-md object-contain mx-auto" onerror="this.onerror=null;this.src='https://placehold.co/1200x800/E0E7FF/0D2B4F?text=Gagal+Memuat+Bagan+Pusat';"></div></div></div>`
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
            throw new Error(`Gagal unggah data: ${errorText}`);
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
            throw new Error(`Gagal unduh data: ${errorText}`);
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
    statusEl.classList.remove('bg-green-500', 'bg-red-500', 'bg-gray-400');
    if (isConnected) {
        statusEl.classList.add('bg-green-500');
    } else {
        statusEl.classList.add('bg-red-500');
    }
}

// --- LOGIKA UTAMA APLIKASI ---
document.addEventListener('DOMContentLoaded', async function() {
    const contentArea = document.getElementById('content-area');
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
        sectionEl.className = 'content-section';
        if (sections[key].content) {
            sectionEl.innerHTML = sections[key].content;
        }
        contentArea.appendChild(sectionEl);
    }
    setupCoreListeners();
    // Set initial section based on hash or default to dashboard
    const initialHash = window.location.hash || '#dashboard';
    showSection(initialHash);
    // Update sidebar to reflect the initial state
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === initialHash);
    });
    
    window.addEventListener('popstate', () => showSection(window.location.hash));
    updateClock();
    setInterval(updateClock, 1000);
});


window.addEventListener('beforeunload', () => {
    // This logic is mostly handled by the final save, but can be a fallback
    if (isEditMode) {
        console.log('Menyimpan data sebelum menutup halaman...');
        saveTemporaryChanges(); // Use the temporary save function
        localStorage.setItem('appData', JSON.stringify(appData));
        // Note: Asynchronous upload might not complete before page closes.
        // The main "Simpan & Keluar" button is more reliable for remote saving.
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
    document.getElementById('sidebar-nav').addEventListener('click', handleNavigation);
    document.getElementById('settings-button').addEventListener('click', handleSettingsClick);
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('cancel-login').addEventListener('click', () => document.getElementById('login-modal').classList.add('hidden'));
}

/**
 * [BARU] Fungsi untuk menyimpan perubahan sementara dari input fields ke appData.
 * Ini dipanggil sebelum setiap render ulang dalam mode edit.
 */
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
    // [DIPERBAIKI] Pastikan activeSectionForEdit adalah seksi yang sedang dilihat
    activeSectionForEdit = document.querySelector('.content-section.active').id;
    const pageTitle = sections[activeSectionForEdit].title;
    document.getElementById('login-edit-message').textContent = `Anda akan mengedit halaman: ${pageTitle}`;
    document.getElementById('login-modal').classList.remove('hidden');
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
    if (!link || link.getAttribute('href') === '#') return;
    
    // Pindah ke seksi baru, URL hash akan berubah dan event 'popstate' atau
    // pemanggilan langsung 'showSection' akan menanganinya.
    // Jika tidak menggunakan hash-based routing, panggil showSection di sini.
    // Untuk kode ini, hash change sudah cukup.
}

function enterEditMode() {
    isEditMode = true;
    document.getElementById('app-container').classList.add('edit-mode');
    document.getElementById('settings-button').innerHTML = `<i class="fas fa-save fa-fw"></i><span>Simpan & Keluar</span>`;
    showCustomAlert(`Mode edit untuk "${sections[activeSectionForEdit].title}" aktif.`, 'success');
    rerenderCurrentSection();
}

function exitEditMode() {
    if (!isEditMode) return;
    
    // [DIPERBAIKI] Panggil saveTemporaryChanges() sebagai langkah final untuk
    // memastikan semua input terakhir tersimpan sebelum keluar.
    saveTemporaryChanges();

    try {
        localStorage.setItem('appData', JSON.stringify(appData));
        console.log('Data berhasil disimpan ke Local Storage.');

        uploadDataSecurely(appData)
            .then(() => {
                showCustomAlert('Data berhasil disimpan dan disinkronkan dengan aman.', 'success');
                updateConnectionStatus(true, 'Terhubung & Sinkron');
            })
            .catch(error => {
                console.error('Gagal sinkronisasi data:', error);
                showCustomAlert(`Gagal sinkronisasi data: ${error.message}. Perubahan hanya tersimpan lokal.`, 'error');
                updateConnectionStatus(false, 'Gagal Sinkronisasi');
            });
    } catch (error) {
        console.error("Terjadi error saat menyimpan perubahan:", error);
        showCustomAlert(`Error Kritis: Gagal menyimpan data. Periksa console untuk detail.`, 'error');
        return;
    }
    
    isEditMode = false;
    document.getElementById('app-container').classList.remove('edit-mode');
    document.getElementById('settings-button').innerHTML = `<i class="fas fa-cog fa-fw"></i><span>Pengaturan</span>`;
    rerenderCurrentSection();
}


function showSection(hash) {
    // [DIPERBAIKI] Simpan perubahan dari seksi sebelumnya jika dalam mode edit
    if (isEditMode) {
        saveTemporaryChanges();
    }

    const targetHash = hash || '#dashboard';
    const targetKey = targetHash.substring(1);

    // [DIPERBAIKI] Set activeSectionForEdit ke seksi yang baru SEBELUM render ulang
    // Ini penting agar saveTemporaryChanges berikutnya tahu seksi mana yang harus disimpan.
    activeSectionForEdit = targetKey;

    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === targetHash);
    });
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    const activeSectionEl = document.getElementById(targetKey);
    if (activeSectionEl) {
        activeSectionEl.style.display = 'block';
        activeSectionEl.classList.add('active');
    }
    document.getElementById('page-title').textContent = sections[targetKey]?.title || 'Dasbor';
    
    // Render konten untuk seksi yang baru diaktifkan
    rerenderCurrentSection();
}


function rerenderCurrentSection() {
    const activeSectionId = document.querySelector('.content-section.active')?.id;
    if (!activeSectionId) return;
    const renderFunction = window[`render_${activeSectionId.replace(/-/g, '_')}`];
    if (typeof renderFunction === 'function') {
        renderFunction();
    } else if (!sections[activeSectionId].content) {
        document.getElementById(activeSectionId).innerHTML = `<div class="text-center p-10 text-gray-500">Konten untuk halaman ini belum tersedia.</div>`;
    }
}

function switchTab(group, tabId) {
    const container = document.querySelector('.content-section.active');
    const tabContainer = container.querySelector(`#${group}-tabs`);
    if (!tabContainer) return;
    tabContainer.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    tabContainer.querySelector(`[onclick*="'${tabId}'"]`).classList.add('active');
    const contentContainer = tabContainer.parentElement.nextElementSibling;
    contentContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    contentContainer.querySelector(`#${tabId}-content`).classList.add('active');
}

function calculateAwakKADinas() {
    const jadwal = appData.jadwalHariIni;
    let awakCount = 0;
    let pasanganCount = 0;

    if (!jadwal) return { total: 0, pasangan: 0 };

    const manajemenNipps = appData.pegawai
        .filter(p => {
            const jabatan = p.jabatan.toUpperCase();
            return jabatan === 'PENYELIA INSTRUKTUR' || jabatan === 'PENYELIA DINASAN';
        })
        .map(p => p.nipp);

    const isAwakKA = (nipp) => nipp && !manajemenNipps.includes(nipp);

    const processRow = (row) => {
        const masinisIsAwak = isAwakKA(row.nipp_mas);
        const asistenIsAwak = isAwakKA(row.nipp_as);
        
        if (masinisIsAwak) awakCount++;
        if (asistenIsAwak) awakCount++;

        if (masinisIsAwak || asistenIsAwak) {
            pasanganCount++;
        }
    };

    if (jadwal.reguler && Array.isArray(jadwal.reguler)) {
        jadwal.reguler.forEach(row => {
            const noKa = (row.nomor_ka || '').toUpperCase();
            if (noKa !== '' && !noKa.includes('LIBUR') && !noKa.includes('SEREP')) {
                processRow(row);
            }
        });
    }

    if (jadwal.klb && Array.isArray(jadwal.klb)) {
        jadwal.klb.forEach(row => {
            if (row.nomor_ka) {
                processRow(row);
            }
        });
    }

    return { total: awakCount, pasangan: pasanganCount };
}

function searchTable(tableId) {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById(tableId);
    const tr = table.getElementsByTagName('tr');
    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td');
        let textValue = "";
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                textValue += td[j].textContent || td[j].innerText;
            }
        }
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
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

function loadDataFromStorage() {
    const savedDataString = localStorage.getItem('appData');
    if (savedDataString) {
        try {
            const savedData = JSON.parse(savedDataString);
            const deepMerge = (target, source) => {
                for (const key in source) {
                    if (source.hasOwnProperty(key)) {
                        if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
                            deepMerge(target[key], source[key]);
                        } else {
                            target[key] = source[key];
                        }
                    }
                }
                return target;
            }
            appData = deepMerge(appData, savedData);
            console.log("Data loaded and DEEP MERGED from Local Storage.");
        } catch (error) {
            console.error("Gagal memuat data dari Local Storage, data mungkin korup. Menggunakan data default.", error);
            localStorage.removeItem('appData');
        }
    }
}

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
        schedule.reguler = [];
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
    if (dayDifference === 1) {
        console.log("Rotasi jadwal normal terdeteksi.");
        appData.jadwalHariIni = JSON.parse(JSON.stringify(appData.jadwalBesok));
        clearScheduleData(appData.jadwalBesok);
    } else if (dayDifference > 1) {
        console.log("Data jadwal basi terdeteksi. Mengosongkan kedua jadwal.");
        clearScheduleData(appData.jadwalHariIni);
        clearScheduleData(appData.jadwalBesok);
    } else {
        return;
    }
    localStorage.setItem('lastVisitDate', today.toISOString());
    localStorage.setItem('appData', JSON.stringify(appData));
    uploadDataSecurely(appData).catch(err => console.error("Gagal sinkronisasi otomatis setelah rotasi:", err));
}

function addTableRow(dataKey, subKey = null, thirdKey = null) {
    // [DIPERBAIKI] Simpan data yang ada di tabel sebelum menambahkan baris baru
    saveTemporaryChanges();

    let targetArray;
    let newObject = {};
    let prototypeObject = null;
    if (subKey) {
        if (thirdKey && thirdKey !== 'null') { targetArray = appData[dataKey][subKey][thirdKey]; }
        else { targetArray = appData[dataKey][subKey]; }
    } else { targetArray = appData[dataKey]; }
    if (targetArray && Array.isArray(targetArray) && targetArray.length > 0) {
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
    if (targetArray && Array.isArray(targetArray) && Object.keys(newObject).length > 0) {
        targetArray.push(newObject);
        rerenderCurrentSection();
    } else if (Object.keys(newObject).length > 0) {
        if (subKey) {
            if (thirdKey && thirdKey !== 'null') {
                if (!appData[dataKey]) appData[dataKey] = {};
                if (!appData[dataKey][subKey]) appData[dataKey][subKey] = {};
                appData[dataKey][subKey][thirdKey] = [newObject];
            } else {
                if (!appData[dataKey]) appData[dataKey] = {};
                appData[dataKey][subKey] = [newObject];
            }
        } else { appData[dataKey] = [newObject]; }
        rerenderCurrentSection();
    }
}

function deleteTableRow(dataKey, index, subKey = null, thirdKey = null) {
    // [DIPERBAIKI] Simpan data yang ada di tabel sebelum menghapus baris
    saveTemporaryChanges();

    let targetArray;
    if (subKey) {
        if (thirdKey && thirdKey !== 'null') { targetArray = appData[dataKey][subKey][thirdKey]; } 
        else { targetArray = appData[dataKey][subKey]; }
    } else { targetArray = appData[dataKey]; }
    if (targetArray && Array.isArray(targetArray)) {
        targetArray.splice(index, 1);
        rerenderCurrentSection();
        showCustomAlert('Baris telah dihapus. Perubahan akan disimpan saat keluar mode edit.', 'success');
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

// --- RENDER DAN SAVE FUNCTIONS (TIDAK ADA PERUBAHAN DI DALAM FUNGSI-FUNGSI INI) ---

function calculateKeteranganDinasan() {
    const jadwal = appData.jadwalHariIni;
    const result = {
        dinasanReguler: 0,
        dinasanKlb: 0,
        libur: 0,
        serep: 0,
        cutiTahunan: 0,
        cutiPenting: 0,
        cutiSakit: 0,
        diklap: 0,
        pembinaan: 0,
        sertifikasi: 0,
        manajemenInstrukturDinas: 0,
        manajemenPenyeliaDinas: 0,
    };

    if (!jadwal) return result;

    const penyeliaInstrukturNipps = appData.pegawai
        .filter(p => p.jabatan.toUpperCase() === 'PENYELIA INSTRUKTUR')
        .map(p => p.nipp);
    const penyeliaDinasanNipps = appData.pegawai
        .filter(p => p.jabatan.toUpperCase() === 'PENYELIA DINASAN')
        .map(p => p.nipp);

    const checkManajemenDinas = (row) => {
        if (row.nipp_mas) {
            if (penyeliaInstrukturNipps.includes(row.nipp_mas)) result.manajemenInstrukturDinas++;
            if (penyeliaDinasanNipps.includes(row.nipp_mas)) result.manajemenPenyeliaDinas++;
        }
        if (row.nipp_as) {
            if (penyeliaInstrukturNipps.includes(row.nipp_as)) result.manajemenInstrukturDinas++;
            if (penyeliaDinasanNipps.includes(row.nipp_as)) result.manajemenPenyeliaDinas++;
        }
    };

    // Dinasan Reguler, Libur, Serep
    if (jadwal.reguler && Array.isArray(jadwal.reguler)) {
        jadwal.reguler.forEach(row => {
            const noKa = (row.nomor_ka || '').toUpperCase();
            let count = 0;
            if (row.nipp_mas) count++;
            if (row.nipp_as) count++;

            if (count > 0) {
                if (noKa.includes('LIBUR')) {
                    result.libur += count;
                } else if (noKa.includes('SEREP')) {
                    result.serep += count;
                } else if (noKa !== '') {
                    result.dinasanReguler += count;
                    checkManajemenDinas(row);
                }
            }
        });
    }

    // Dinasan KLB
    if (jadwal.klb && Array.isArray(jadwal.klb)) {
        jadwal.klb.forEach(row => {
            if (row.nomor_ka) {
                let count = 0;
                if (row.nipp_mas) count++;
                if (row.nipp_as) count++;
                result.dinasanKlb += count;

                if(count > 0) {
                    checkManajemenDinas(row);
                }
            }
        });
    }

    // Lain-lain
    if (jadwal.cuti && Array.isArray(jadwal.cuti)) {
        jadwal.cuti.forEach(row => {
            if (row.cuti) {
                const lines = row.cuti.split('\n').filter(line => line.trim() !== '');
                lines.forEach(line => {
                    if (line.toUpperCase().includes('/ CT')) result.cutiTahunan++;
                    if (line.toUpperCase().includes('/ CP')) result.cutiPenting++;
                });
            }
            if (row.csk) {
                result.cutiSakit += row.csk.split('\n').filter(line => line.trim() !== '').length;
            }
            if (row.diklap) {
                result.diklap += row.diklap.split('\n').filter(line => line.trim() !== '').length;
            }
            if (row.pembinaan) {
                result.pembinaan += row.pembinaan.split('\n').filter(line => line.trim() !== '').length;
            }
            if (row.sertifikasi) {
                result.sertifikasi += row.sertifikasi.split('\n').filter(line => line.trim() !== '').length;
            }
        });
    }

    return result;
}


function render_dashboard() {
    const contentEl = document.getElementById('dashboard');
    const dinasInfo = calculateAwakKADinas();
    const jumlahAwakDinas = dinasInfo.total;
    
    // Get management counts, also needed for the KPI cards.
    const keterangan = calculateKeteranganDinasan();
    const manajemenDinas = keterangan.manajemenInstrukturDinas + keterangan.manajemenPenyeliaDinas;
    const totalOrangBertugas = jumlahAwakDinas + manajemenDinas;

    // Redefined the KPI cards with the new logic and additional card.
    // The grid is changed to 'lg:grid-cols-5' to accommodate the new card.
    let kpiCardsHtml = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div class="kpi-card bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-500 text-sm font-medium">Total Pegawai</h3>
            <p class="text-3xl font-bold text-gray-800">24</p>
            <p class="text-green-500 text-xs mt-1">Data Terpenuhi</p>
        </div>
        <div class="kpi-card bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-500 text-sm font-medium">Awak KA Dinas Hari Ini</h3>
            <p class="text-3xl font-bold text-gray-800">${jumlahAwakDinas}</p>
            <p class="text-gray-500 text-xs mt-1">${totalOrangBertugas} Total Orang Bertugas</p>
        </div>
        <div class="kpi-card bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-500 text-sm font-medium">Manajemen Dinas KA</h3>
            <p class="text-3xl font-bold text-gray-800">${manajemenDinas}</p>
            <p class="text-blue-500 text-xs mt-1">Penyelia/Instruktur dinas</p>
        </div>
        <div class="kpi-card bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-500 text-sm font-medium">Sertifikasi Segera Habis</h3>
            <p class="text-3xl font-bold text-gray-800">6</p>
            <p class="text-yellow-500 text-xs mt-1">Dalam 1 tahun ke depan</p>
        </div>
        <div class="kpi-card bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-500 text-sm font-medium">Insiden Bulan Ini</h3>
            <p class="text-3xl font-bold text-gray-800">0</p>
            <p class="text-green-500 text-xs mt-1">Target Zero Accident</p>
        </div>
    </div>`;
    
    let keteranganHtml = `
    <div class="bg-white p-6 rounded-xl shadow-lg">
        <h4 class="text-lg font-bold text-center text-[#0D2B4F] mb-4">KETERANGAN DINASAN HARI INI</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
            <div class="space-y-4">
                <div>
                    <h5 class="font-bold text-gray-800 border-b pb-1 mb-2">MANAJEMEN DINAS KA</h5>
                    <p class="flex justify-between"><span>Penyelia Instruktur</span> <span class="font-bold">${keterangan.manajemenInstrukturDinas}</span></p>
                    <p class="flex justify-between"><span>Penyelia Dinasan</span> <span class="font-bold">${keterangan.manajemenPenyeliaDinas}</span></p>
                </div>
                 <div>
                    <h5 class="font-bold text-gray-800 border-b pb-1 mb-2">ASP DINAS KA</h5>
                    <p class="flex justify-between"><span>REGULER</span> <span class="font-bold">${keterangan.dinasanReguler}</span></p>
                    <p class="flex justify-between"><span>KLB</span> <span class="font-bold">${keterangan.dinasanKlb}</span></p>
                </div>
            </div>
            <div class="space-y-2">
                <h5 class="font-bold text-gray-800 border-b pb-1 mb-2">SEREP / LIBUR</h5>
                <p class="flex justify-between"><span>LIBUR</span> <span class="font-bold">${keterangan.libur}</span></p>
                <p class="flex justify-between"><span>SEREP</span> <span class="font-bold">${keterangan.serep}</span></p>
            </div>
            <div class="space-y-2">
                <h5 class="font-bold text-gray-800 border-b pb-1 mb-2">LAIN-LAIN</h5>
                <p class="flex justify-between"><span>CUTI TAHUNAN (CT)</span> <span class="font-bold">${keterangan.cutiTahunan}</span></p>
                <p class="flex justify-between"><span>CUTI PENTING (CP)</span> <span class="font-bold">${keterangan.cutiPenting}</span></p>
                <p class="flex justify-between"><span>CUTI SAKIT (CSK)</span> <span class="font-bold">${keterangan.cutiSakit}</span></p>
                <p class="flex justify-between"><span>DIKLAT</span> <span class="font-bold">${keterangan.diklap}</span></p>
                <p class="flex justify-between"><span>PEMBINAAN</span> <span class="font-bold">${keterangan.pembinaan}</span></p>
                <p class="flex justify-between"><span>SERTIFIKASI</span> <span class="font-bold">${keterangan.sertifikasi}</span></p>
            </div>
        </div>
    </div>`;

    let mainContentHtml = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div class="lg:col-span-2 space-y-6">
            <div class="bg-white p-8 rounded-xl shadow-lg"><div class="grid grid-cols-1 md:grid-cols-5 gap-8"><div class="md:col-span-2 md:border-r md:pr-8 border-gray-200"><h4 class="text-2xl font-bold text-[#F28500] mb-4">VISI</h4><p class="text-xl font-medium text-gray-800 leading-relaxed">Menggerakkan transportasi berkelanjutan, meningkatkan kualitas hidup masyarakat.</p><p class="text-md italic text-gray-500 mt-2">Driving Sustainable Transportation, Enhancing People's Lives.</p></div><div class="md:col-span-3"><h4 class="text-2xl font-bold text-[#0D2B4F] mb-4">MISI</h4><ul class="space-y-4"><li class="flex items-start"><i class="fas fa-check-circle text-lg text-green-500 mr-3 mt-1 flex-shrink-0"></i><div><p class="text-gray-700">Menyediakan jasa yang mengedepankan keselamatan, ketepatan waktu dan kenyamanan.</p><em class="text-gray-500 text-sm">Providing services that prioritize safety, punctuality and comfort.</em></div></li><li class="flex items-start"><i class="fas fa-check-circle text-lg text-green-500 mr-3 mt-1 flex-shrink-0"></i><div><p class="text-gray-700">Mengembangkan sumber daya dan teknologi dengan mengedepankan ESG.</p><em class="text-gray-500 text-sm">Develop resources and technology by prioritizing ESG.</em></div></li><li class="flex items-start"><i class="fas fa-check-circle text-lg text-green-500 mr-3 mt-1 flex-shrink-0"></i><div><p class="text-gray-700">Berperan aktif dalam pengembangan transportasi antarmoda berkelanjutan bersama pemangku kepentingan.</p><em class="text-gray-500 text-sm">Play an active role in the development of sustainable intermodal transport with stakeholders.</em></div></li></ul></div></div></div>
            ${keteranganHtml}
        </div>

        <div class="space-y-6">
            <div class="bg-white p-4 rounded-lg shadow"><h3 class="font-bold text-lg text-center mb-4">Komposisi Pegawai</h3><div class="h-64 flex justify-center items-center"><canvas id="pegawaiChart"></canvas></div><div id="pegawaiChart-legend" class="mt-4 px-4"></div></div>
            <div class="bg-white p-6 rounded-lg shadow" id="best-employee-container"></div>
        </div>
    </div>`;

    let akhlakHtml = `<div class="mt-6 bg-white p-6 rounded-lg shadow"><h4 class="text-lg font-bold text-center text-[#0D2B4F] mb-4">Nilai-Nilai Utama (AKHLAK)</h4><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center"><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">A</p><p class="font-semibold text-sm">Amanah</p><p class="text-xs text-gray-600 mt-1">Memegang teguh kepercayaan yang diberikan</p></div><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">K</p><p class="font-semibold text-sm">Kompeten</p><p class="text-xs text-gray-600 mt-1">Terus belajar dan mengembangkan kapabilitas</p></div><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">H</p><p class="font-semibold text-sm">Harmonis</p><p class="text-xs text-gray-600 mt-1">Saling peduli dan menghargai perbedaan</p></div><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">L</p><p class="font-semibold text-sm">Loyal</p><p class="text-xs text-gray-600 mt-1">Berdedikasi dan mengutamakan kepentingan Bangsa dan Negara</p></div><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">A</p><p class="font-semibold text-sm">Adaptif</p><p class="text-xs text-gray-600 mt-1">Terus berinovasi dan antusias dalam menggerakkan ataupun menghadapi perubahan</p></div><div class="p-4 rounded-lg bg-blue-50 border border-blue-200"><p class="text-2xl font-bold text-[#0D2B4F]">K</p><p class="font-semibold text-sm">Kolaboratif</p><p class="text-xs text-gray-600 mt-1">Membangun kerja sama yang sinergis</p></div></div></div>`;
    
    contentEl.innerHTML = kpiCardsHtml + mainContentHtml + akhlakHtml;
    
    const best = appData.pageData.dashboard.bestEmployee;
    let bestEmployeeHtml;
    if (isEditMode) {
        bestEmployeeHtml = `<div class="flex flex-col items-center space-y-2"><img src="${best.foto}" alt="Awak KA Terbaik" class="rounded-full border-4 border-white shadow-lg w-24 h-24 object-cover"><input type="text" id="edit-best-foto" class="edit-input text-center" placeholder="URL Foto Baru" value="${best.foto}"><div class="text-center"><input type="text" id="edit-best-nama" class="edit-input text-center font-bold" value="${best.nama}"><input type="text" id="edit-best-nipp" class="edit-input text-center mt-1" value="${best.nipp}"></div></div>`;
    } else {
        bestEmployeeHtml = `<div class="flex flex-col items-center space-y-2"><img src="${best.foto}" alt="Awak KA Terbaik" class="rounded-full border-4 border-white shadow-lg w-24 h-24 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/96x96/E0E7FF/0D2B4F?text=Gagal+Muat';"><div class="text-center"><h4 class="text-lg font-bold text-[#0D2B4F]">${best.nama}</h4><p class="text-sm text-gray-600">NIPP. ${best.nipp}</p></div></div>`;
    }
    document.getElementById('best-employee-container').innerHTML = `<h3 class="font-bold text-lg mb-2 text-center">Awak KA Terbaik</h3>${bestEmployeeHtml}`;
    if (typeof Chart !== 'undefined') { createDashboardCharts(); }
}

function saveChanges_dashboard() {
    const safeUpdate = (id, callback) => { const element = document.getElementById(id); if (element) callback(element.value); };
    safeUpdate('edit-best-nama', value => appData.pageData.dashboard.bestEmployee.nama = value);
    safeUpdate('edit-best-nipp', value => appData.pageData.dashboard.bestEmployee.nipp = value);
    safeUpdate('edit-best-foto', value => appData.pageData.dashboard.bestEmployee.foto = value);
}

function render_tupoksi() {
    const contentEl = document.getElementById('tupoksi');
    const { kupt, instruktur, penyelia } = appData.pageData.tupoksi;
    const createPersonCard = (person, idPrefix) => {
        if (isEditMode) { return `<div class="text-center flex-shrink-0"><img src="${person.foto}" class="rounded-lg mx-auto shadow-md" style="width:150px; height:180px; object-fit:cover;"><input type="text" id="${idPrefix}-foto" class="edit-input mt-2" placeholder="URL Foto" value="${person.foto}"><input type="text" id="${idPrefix}-nama" class="edit-input mt-2 font-bold text-center" value="${person.nama}"><input type="text" id="${idPrefix}-nipp" class="edit-input mt-1 text-center" value="${person.nipp}"></div>`; }
        return `<div class="text-center flex-shrink-0"><img src="${person.foto}" class="rounded-lg mx-auto shadow-md" alt="Foto ${person.nama}" style="width:150px; height:180px; object-fit:cover;"><h4 class="mt-3 font-bold text-base">${person.nama}</h4><p class="text-sm text-gray-500">NIPP ${person.nipp}</p></div>`;
    };
    const createPenyeliaGrid = () => {
        return penyelia.map((p, index) => {
            if (isEditMode) { return `<div class="text-center"><img src="${p.foto}" class="rounded-lg mx-auto mb-2" style="width:100px; height:120px; object-fit:cover;"><input type="text" id="penyelia-${index}-foto" class="edit-input" placeholder="URL Foto" value="${p.foto}"><input type="text" id="penyelia-${index}-nama" class="edit-input mt-1 text-center font-semibold" value="${p.nama}"><input type="text" id="penyelia-${index}-nipp" class="edit-input mt-1 text-center" value="${p.nipp}"></div>`; }
            return `<div class="text-center"><img src="${p.foto}" class="rounded-lg mx-auto mb-2" alt="Foto ${p.nama}" style="width:100px; height:120px; object-fit:cover;"><p class="font-semibold text-sm">${p.nama}</p><p class="text-xs text-gray-500">NIPP ${p.nipp}</p></div>`;
        }).join('');
    };
    contentEl.innerHTML = `<div class="space-y-6"><div class="bg-white p-6 rounded-lg shadow"><h3 class="text-xl font-bold text-[#0D2B4F] text-center mb-4">Kepala UPT (KUPT)</h3><div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">${createPersonCard(kupt, 'kupt')}<div class="w-full"><p class="text-gray-800 mb-2 font-semibold">Tugas Pokok & Tanggung Jawab:</p><ul class="list-disc list-inside text-sm text-gray-700 space-y-2 leading-relaxed"><li>Menyusun program kerja, evaluasi, serta laporan realisasi program kerja.</li><li>Merencanakan dan mengevaluasi jumlah dan dinasan Awak KA.</li><li>Meningkatkan kompetensi teknis dan kompetensi Awak KA.</li><li>Mengevaluasi dan melakukan penilaian kinerja Wakil KUPT Crew KA, Penyelia dan Awak KA.</li><li>Mengelola resiko dan menjamin keselamatan sesuai di bidang yang dikelola.</li><li>Menyusun, mengusulkan dan memantau program pengembangan pelatihan dan atau sertifikasi serta kecakapan Awak KA.</li></ul></div></div></div><div class="bg-white p-6 rounded-lg shadow"><h3 class="text-xl font-bold text-[#0D2B4F] text-center mb-4">Penyelia Instruktur</h3><div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">${createPersonCard(instruktur, 'instruktur')}<div class="w-full"><p class="text-gray-800 mb-2 font-semibold">Tugas Pokok & Tanggung Jawab:</p><ul class="list-disc list-inside text-sm text-gray-700 space-y-2 leading-relaxed"><li>Melakukan pembinaan dan pelatihan tentang regulasi dan teknik menjalankan KA dan langsiran.</li><li>Memberikan penilaian dan evaluasi kepada Awak KA binaannya.</li><li>Melakukan Running minimal 4 (empat) kali dalam satu bulan sebagai bentuk pembinaan, pelatihan, dan pengawasan di lapangan.</li></ul></div></div></div><div class="bg-white p-6 rounded-lg shadow"><h3 class="text-xl font-bold text-[#0D2B4F] text-center mb-4">Penyelia Dinasan</h3><div class="w-full"><p class="text-gray-800 mb-2 font-semibold">Tugas Pokok & Tanggung Jawab:</p><ul class="list-disc list-inside text-sm text-gray-700 mb-6 space-y-2 leading-relaxed"><li>Membuat, mengatur dan menyiapkan dinasan Masinis/Asisten Masinis termasuk input data dinasan Awak KA ke dalam sistem Pranopka.</li><li>Melakukan Assesment Pra Dinas.</li><li>Melakukan pemeriksaan bentuk dan kelengkapan perjalanan dinas.</li><li>Memvalidasi akhir dinasan serta melakukan pemantauan situasi operasi kereta api dan langsiran.</li></ul></div><div class="w-full"><p class="text-gray-800 mb-3 font-semibold text-center">Tim Penyelia Dinasan</p><div class="grid grid-cols-2 md:grid-cols-4 gap-4">${createPenyeliaGrid()}</div></div></div></div>`;
}

function saveChanges_tupoksi() {
    const { kupt, instruktur, penyelia } = appData.pageData.tupoksi;
    const safeUpdate = (id, callback) => { const element = document.getElementById(id); if (element) callback(element.value); };
    safeUpdate('kupt-nama', value => kupt.nama = value);
    safeUpdate('kupt-nipp', value => kupt.nipp = value);
    safeUpdate('kupt-foto', value => kupt.foto = value);
    safeUpdate('instruktur-nama', value => instruktur.nama = value);
    safeUpdate('instruktur-nipp', value => instruktur.nipp = value);
    safeUpdate('instruktur-foto', value => instruktur.foto = value);
    penyelia.forEach((p, index) => {
        safeUpdate(`penyelia-${index}-nama`, value => p.nama = value);
        safeUpdate(`penyelia-${index}-nipp`, value => p.nipp = value);
        safeUpdate(`penyelia-${index}-foto`, value => p.foto = value);
    });
}

function render_jadwal() {
    const contentEl = document.getElementById('jadwal');
    if (!contentEl.innerHTML.includes('jadwal-tabs')) {
        contentEl.innerHTML = `<div class="bg-white p-6 rounded-lg shadow"><div class="border-b border-gray-200"><nav id="jadwal-tabs" class="-mb-px flex space-x-8" aria-label="Tabs"><button onclick="switchTab('jadwal', 'hari-ini')" class="tab-button active whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Dinasan Hari Ini</button><button onclick="switchTab('jadwal', 'besok')" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Dinasan Besok</button></nav></div><div class="mt-6"><div id="hari-ini-content" class="tab-content active"></div><div id="besok-content" class="tab-content"></div></div></div>`;
    }
    const locale = 'id-ID', today = new Date(), tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const formatDate = (date) => `HARI : ${date.toLocaleDateString(locale, { weekday: 'long' }).toUpperCase()}       TANGGAL : ${date.toLocaleDateString(locale, { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}`;
    const createTabContent = (scheduleData, dayType, date) => {
        const regulerCols = [ {key: 'no', label: 'No'}, {key: 'kode', label: 'Kode'}, {key: 'nomor_ka', label: 'Nomor KA'}, {key: 'lintas', label: 'Lintas'}, {key: 'mulai', label: 'Mulai'}, {key: 'habis', label: 'Habis'}, {key: 'masinis', label: 'Masinis'}, {key: 'nipp_mas', label: 'NIPP'}, {key: 'asisten', label: 'Asisten'}, {key: 'nipp_as', label: 'NIPP'} ];
        const klbCols = [ {key: 'no', label: 'No'}, {key: 'nomor_ka', label: 'Nomor KA'}, {key: 'lintas', label: 'Lintas'}, {key: 'mulai', label: 'Mulai'}, {key: 'habis', label: 'Habis'}, {key: 'masinis', label: 'Masinis'}, {key: 'nipp_mas', label: 'NIPP'}, {key: 'asisten', label: 'Asisten'}, {key: 'nipp_as', label: 'NIPP'} ];
        const cutiCols = [ {key: 'diklap', label: 'Diklap/Diklat'}, {key: 'cuti', label: 'Cuti'}, {key: 'csk', label: 'CSK'}, {key: 'pembinaan', label: 'Pembinaan'}, {key: 'sertifikasi', label: 'Sertifikasi'} ];
        let catatanHtml = isEditMode ? `<textarea id="edit-catatan-${dayType}" class="edit-textarea w-full">${scheduleData.catatanPenting || ''}</textarea>` : `<div class="p-4 border text-red-600 font-semibold">${scheduleData.catatanPenting || '-'}</div>`;
        const kupt = appData.pegawai.find(p => p.jabatan === 'KUPT') || {};
        const signaturePenyeliaHtml = [1, 2, 3].map(i => {
            const penyeliaData = (scheduleData && scheduleData.penyelia) ? scheduleData.penyelia['dinas' + i] : { nama: '', nipp: '' };
            const nama = penyeliaData.nama || '', nipp = penyeliaData.nipp || '';
            const editModeHtml = `<input id="edit-penyelia${i}-nama-${dayType}" class="edit-input text-center font-bold" value="${nama}"><input id="edit-penyelia${i}-nipp-${dayType}" class="edit-input text-center mt-1" value="${nipp}">`;
            const viewModeHtml = `<p class="font-bold underline">${nama}</p><p>NIPP. ${nipp}</p>`;
            return `<div><p>Penyelia Dinas ${i}</p><div class="h-16"></div>${isEditMode ? editModeHtml : viewModeHtml}</div>`;
        }).join('');
        let signatureHtml = `<div class="mt-8 pt-4"><div class="grid grid-cols-4 gap-4 text-sm text-center items-end">${signaturePenyeliaHtml}<div><p>Mengetahui,</p><p>KUPT CREW KA PWK</p><div class="h-16"></div><p class="font-bold underline">${kupt.nama}</p><p>NIPP. ${kupt.nipp}</p></div></div></div>`;
        return `<div class="page-sticky-header text-center"><h2 class="text-lg font-bold text-[#0D2B4F]">JADWAL DINASAN AWAK KA UPT CREW KA PURWAKARTA</h2><p class="text-base font-semibold text-gray-700">${date}</p></div><div>${createScheduleTableComponent('DINASAN REGULER', scheduleData.reguler, regulerCols, dayType, 'reguler')}${createScheduleTableComponent('DINASAN KLB', scheduleData.klb, klbCols, dayType, 'klb')}${createScheduleTableComponent('LAIN - LAIN', scheduleData.cuti, cutiCols, dayType, 'cuti')}<div class="table-wrapper"><h3 class="font-bold text-center text-white bg-[#0D2B4F] p-2">CATATAN PENTING</h3>${catatanHtml}</div>${signatureHtml}</div>`;
    };
    const createScheduleTableComponent = (title, data, columns, dayType, subKey) => {
        const tableData = Array.isArray(data) ? data : [];
        let header = columns.map(c => `<th class="p-2 border">${c.label}</th>`).join('');
        if (isEditMode) header += `<th class="p-2 border">Aksi</th>`;
        let body = tableData.map((row, index) => {
            let cells = columns.map(c => {
                const value = row[c.key] || '';
                return isEditMode ? `<td class="p-1 border"><input class="edit-input" data-key="${c.key}" value="${value}"></td>` : `<td class="p-2 border">${value}</td>`;
            }).join('');
            if (isEditMode) cells += `<td class="p-1 border text-center"><button class="delete-row-btn" onclick="deleteTableRow('${dayType}', ${index}, '${subKey}')">X</button></td>`;
            return `<tr class="border-b text-center text-sm" data-index="${index}">${cells}</tr>`;
        }).join('');
        let addButton = isEditMode ? `<button class="add-row-btn" onclick="addTableRow('${dayType}', '${subKey}')">+ Tambah</button>` : '';
        return `<div class="table-wrapper"><h3 class="font-bold text-center text-white bg-[#0D2B4F] p-2">${title}</h3><div class="table-scroll-container"><table class="w-full"><thead class="table-header"><tr class="text-center">${header}</tr></thead><tbody id="jadwal-${dayType}-${subKey}-tbody">${body}</tbody></table></div><div class="p-2 bg-white">${addButton}</div></div>`;
    };
    document.getElementById('hari-ini-content').innerHTML = createTabContent(appData.jadwalHariIni, 'jadwalHariIni', formatDate(today));
    document.getElementById('besok-content').innerHTML = createTabContent(appData.jadwalBesok, 'jadwalBesok', formatDate(tomorrow));
    if (isEditMode) {
        const masinisDataSource = appData.pegawai.slice(1);
        const penyeliaDataSource = appData.pegawai.slice(0, 6);
        document.querySelectorAll('input[data-key="nipp_mas"], input[data-key="nipp_as"]').forEach(input => {
            input.addEventListener('input', (event) => {
                const nippValue = event.target.value.trim();
                const employee = masinisDataSource.find(p => p.nipp === nippValue);
                const name = employee ? employee.nama : '';
                const row = event.target.closest('tr');
                if (row) {
                    const targetKey = event.target.dataset.key === 'nipp_mas' ? 'masinis' : 'asisten';
                    const nameInput = row.querySelector(`input[data-key="${targetKey}"]`);
                    if (nameInput) nameInput.value = name;
                }
            });
        });
        document.querySelectorAll('input[id*="-penyelia"][id*="-nipp-"]').forEach(input => {
            input.addEventListener('input', (event) => {
                const nippValue = event.target.value.trim();
                const employee = penyeliaDataSource.find(p => p.nipp === nippValue);
                const name = employee ? employee.nama : '';
                const container = event.target.parentElement;
                if (container) {
                    const nameInput = container.querySelector('input[id*="-nama-"]');
                    if (nameInput) nameInput.value = name;
                }
            });
        });
    }
}

function saveChanges_jadwal() {
    const safeUpdate = (id, callback) => { const element = document.getElementById(id); if (element) callback(element.value); };
    let newRegulerHariIni = saveTableData('jadwal-jadwalHariIni-reguler-tbody');
    if (newRegulerHariIni) appData.jadwalHariIni.reguler = newRegulerHariIni;
    let newKlbHariIni = saveTableData('jadwal-jadwalHariIni-klb-tbody');
    if (newKlbHariIni) appData.jadwalHariIni.klb = newKlbHariIni;
    let newCutiHariIni = saveTableData('jadwal-jadwalHariIni-cuti-tbody');
    if (newCutiHariIni) appData.jadwalHariIni.cuti = newCutiHariIni;
    safeUpdate('edit-catatan-jadwalHariIni', value => appData.jadwalHariIni.catatanPenting = value);
    [1, 2, 3].forEach(i => {
        safeUpdate(`edit-penyelia${i}-nama-jadwalHariIni`, value => appData.jadwalHariIni.penyelia['dinas' + i].nama = value);
        safeUpdate(`edit-penyelia${i}-nipp-jadwalHariIni`, value => appData.jadwalHariIni.penyelia['dinas' + i].nipp = value);
    });
    let newRegulerBesok = saveTableData('jadwal-jadwalBesok-reguler-tbody');
    if (newRegulerBesok) appData.jadwalBesok.reguler = newRegulerBesok;
    let newKlbBesok = saveTableData('jadwal-jadwalBesok-klb-tbody');
    if (newKlbBesok) appData.jadwalBesok.klb = newKlbBesok;
    let newCutiBesok = saveTableData('jadwal-jadwalBesok-cuti-tbody');
    if (newCutiBesok) appData.jadwalBesok.cuti = newCutiBesok;
    safeUpdate('edit-catatan-jadwalBesok', value => appData.jadwalBesok.catatanPenting = value);
    [1, 2, 3].forEach(i => {
        safeUpdate(`edit-penyelia${i}-nama-jadwalBesok`, value => appData.jadwalBesok.penyelia['dinas' + i].nama = value);
        safeUpdate(`edit-penyelia${i}-nipp-jadwalBesok`, value => appData.jadwalBesok.penyelia['dinas' + i].nipp = value);
    });
}

function render_sertifikasi() {
    const contentEl = document.getElementById('sertifikasi');
    if (!contentEl.innerHTML.includes('sertifikasiTable')) { contentEl.innerHTML = `<div class="bg-white p-6 rounded-lg shadow"><h2 class="text-2xl font-bold text-[#0D2B4F] mb-4">Pantauan Sertifikasi Awak KA</h2><div class="overflow-x-auto" style="max-height: 70vh;"><table id="sertifikasiTable" class="w-full text-sm"></table></div><div id="sertifikasiTable-controls" class="mt-4"></div></div>`; }
    const table = document.getElementById('sertifikasiTable');
    const controlsContainer = document.getElementById('sertifikasiTable-controls');
    const columns = [ { key: 'nama', label: 'Nama' }, { key: 'nipp', label: 'NIPP' }, { key: 'jabatan', label: 'Jabatan' }, { key: 'jenis', label: 'Jenis Sertifikasi' }, { key: 'berlaku', label: 'Masa Berlaku' }, { key: 'smartcard_url', label: 'Smartcard' } ];
    let headerHtml = `<thead class="text-xs text-white uppercase table-header"><tr>${columns.map(c => `<th class="py-3 px-4 text-center align-middle">${c.label}</th>`).join('')}<th class="py-3 px-4 text-center align-middle">Status</th>${isEditMode ? '<th class="py-3 px-4 text-center align-middle">Aksi</th>' : ''}</tr></thead>`;
    let bodyHtml = `<tbody id="sertifikasiTableBody">`;
    const today = new Date();
    const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    appData.sertifikasi.forEach((s, index) => {
        let status = 'Aktif', statusClass = 'bg-green-100 text-green-800';
        try {
            const [day, month, year] = s.berlaku.split('/');
            const expiryDate = new Date(`${year}-${month}-${day}`);
            if (expiryDate < oneYearFromNow) { status = 'Segera Habis'; statusClass = 'bg-yellow-100 text-yellow-800'; }
            if (expiryDate < today) { status = 'Kadaluarsa'; statusClass = 'bg-red-100 text-red-800'; }
        } catch (e) { status = 'Invalid'; statusClass = 'bg-gray-100'; }
        bodyHtml += `<tr class="border-b" data-index="${index}">`;
        let cells = '';
        columns.forEach(col => {
            const textAlign = col.key === 'nama' ? 'text-left' : 'text-center';
            if (isEditMode) {
                if (col.key === 'smartcard_url') { cells += `<td class="p-1 border align-middle"><div class="flex items-center gap-2"><img src="${s.smartcard_url.replace(/&dl=0/g, '&raw=1')}" class="h-[31px] w-[50px] object-cover rounded-sm border" onerror="this.style.display='none'"><input class="edit-input" data-key="${col.key}" value="${s[col.key] || ''}"></div></td>`; } 
                else { cells += `<td class="p-1 border align-middle"><input class="edit-input ${textAlign}" data-key="${col.key}" value="${s[col.key] || ''}"></td>`; }
            } else {
                if (col.key === 'smartcard_url') { const imageUrl = s[col.key] ? s[col.key].replace(/&dl=0/g, '&raw=1') : ''; cells += `<td class="py-2 px-4 align-middle smartcard-cell"><img src="${imageUrl}" class="w-[100px] h-[63px] object-cover rounded-md shadow-sm mx-auto smartcard-image" onerror="this.src='https://placehold.co/100x63/EFEFEF/AAAAAA?text=Gagal+Muat'; this.classList.add('border');"></td>`; } 
                else { cells += `<td class="py-3 px-4 align-middle ${textAlign}">${s[col.key] || ''}</td>`; }
            }
        });
        bodyHtml += cells;
        const statusSpanClasses = `text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}`;
        if (isEditMode) { bodyHtml += `<td class="p-1 border align-middle text-center"><span class="${statusSpanClasses}">${status}</span></td><td class="p-1 border align-middle text-center"><button class="delete-row-btn" onclick="deleteTableRow('sertifikasi', ${index})">X</button></td>`; } 
        else { bodyHtml += `<td class="py-3 px-4 align-middle text-center"><span class="${statusSpanClasses}">${status}</span></td>`; }
        bodyHtml += `</tr>`;
    });
    bodyHtml += `</tbody>`;
    table.innerHTML = headerHtml + bodyHtml;
    controlsContainer.innerHTML = isEditMode ? `<button class="add-row-btn" onclick="addTableRow('sertifikasi')">+ Tambah</button>` : '';
}

function saveChanges_sertifikasi() {
    const newData = saveTableData('sertifikasiTableBody');
    if (newData !== null) {
        appData.sertifikasi = newData;
    }
}

function render_pegawai() {
    const contentEl = document.getElementById('pegawai');
    if (!contentEl.innerHTML.includes('pegawaiTable')) {
        contentEl.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-2xl font-bold text-[#0D2B4F] mb-4">Daftar Nominatif Pegawai</h2>
                <input type="text" id="searchInput" onkeyup="searchTable('pegawaiTable')" placeholder="Cari..." class="w-full p-2 border border-gray-300 rounded-lg mb-4">
                <div class="overflow-x-auto" style="max-height: 70vh;">
                    <table id="pegawaiTable" class="w-full text-sm text-center whitespace-nowrap"></table>
                </div>
                <div id="pegawaiTable-controls" class="mt-4"></div>
            </div>`;
    }
    const table = document.getElementById('pegawaiTable');
    const controlsContainer = document.getElementById('pegawaiTable-controls');
    const columns = [ 'no', 'nama', 'nipp', 'jabatan', 'ttl', 'ijazah', 'mulai_bekerja', 'diklat_fungsional', 'lulus', 'o62', 'o64', 'sert_madya', 'sert_muda', 'sert_pertama', 'diklat_nama', 'diklat_tgl', 'pensiun'];
    let headerHtml = `
        <thead class="text-xs text-white uppercase table-header">
            <tr>
                <th rowspan="2" class="py-3 px-4 align-middle border-r">No</th>
                <th rowspan="2" class="py-3 px-4 align-middle border-r">Nama</th>
                <th rowspan="2" class="py-3 px-4 align-middle border-r">NIPP</th>
                <th rowspan="2" class="py-3 px-4 align-middle border-r">Jabatan</th>
                <th rowspan="2" class="py-3 px-4 align-middle border-r">Tempat dan Tanggal Lahir</th>
                <th rowspan="2" class="py-3 px-4 align-middle border-r">Ijazah Yang Diakui</th>
                <th rowspan="2" class="py-3 px-4 align-middle border-r">Mulai Bekerja</th>
                <th rowspan="2" class="py-3 px-4 align-middle border-r">Diklat Fungsional</th>
                <th rowspan="2" class="py-3 px-4 align-middle border-r">Lulus/Tidak Lulus</th>
                <th colspan="2" class="py-3 px-4 text-center border-b border-r">No Tanda Kecakapan</th>
                <th colspan="3" class="py-3 px-4 text-center border-b border-r">No Sertifikasi</th>
                <th colspan="2" class="py-3 px-4 text-center border-b border-r">Diklat Lain</th>
                <th rowspan="2" class="py-3 px-4 align-middle border-l">Pensiun</th>
                ${isEditMode ? '<th rowspan="2" class="py-3 px-4 align-middle">Aksi</th>' : ''}
            </tr>
            <tr>
                <th class="py-2 px-4 border-t border-r">O.62</th>
                <th class="py-2 px-4 border-t border-r">O.64</th>
                <th class="py-2 px-4 border-t border-r">Madya</th>
                <th class="py-2 px-4 border-t border-r">Muda</th>
                <th class="py-2 px-4 border-t border-r">Pertama</th>
                <th class="py-2 px-4 border-t border-r">Nama Diklat</th>
                <th class="py-2 px-4 border-t border-r">Tgl/Bln/Thn</th>
            </tr>
        </thead>`;
    let bodyHtml = `<tbody id="pegawaiTableBody">`;
    if (isEditMode) {
        bodyHtml += appData.pegawai.map((p, index) =>
            `<tr data-index="${index}">
                ${columns.map(key => `<td><input class="edit-input" data-key="${key}" value="${p[key] || ''}"></td>`).join('')}
                <td class="text-center"><button class="delete-row-btn" onclick="deleteTableRow('pegawai', ${index})">X</button></td>
            </tr>`
        ).join('');
        controlsContainer.innerHTML = `<button class="add-row-btn" onclick="addTableRow('pegawai')">Tambah Baris</button>`;
    } else {
        bodyHtml += appData.pegawai.map(p =>
            `<tr class="bg-white border-b hover:bg-gray-50 text-center">
                ${columns.map(key => `<td class="py-2 px-4">${p[key] || '-'}</td>`).join('')}
            </tr>`
        ).join('');
        controlsContainer.innerHTML = '';
    }
    bodyHtml += `</tbody>`;
    table.innerHTML = headerHtml + bodyHtml;
}

function saveChanges_pegawai() {
    const newData = saveTableData('pegawaiTableBody');
    if (newData !== null) {
        const newKeys = [ 'no', 'nama', 'nipp', 'jabatan', 'ttl', 'ijazah', 'mulai_bekerja', 'diklat_fungsional', 'lulus', 'o62', 'o64', 'sert_madya', 'sert_muda', 'sert_pertama', 'diklat_nama', 'diklat_tgl', 'pensiun'];
        appData.pegawai = newData.map(row => {
            const newRowObject = {};
            newKeys.forEach(key => {
                newRowObject[key] = row[key] || '';
            });
            return newRowObject;
        });
    }
}

function render_rekapitulasi_pegawai() {
    const contentEl = document.getElementById('rekapitulasi-pegawai');
    const data = appData.rekapitulasiPegawai;
    const createRow = (label, value, id) => `<tr><td class="py-2">${label}</td>${isEditMode ? `<td><input type="number" id="${id}" class="edit-input w-24 float-right text-right" value="${value}"></td>` : `<td class="py-2 text-right font-semibold">${value}</td>`}</tr>`;
    const createSummaryRow = (label, value, id, isPositive) => { const bgColor = isEditMode ? '' : (isPositive ? 'bg-green-200' : 'bg-red-200'); return `<tr class="${bgColor} font-bold"><td class="py-2">${label}</td>${isEditMode ? `<td><input type="number" id="${id}" class="edit-input w-24 float-right text-right" value="${value}"></td>` : `<td class="py-2 text-right">${value}</td>`}</tr>`; };
    const rekapNominatifHtml = `<div class="border p-4 rounded-lg"><h3 class="font-bold text-center mb-2">Rekap Nominatif</h3><table class="w-full text-sm"><tbody class="divide-y">${createRow('KUPT', data.nominatif.kupt, 'edit-nominatif-kupt')}${createRow('PENYELIA INSTRUKTUR', data.nominatif.penyeliaInstruktur, 'edit-nominatif-penyeliaInstruktur')}${createRow('PENYELIA DINASAN', data.nominatif.penyeliaDinasan, 'edit-nominatif-penyeliaDinasan')}${createRow('MASINIS', data.nominatif.masinis, 'edit-nominatif-masinis')}${createRow('ASISTEN MASINIS', data.nominatif.asistenMasinis, 'edit-nominatif-asistenMasinis')}<tr class="bg-gray-100 font-bold"><td class="py-2">JUMLAH</td>${isEditMode ? `<td><input type="number" id="edit-nominatif-jumlah" class="edit-input w-24 float-right text-right" value="${data.nominatif.jumlah}"></td>` : `<td class="py-2 text-right">${data.nominatif.jumlah}</td>`}</tr></tbody></table></div>`;
    const cukupanMasinisHtml = `<div class="border p-4 rounded-lg bg-blue-50"><h3 class="font-bold text-center mb-2">Cukupan Pegawai (MASINIS MADYA / MUDA)</h3><table class="w-full text-sm"><tbody class="divide-y">${createRow('DINASAN MURNI', data.cukupanMasinis.dinasanMurni, 'edit-masinis-dinasanMurni')}${createRow('L/I/S', data.cukupanMasinis.lhs, 'edit-masinis-lhs')}${createRow('DIBUTUHKAN', data.cukupanMasinis.dibutuhkan, 'edit-masinis-dibutuhkan')}${createRow('ADANYA PEGAWAI', data.cukupanMasinis.adanyaPegawai, 'edit-masinis-adanyaPegawai')}${createRow('SEREP', data.cukupanMasinis.serep, 'edit-masinis-serep')}${createSummaryRow('KURANG/LEBIH', data.cukupanMasinis.kurangLebih, 'edit-masinis-kurangLebih', data.cukupanMasinis.kurangLebih >= 0)}</tbody></table></div>`;
    const cukupanAsistenHtml = `<div class="border p-4 rounded-lg bg-orange-50"><h3 class="font-bold text-center mb-2">Cukupan Pegawai (MASINIS PERTAMA)</h3><table class="w-full text-sm"><tbody class="divide-y">${createRow('DINASAN MURNI', data.cukupanAsisten.dinasanMurni, 'edit-asisten-dinasanMurni')}${createRow('L/I/S', data.cukupanAsisten.lhs, 'edit-asisten-lhs')}${createRow('DIBUTUHKAN', data.cukupanAsisten.dibutuhkan, 'edit-asisten-dibutuhkan')}${createRow('ADANYA PEGAWAI', data.cukupanAsisten.adanyaPegawai, 'edit-asisten-adanyaPegawai')}${createRow('SEREP', data.cukupanAsisten.serep, 'edit-asisten-serep')}${createSummaryRow('KURANG/LEBIH', data.cukupanAsisten.kurangLebih, 'edit-asisten-kurangLebih', data.cukupanAsisten.kurangLebih >= 0)}</tbody></table></div>`;
    const renderGapekaTable = (gapekaData, containerId, dataKey, subKey) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        const jadwalData = gapekaData.jadwal || [];
        const summaryData = gapekaData.summary || {};
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
        const createFooterRow = (label, value, id) => `<tr><td colspan="12" class="text-right font-bold p-2">${label}</td>${isEditMode ? `<td><input type="number" id="${id}" class="edit-input text-center" value="${value}"></td>` : `<td class="p-2 border text-center font-bold">${value}</td>`}<td class="border"></td></tr>`;
        const summaryFooterHtml = `<tfoot class="text-sm">${createFooterRow('DINASAN', summaryData.dinasan, `edit-${subKey}-summary-dinasan`)}${createFooterRow('L / I / S', summaryData.lis, `edit-${subKey}-summary-lis`)}${createFooterRow('DIBUTUHKAN', summaryData.dibutuhkan, `edit-${subKey}-summary-dibutuhkan`)}${createFooterRow('ADANYA', summaryData.adanya, `edit-${subKey}-summary-adanya`)}${createFooterRow('SEREP', summaryData.serep, `edit-${subKey}-summary-serep`)}${createFooterRow('KURANG / LEBIH', summaryData.kurangLebih, `edit-${subKey}-summary-kurangLebih`)}</tfoot>`;
        container.innerHTML = `<table class="w-full text-xs border-collapse border border-gray-400">${headerHtml}<tbody id="${containerId}-tbody">${bodyHtml}</tbody>${summaryFooterHtml}</table>${isEditMode ? `<div class="p-2"><button class="add-row-btn" onclick="addTableRow('${dataKey}', '${subKey}', 'jadwal')">+ Tambah Baris</button></div>` : ''}`;
    };
    contentEl.innerHTML = `<div class="space-y-6"><div class="bg-white p-6 rounded-lg shadow"><h2 class="text-2xl font-bold text-[#0D2B4F] mb-4">Rekapitulasi Jumlah Pegawai Tahun 2025</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${rekapNominatifHtml}${cukupanMasinisHtml}${cukupanAsistenHtml}</div></div><div class="bg-white p-6 rounded-lg shadow"><h2 class="text-2xl font-bold text-[#0D2B4F] mb-4">Program & Realisasi Dinasan</h2><div class="border-b border-gray-200"><nav id="o20-tabs" class="-mb-px flex space-x-8" aria-label="Tabs"><button onclick="switchTab('o20', 'program')" class="tab-button active whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Program GAPEKA 2025</button><button onclick="switchTab('o20', 'realisasi')" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Realisasi GAPEKA 2025</button></nav></div><div class="mt-6"><div id="program-content" class="tab-content active"></div><div id="realisasi-content" class="tab-content"></div></div></div></div>`;
    renderGapekaTable(appData.programGapeka.program, 'program-content', 'programGapeka', 'program');
    renderGapekaTable(appData.programGapeka.realisasi, 'realisasi-content', 'programGapeka', 'realisasi');
}

function saveChanges_rekapitulasi_pegawai() {
    const safeUpdate = (id, callback) => { const element = document.getElementById(id); if (element) callback(Number(element.value)); };
    const rekapData = appData.rekapitulasiPegawai;
    safeUpdate('edit-nominatif-kupt', value => rekapData.nominatif.kupt = value);
    safeUpdate('edit-nominatif-penyeliaInstruktur', value => rekapData.nominatif.penyeliaInstruktur = value);
    safeUpdate('edit-nominatif-penyeliaDinasan', value => rekapData.nominatif.penyeliaDinasan = value);
    safeUpdate('edit-nominatif-masinis', value => rekapData.nominatif.masinis = value);
    safeUpdate('edit-nominatif-asistenMasinis', value => rekapData.nominatif.asistenMasinis = value);
    safeUpdate('edit-nominatif-jumlah', value => rekapData.nominatif.jumlah = value);
    safeUpdate('edit-masinis-dinasanMurni', value => rekapData.cukupanMasinis.dinasanMurni = value);
    safeUpdate('edit-masinis-lhs', value => rekapData.cukupanMasinis.lhs = value);
    safeUpdate('edit-masinis-dibutuhkan', value => rekapData.cukupanMasinis.dibutuhkan = value);
    safeUpdate('edit-masinis-adanyaPegawai', value => rekapData.cukupanMasinis.adanyaPegawai = value);
    safeUpdate('edit-masinis-serep', value => rekapData.cukupanMasinis.serep = value);
    safeUpdate('edit-masinis-kurangLebih', value => rekapData.cukupanMasinis.kurangLebih = value);
    safeUpdate('edit-asisten-dinasanMurni', value => rekapData.cukupanAsisten.dinasanMurni = value);
    safeUpdate('edit-asisten-lhs', value => rekapData.cukupanAsisten.lhs = value);
    safeUpdate('edit-asisten-dibutuhkan', value => rekapData.cukupanAsisten.dibutuhkan = value);
    safeUpdate('edit-asisten-adanyaPegawai', value => rekapData.cukupanAsisten.adanyaPegawai = value);
    safeUpdate('edit-asisten-serep', value => rekapData.cukupanAsisten.serep = value);
    safeUpdate('edit-asisten-kurangLebih', value => rekapData.cukupanAsisten.kurangLebih = value);
    const newProgramJadwal = saveTableData('program-content-tbody');
    if (newProgramJadwal !== null) {
        appData.programGapeka.program.jadwal = newProgramJadwal;
    }
    const gapekaProgramSummary = appData.programGapeka.program.summary;
    safeUpdate('edit-program-summary-dinasan', value => gapekaProgramSummary.dinasan = value);
    safeUpdate('edit-program-summary-lis', value => gapekaProgramSummary.lis = value);
    safeUpdate('edit-program-summary-dibutuhkan', value => gapekaProgramSummary.dibutuhkan = value);
    safeUpdate('edit-program-summary-adanya', value => gapekaProgramSummary.adanya = value);
    safeUpdate('edit-program-summary-serep', value => gapekaProgramSummary.serep = value);
    safeUpdate('edit-program-summary-kurangLebih', value => gapekaProgramSummary.kurangLebih = value);
    const newRealisasiJadwal = saveTableData('realisasi-content-tbody');
    if (newRealisasiJadwal !== null) {
        appData.programGapeka.realisasi.jadwal = newRealisasiJadwal;
    }
    const gapekaRealisasiSummary = appData.programGapeka.realisasi.summary;
    safeUpdate('edit-realisasi-summary-dinasan', value => gapekaRealisasiSummary.dinasan = value);
    safeUpdate('edit-realisasi-summary-lis', value => gapekaRealisasiSummary.lis = value);
    safeUpdate('edit-realisasi-summary-dibutuhkan', value => gapekaRealisasiSummary.dibutuhkan = value);
    safeUpdate('edit-realisasi-summary-adanya', value => gapekaRealisasiSummary.adanya = value);
    safeUpdate('edit-realisasi-summary-serep', value => gapekaRealisasiSummary.serep = value);
    safeUpdate('edit-realisasi-summary-kurangLebih', value => gapekaRealisasiSummary.kurangLebih = value);
}

function render_kompetensi() {
    const contentEl = document.getElementById('kompetensi');
    if (!contentEl.innerHTML.includes('utsUpoTable')) { contentEl.innerHTML = `<div class="space-y-6"><div class="bg-white p-6 rounded-lg shadow"><h3 class="text-xl font-bold text-[#0D2B4F] mb-4">Data Nilai UTS dan UPO Tahun 2025</h3><div class="overflow-x-auto" style="max-height: 50vh;"><table id="utsUpoTable" class="w-full text-xs border-collapse border border-gray-300 whitespace-nowrap"></table></div><div id="utsUpoTable-controls" class="mt-4"></div><div class="mt-2 text-xs text-gray-600"><p><strong>Keterangan:</strong> UTS (Uji Tunjuk Sebut), UPO (Uji Petik Online)</p></div></div><div class="bg-white p-6 rounded-lg shadow"><h3 class="text-xl font-bold text-[#0D2B4F] mb-4">Data Hasil Uji Ulang Kecakapan O.62/O.64</h3><div class="overflow-x-auto" style="max-height: 50vh;"><table id="ujiUlangTable" class="w-full text-xs border-collapse border border-gray-300 whitespace-nowrap"></table></div><div id="ujiUlangTable-controls" class="mt-4"></div></div></div>`; }
    const utsUpoTable = document.getElementById('utsUpoTable');
    const utsUpoControls = document.getElementById('utsUpoTable-controls');
    const months = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'agu', 'sep', 'okt', 'nov', 'des'];
    let utsUpoHeader = `<thead class="table-header"><tr class="text-center"><th rowspan="3" class="p-2 border">No</th><th rowspan="3" class="p-2 border">Nama</th><th rowspan="3" class="p-2 border">NIPP</th><th rowspan="3" class="p-2 border">Jabatan</th><th colspan="24" class="p-2 border">Nilai per Bulan</th>${isEditMode ? '<th rowspan="3" class="p-2 border">Aksi</th>' : ''}</tr><tr>${months.map(m => `<th colspan="2" class="p-2 border">${m.toUpperCase()}</th>`).join('')}</tr><tr>${months.map(() => `<th class="p-1 border">UTS</th><th class="p-1 border">UPO</th>`).join('')}</tr></thead>`;
    let utsUpoBody = `<tbody id="utsUpoTbody" class="text-center">`;
    utsUpoBody += appData.nilaiUtsUpo.map((p, index) => {
        let cells = isEditMode ? `<td class="p-1 border"><input class="edit-input" data-key="no" value="${p.no || ''}"></td><td class="p-1 border"><input class="edit-input" data-key="nama" value="${p.nama || ''}"></td><td class="p-1 border"><input class="edit-input" data-key="nipp" value="${p.nipp || ''}"></td><td class="p-1 border"><input class="edit-input" data-key="jabatan" value="${p.jabatan || ''}"></td>` : `<td class="p-2 border">${p.no}</td><td class="p-2 border text-left">${p.nama}</td><td class="p-2 border">${p.nipp}</td><td class="p-2 border">${p.jabatan}</td>`;
        months.forEach(m => { cells += isEditMode ? `<td class="p-1 border"><input class="edit-input" data-key="${m}_uts" value="${p[`${m}_uts`] || ''}"></td><td class="p-1 border"><input class="edit-input" data-key="${m}_upo" value="${p[`${m}_upo`] || ''}"></td>` : `<td class="p-2 border">${p[`${m}_uts`] || '-'}</td><td class="p-2 border">${p[`${m}_upo`] || '-'}</td>`; });
        if (isEditMode) cells += `<td class="p-1 border"><button class="delete-row-btn" onclick="deleteTableRow('nilaiUtsUpo', ${index})">X</button></td>`;
        return `<tr class="odd:bg-white even:bg-gray-50" data-index="${index}">${cells}</tr>`;
    }).join('');
    utsUpoBody += `</tbody>`;
    utsUpoTable.innerHTML = utsUpoHeader + utsUpoBody;
    utsUpoControls.innerHTML = isEditMode ? `<button class="add-row-btn" onclick="addTableRow('nilaiUtsUpo')">+ Tambah</button>` : '';
    const ujiUlangTable = document.getElementById('ujiUlangTable');
    const ujiUlangControls = document.getElementById('ujiUlangTable-controls');
    const ujiUlangCols = [ {key: 'no', label: 'NO'}, {key: 'nama', label: 'NAMA'}, {key: 'nipp', label: 'NIPP'}, {key: 'jabatan', label: 'JABATAN'}, {key: 'tgl_uji', label: 'TGL UJI'}, {key: 'nilai_teori', label: 'TEORI'}, {key: 'waw_sarana', label: 'SARANA'}, {key: 'waw_operasi', label: 'OPERASI'}, {key: 'prak_perka', label: 'PERKA'}, {key: 'prak_adm', label: 'ADM'}, {key: 'keterangan', label: 'KET'}, {key: 'penguji', label: 'PENGUJI'}, {key: 'ka', label: 'KA'} ];
    let ujiUlangHeader = `<thead class="table-header font-bold text-center"><tr><th class="p-2 border" rowspan="2">NO</th><th class="p-2 border" rowspan="2">NAMA</th><th class="p-2 border" rowspan="2">NIPP</th><th class="p-2 border" rowspan="2">JABATAN</th><th class="p-2 border" rowspan="2">TGL UJI</th><th class="p-2 border" rowspan="2">NILAI TEORI</th><th class="p-2 border" colspan="2">WAWANCARA</th><th class="p-2 border" colspan="2">PRAKTEK</th><th class="p-2 border" rowspan="2">KET</th><th class="p-2 border" colspan="2">PENGUJI PRAKTEK</th>${isEditMode ? '<th class="p-2 border" rowspan="2">Aksi</th>' : ''}</tr><tr><th class="p-1 border">SARANA</th><th class="p-1 border">OPERASI</th><th class="p-1 border">PERKA</th><th class="p-1 border">ADM</th><th class="p-1 border">PENGUJI</th><th class="p-1 border">KA</th></tr></thead>`;
    let ujiUlangBody = `<tbody id="ujiUlangTbody" class="text-center">`;
    ujiUlangBody += appData.ujiUlang.map((p, index) => { let cells = ujiUlangCols.map(c => isEditMode ? `<td class="p-1 border"><input class="edit-input" data-key="${c.key}" value="${p[c.key] || ''}"></td>` : `<td class="p-2 border">${p[c.key] || '-'}</td>`).join(''); if (isEditMode) cells += `<td class="p-1 border"><button class="delete-row-btn" onclick="deleteTableRow('ujiUlang', ${index})">X</button></td>`; return `<tr data-index="${index}">${cells}</tr>`; }).join('');
    ujiUlangBody += `</tbody>`;
    ujiUlangTable.innerHTML = ujiUlangHeader + ujiUlangBody;
    ujiUlangControls.innerHTML = isEditMode ? `<button class="add-row-btn" onclick="addTableRow('ujiUlang')">+ Tambah</button>` : '';
}

function saveChanges_kompetensi() {
    const newUtsUpoData = saveTableData('utsUpoTbody');
    if (newUtsUpoData !== null) {
        appData.nilaiUtsUpo = newUtsUpoData;
    }
    const newUjiUlangData = saveTableData('ujiUlangTbody');
    if (newUjiUlangData !== null) {
        appData.ujiUlang = newUjiUlangData;
    }
}

function render_pantauan_lintas() {
    const contentEl = document.getElementById('pantauan-lintas');
    if (!contentEl.innerHTML.includes('taspat-container')) { contentEl.innerHTML = `<div class="space-y-6"><div class="bg-white p-6 rounded-lg shadow"><h2 class="text-xl font-bold text-[#0D2B4F] mb-4">Pantauan TASPAT Lintas</h2><div id="taspat-container" class="grid grid-cols-1 md:grid-cols-2 gap-8"></div></div><div class="bg-white p-6 rounded-lg shadow"><h2 class="text-xl font-bold text-[#0D2B4F] mb-4">Pantauan Kejadian / Kondisi Sarana / Prasarana</h2><div id="kejadian-container" class="overflow-x-auto"></div><div id="kejadian-controls" class="mt-4"></div></div><div class="bg-white p-6 rounded-lg shadow"><h2 class="text-xl font-bold text-[#0D2B4F] mb-4">Pantauan KKA / NKKA & Insiden</h2><div id="kka-container" class="overflow-x-auto"></div><div id="kka-controls" class="mt-4"></div></div><div class="bg-white p-6 rounded-lg shadow" id="perka-container"></div></div>`; }
    const createTaspatTable = (title, data, dataSubKey) => {
        const columns = [ {key: 'no', label: 'NO.'}, {key: 'petak', label: 'PETAK JALAN'}, {key: 'km', label: 'KILOMETER'}, {key: 'kecepatan', label: 'KECEPATAN'} ];
        let headerHtml = columns.map(c => `<th class="p-2 font-semibold text-center">${c.label}</th>`).join('');
        if (isEditMode) headerHtml += `<th class="p-2 font-semibold">Aksi</th>`;
        const tableData = Array.isArray(data) ? data : [];
        let rowsHtml = tableData.map((row, index) => {
            if (isEditMode) {
                let cells = columns.map(c => `<td class="p-1 border"><input class="edit-input text-center" data-key="${c.key}" value="${row[c.key] || ''}"></td>`).join('');
                cells += `<td class="p-1 border text-center"><button class="delete-row-btn" onclick="deleteTableRow('pantauanTaspat', ${index}, '${dataSubKey}')">X</button></td>`;
                return `<tr data-index="${index}">${cells}</tr>`;
            } else {
                return `<tr class="border-b text-center">
                            <td class="p-2">${row.no}</td>
                            <td class="p-2">${row.petak}</td>
                            <td class="p-2">${row.km}</td>
                            <td class="p-2">${row.kecepatan}</td>
                        </tr>`;
            }
        }).join('');
        const addButtonHtml = isEditMode ? `<div class="p-2"><button class="add-row-btn" onclick="addTableRow('pantauanTaspat', '${dataSubKey}')">+ Tambah Baris</button></div>` : '';
        return `<div class="overflow-hidden rounded-lg border"><h3 class="bg-yellow-400 p-2 text-center font-bold text-gray-800">${title}</h3><div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-gray-100"><tr>${headerHtml}</tr></thead><tbody id="taspat-${dataSubKey}-tbody">${rowsHtml}</tbody></table></div>${addButtonHtml}</div>`;
    };
    const taspatContainer = document.getElementById('taspat-container');
    taspatContainer.innerHTML = createTaspatTable('LINTAS PWK - BD (JALUR HILIR)', appData.pantauanTaspat.hilir_bd, 'hilir_bd') + createTaspatTable('LINTAS PWK - BD (JALUR HULU)', appData.pantauanTaspat.hulu_bd, 'hulu_bd') + createTaspatTable('LINTAS PWK - CKR (JALUR HILIR)', appData.pantauanTaspat.hilir_ckr, 'hilir_ckr') + createTaspatTable('LINTAS PWK - CKR (JALUR HULU)', appData.pantauanTaspat.hulu_ckr, 'hulu_ckr');
    const createPerkaSubTable = (data, columns, dataKey, subKey, thirdKey) => {
        const tableData = Array.isArray(data) ? data : [];
        if (!isEditMode && tableData.length === 0) { return `<tr><td class="p-2 text-center" colspan="${columns.length}">Tidak ada data</td></tr>`; }
        return tableData.map((row, index) => { if (isEditMode) { let cells = columns.map(col => `<td class="p-1 border"><input class="edit-input" data-key="${col.key}" value="${row[col.key] || ''}"></td>`).join(''); cells += `<td class="p-1 border text-center"><button class="delete-row-btn" onclick="deleteTableRow('${dataKey}', ${index}, '${subKey}', '${thirdKey || 'null'}')">X</button></td>`; return `<tr data-index="${index}">${cells}</tr>`; } else { return `<tr class="text-center">${columns.map(col => `<td class="p-2 border">${row[col.key] || ''}</td>`).join('')}</tr>`; } }).join('');
    };
    const perkaContainer = document.getElementById('perka-container');
    const wam_columns = [ {key: 'no', label: 'NO'}, {key: 'tanggal', label: 'TANGGAL'}, {key: 'ka', label: 'KA'}, {key: 'relasi', label: 'RELASI'}, {key: 'dasar', label: 'DASAR'}, {key: 'keterangan', label: 'KETERANGAN'} ];
    const wad_columns = [ {key: 'no', label: 'NO'}, {key: 'tanggal', label: 'TANGGAL'}, {key: 'dasar', label: 'DASAR'}, {key: 'keterangan', label: 'KETERANGAN'} ];
    let perkaWamHeader = wam_columns.map(c => `<th class="p-2 font-semibold">${c.label}</th>`).join('');
    let perkaWadHeader = wad_columns.map(c => `<th class="p-2 font-semibold">${c.label}</th>`).join('');
    if (isEditMode) { perkaWamHeader += `<th class="p-2 font-semibold">Aksi</th>`; perkaWadHeader += `<th class="p-2 font-semibold">Aksi</th>`; }
    perkaContainer.innerHTML = `<h2 class="text-xl font-bold text-[#0D2B4F] mb-4 text-center">Pantauan Perka</h2><div class="border rounded-lg overflow-hidden mb-6"><h3 class="bg-slate-600 p-3 text-center font-extrabold text-white text-lg tracking-wider">WAM</h3><div class="grid grid-cols-1 lg:grid-cols-2"><div><h4 class="bg-green-500 p-2 text-center font-bold text-white">JALAN</h4><div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-gray-100"><tr>${perkaWamHeader}</tr></thead><tbody id="perka-wam-jalan-tbody">${createPerkaSubTable(appData.pantauanPerka.wam.jalan, wam_columns, 'pantauanPerka', 'wam', 'jalan')}</tbody></table>${isEditMode ? `<div class="p-2"><button class="add-row-btn" onclick="addTableRow('pantauanPerka', 'wam', 'jalan')">+ Tambah</button></div>` : ''}</div></div><div><h4 class="bg-red-500 p-2 text-center font-bold text-white">BATAL</h4><div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-gray-100"><tr>${perkaWamHeader}</tr></thead><tbody id="perka-wam-batal-tbody">${createPerkaSubTable(appData.pantauanPerka.wam.batal, wam_columns, 'pantauanPerka', 'wam', 'batal')}</tbody></table>${isEditMode ? `<div class="p-2"><button class="add-row-btn" onclick="addTableRow('pantauanPerka', 'wam', 'batal')">+ Tambah</button></div>` : ''}</div></div></div></div><div class="border rounded-lg overflow-hidden mb-6"><h3 class="bg-blue-600 p-3 text-center font-extrabold text-white text-lg tracking-wider">PPK</h3><div class="grid grid-cols-1 lg:grid-cols-2"><div><h4 class="bg-green-500 p-2 text-center font-bold text-white">JALAN</h4><div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-gray-100"><tr>${perkaWamHeader}</tr></thead><tbody id="perka-ppk-jalan-tbody">${createPerkaSubTable(appData.pantauanPerka.ppk.jalan, wam_columns, 'pantauanPerka', 'ppk', 'jalan')}</tbody></table>${isEditMode ? `<div class="p-2"><button class="add-row-btn" onclick="addTableRow('pantauanPerka', 'ppk', 'jalan')">+ Tambah</button></div>` : ''}</div></div><div><h4 class="bg-red-500 p-2 text-center font-bold text-white">BATAL</h4><div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-gray-100"><tr>${perkaWamHeader}</tr></thead><tbody id="perka-ppk-batal-tbody">${createPerkaSubTable(appData.pantauanPerka.ppk.batal, wam_columns, 'pantauanPerka', 'ppk', 'batal')}</tbody></table>${isEditMode ? `<div class="p-2"><button class="add-row-btn" onclick="addTableRow('pantauanPerka', 'ppk', 'batal')">+ Tambah</button></div>` : ''}</div></div></div></div><div class="border rounded-lg overflow-hidden mb-6"><h3 class="bg-green-600 p-3 text-center font-extrabold text-white text-lg tracking-wider">WAD</h3><div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-gray-100"><tr>${perkaWadHeader}</tr></thead><tbody id="perka-wad-tbody">${createPerkaSubTable(appData.pantauanPerka.wad, wad_columns, 'pantauanPerka', 'wad', 'null')}</tbody></table>${isEditMode ? `<div class="p-2"><button class="add-row-btn" onclick="addTableRow('pantauanPerka', 'wad')">+ Tambah</button></div>` : ''}</div></div>`;
    const kejadianContainer = document.getElementById('kejadian-container');
    const kejadianControls = document.getElementById('kejadian-controls');
    const kejadianCols = [ {key:'no', label:'NO'}, {key:'tanggal', label:'TANGGAL'}, {key:'no_ka', label:'NO. KA'}, {key:'kejadian', label:'KEJADIAN'}, {key:'tindak_lanjut', label:'TINDAK LANJUT'}, {key:'keterangan', label:'KETERANGAN'} ];
    let kejadianTbl = `<table class="w-full text-sm text-gray-500"><thead class="text-xs text-black uppercase bg-yellow-400 text-center"><tr>${kejadianCols.map(c=>`<th class="py-3 px-4">${c.label}</th>`).join('')}${isEditMode?'<th class="py-3 px-4">Aksi</th>':''}</tr></thead><tbody id="kejadianTbody" class="text-center">`;
    kejadianTbl += appData.pantauanKejadian.map((p,idx) => `<tr>${kejadianCols.map(c=>isEditMode?`<td class="p-1 border"><input class="edit-input" data-key="${c.key}" value="${p[c.key]||''}"></td>`:`<td class="py-3 px-4">${p[c.key]||''}</td>`).join('')}${isEditMode?`<td class="p-1 border text-center"><button class="delete-row-btn" onclick="deleteTableRow('pantauanKejadian', ${idx})">X</button></td>`:''}</tr>`).join('');
    kejadianTbl += `</tbody></table>`;
    kejadianContainer.innerHTML = kejadianTbl;
    kejadianControls.innerHTML = isEditMode ? `<button class="add-row-btn" onclick="addTableRow('pantauanKejadian')">+ Tambah</button>` : '';
    const kkaContainer = document.getElementById('kka-container');
    const kkaControls = document.getElementById('kka-controls');
    const kkaCols = [ {key:'no', label:'NO'}, {key:'tanggal', label:'TANGGAL'}, {key:'kejadian', label:'KEJADIAN'}, {key:'tindak_lanjut', label:'TINDAK LANJUT'}, {key:'keterangan', label:'KETERANGAN'} ];
    let kkaTbl = `<table class="w-full text-sm text-gray-500"><thead class="text-xs text-black uppercase bg-yellow-400 text-center"><tr>${kkaCols.map(c=>`<th class="py-3 px-4">${c.label}</th>`).join('')}${isEditMode?'<th class="py-3 px-4">Aksi</th>':''}</tr></thead><tbody id="kkaTbody" class="text-center">`;
    kkaTbl += appData.pantauanKKA.map((p,idx) => `<tr>${kkaCols.map(c=>isEditMode?`<td class="p-1 border"><input class="edit-input" data-key="${c.key}" value="${p[c.key]||''}"></td>`:`<td class="py-3 px-4">${p[c.key]||''}</td>`).join('')}${isEditMode?`<td class="p-1 border text-center"><button class="delete-row-btn" onclick="deleteTableRow('pantauanKKA', ${idx})">X</button></td>`:''}</tr>`).join('');
    kkaTbl += `</tbody></table>`;
    kkaContainer.innerHTML = kkaTbl;
    kkaControls.innerHTML = isEditMode ? `<button class="add-row-btn" onclick="addTableRow('pantauanKKA')">+ Tambah</button>` : '';
}

function saveChanges_pantauan_lintas() {
    const newHilirBd = saveTableData('taspat-hilir_bd-tbody'); if (newHilirBd) appData.pantauanTaspat.hilir_bd = newHilirBd;
    const newHuluBd = saveTableData('taspat-hulu_bd-tbody'); if (newHuluBd) appData.pantauanTaspat.hulu_bd = newHuluBd;
    const newHilirCkr = saveTableData('taspat-hilir_ckr-tbody'); if (newHilirCkr) appData.pantauanTaspat.hilir_ckr = newHilirCkr;
    const newHuluCkr = saveTableData('taspat-hulu_ckr-tbody'); if (newHuluCkr) appData.pantauanTaspat.hulu_ckr = newHuluCkr;
    const newWamJalan = saveTableData('perka-wam-jalan-tbody'); if (newWamJalan) appData.pantauanPerka.wam.jalan = newWamJalan;
    const newWamBatal = saveTableData('perka-wam-batal-tbody'); if (newWamBatal) appData.pantauanPerka.wam.batal = newWamBatal;
    const newPpkJalan = saveTableData('perka-ppk-jalan-tbody'); if (newPpkJalan) appData.pantauanPerka.ppk.jalan = newPpkJalan;
    const newPpkBatal = saveTableData('perka-ppk-batal-tbody'); if (newPpkBatal) appData.pantauanPerka.ppk.batal = newPpkBatal;
    const newWad = saveTableData('perka-wad-tbody'); if (newWad) appData.pantauanPerka.wad = newWad;
    const newKejadian = saveTableData('kejadianTbody'); if (newKejadian) appData.pantauanKejadian = newKejadian;
    const newKka = saveTableData('kkaTbody'); if (newKka) appData.pantauanKKA = newKka;
}

function render_keselamatan() {
    const contentEl = document.getElementById('keselamatan');
    const { ibpr, kebijakan, integritas, briefing } = appData.pageData.keselamatan;
    const createGallery = (title, images, dataKey) => {
        let itemsHtml = isEditMode ? images.map((img, index) => `<div class="relative"><img src="${img}" class="w-full h-auto rounded-lg shadow-md"><input class="edit-input mt-1" id="edit-${dataKey}-${index}" value="${img}"></div>`).join('') + `<div class="flex items-center justify-center border-2 border-dashed rounded-lg h-full"><button class="add-row-btn" onclick="addPhoto('${dataKey}')">+ Foto</button></div>` : images.map(img => `<img src="${img}" class="w-full h-auto rounded-lg shadow-md object-cover">`).join('');
        return `<div class="bg-white p-6 rounded-lg shadow"><h2 class="text-2xl font-bold text-[#0D2B4F] mb-4">${title}</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-4">${itemsHtml}</div></div>`;
    };
    const wartaCols = [{key:'no', label:'NO'}, {key:'warta', label:'WARTA DINAS'}, {key:'tentang', label:'TENTANG'}];
    let wartaTable = `<div class="bg-white p-6 rounded-lg shadow"><h2 class="text-xl font-bold text-[#0D2B4F] mb-4 text-center">Kumpulan Warta Dinas (WAD)</h2><div class="overflow-x-auto"><table class="w-full text-sm border-collapse border"><thead class="table-header"><tr>${wartaCols.map(c=>`<th class="p-2 border">${c.label}</th>`).join('')}${isEditMode?'<th class="p-2 border">Aksi</th>':''}</tr></thead><tbody id="wartaDinasTableBody" class="text-center">`;
    wartaTable += appData.wartaDinas.map((p,idx)=>`<tr>${wartaCols.map(c=>isEditMode?`<td class="p-1 border"><input class="edit-input" data-key="${c.key}" value="${p[c.key]||''}"></td>`:`<td class="p-2 border">${p[c.key]||''}</td>`).join('')}${isEditMode?`<td class="p-1 border"><button class="delete-row-btn" onclick="deleteTableRow('wartaDinas', ${idx})">X</button></td>`:''}</tr>`).join('');
    wartaTable += `</tbody></table></div>${isEditMode?'<div class="p-2"><button class="add-row-btn" onclick="addTableRow(\'wartaDinas\')">+ Tambah</button></div>':''}</div>`;
    let briefingHtml = `<div class="bg-white p-6 rounded-lg shadow"><h2 class="text-2xl font-bold text-[#0D2B4F] text-center">Safety Briefing Harian</h2><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"><div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow"><h3 class="font-bold text-lg mb-2"><i class="fas fa-bullhorn mr-2"></i>Pesan Keselamatan Hari Ini</h3>`;
    briefingHtml += isEditMode ? `<textarea id="edit-briefing-pesan" class="edit-textarea w-full">${briefing.pesan}</textarea>` : `<p>${briefing.pesan}</p>`;
    briefingHtml += `</div><div class="bg-red-50 p-6 rounded-lg shadow"><h3 class="font-bold text-lg mb-3 text-red-800"><i class="fas fa-exclamation-triangle mr-2"></i>Review Kejadian Terkini</h3>`;
    briefingHtml += isEditMode ? `<textarea id="edit-briefing-review" class="edit-textarea w-full">${briefing.review.replace(/<br>/g, '\n').replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<i>/g, '').replace(/<\/i>/g, '')}</textarea>` : `<p class="text-sm text-gray-700 space-y-2">${briefing.review}</p>`;
    briefingHtml += `</div></div></div>`;
    contentEl.innerHTML = `<div class="space-y-6">${createGallery('IBPR', ibpr, 'ibpr')}${createGallery('Kebijakan Keselamatan', kebijakan, 'kebijakan')}${createGallery('Fakta Integritas', integritas, 'integritas')}${wartaTable}${briefingHtml}</div>`;
}

function saveChanges_keselamatan() {
    const safeUpdate = (id, callback) => { const element = document.getElementById(id); if (element) callback(element.value); };
    ['ibpr', 'kebijakan', 'integritas'].forEach(key => {
        const newUrls = [];
        document.querySelectorAll(`[id^=edit-${key}-]`).forEach(input => newUrls.push(input.value));
        appData.pageData.keselamatan[key] = newUrls;
    });
    const newWartaDinas = saveTableData('wartaDinasTableBody');
    if (newWartaDinas !== null) {
        appData.wartaDinas = newWartaDinas;
    }
    safeUpdate('edit-briefing-pesan', value => appData.pageData.keselamatan.briefing.pesan = value);
    safeUpdate('edit-briefing-review', value => appData.pageData.keselamatan.briefing.review = value.replace(/\n/g, '<br>'));
}

function addPhoto(dataKey) {
    appData.pageData.keselamatan[dataKey].push('');
    rerenderCurrentSection();
}

function calculateEmployeeComposition() {
    let manajemenCount = 0;
    let masinisMadyaCount = 0;
    let masinisMudaCount = 0;
    let masinisPertamaCount = 0;

    appData.pegawai.forEach(p => {
        const jabatan = p.jabatan.toUpperCase();
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

    if (manajemenCount > 0) {
        labels.push('Manajemen');
        data.push(manajemenCount);
    }
    if (masinisMadyaCount > 0) {
        labels.push('Masinis Madya');
        data.push(masinisMadyaCount);
    }
    if (masinisMudaCount > 0) {
        labels.push('Masinis Muda');
        data.push(masinisMudaCount);
    }
    if (masinisPertamaCount > 0) {
        labels.push('Masinis Pertama');
        data.push(masinisPertamaCount);
    }

    return {
        labels: labels,
        data: data
    };
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
        'Masinis Pertama': '#000000'
    };

    const chartColors = composition.labels.map(label => colorMap[label]);

    const pegawaiCtx = document.getElementById('pegawaiChart')?.getContext('2d');
    if (pegawaiCtx) {
        new Chart(pegawaiCtx, {
            type: 'doughnut',
            data: { 
                labels: composition.labels, 
                datasets: [{ 
                    data: composition.data, 
                    backgroundColor: chartColors,
                    hoverOffset: 4 
                }] 
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { 
                    legend: { 
                        display: false 
                    } 
                } 
            }
        });

        const legendContainer = document.getElementById('pegawaiChart-legend');
        if (legendContainer) {
            const legendItems = composition.labels.map((label, index) => {
                const color = colorMap[label] || '#ccc';
                return `<div class="flex items-center justify-between py-1 text-sm">
                          <div class="flex items-center">
                            <span class="h-3 w-3 inline-block rounded-full mr-2" style="background-color: ${color};"></span>
                            <span>${label}</span>
                          </div>
                          <span class="font-bold text-gray-700">${composition.data[index]}</span>
                        </div>`;
            });
            legendContainer.innerHTML = legendItems.join('');
        }
    }
}
