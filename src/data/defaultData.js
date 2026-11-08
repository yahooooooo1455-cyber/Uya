export const SITE_PAGES = [
  {
    title: 'Halaman Muka',
    url: '/',
    desc: 'Beranda Kearifan Lokal di Kalimantan Selatan - Materi Bangun Datar Matematika Fase B Kelas 4 SD.'
  },
  {
    title: 'Petunjuk Pembelajaran',
    url: '/petunjuk',
    desc: 'Langkah-langkah pembelajaran yang perlu diikuti oleh peserta didik.'
  },
  {
    title: 'Tujuan Pembelajaran',
    url: '/tujuan-pembelajaran',
    desc: 'Mengidentifikasi bentuk bangun datar, menghitung keliling & luas, serta menghubungkannya dengan kearifan lokal Kalimantan Selatan.'
  },
  {
    title: 'Bahan Bacaan & Rumus Bangun Datar',
    url: '/bahan-bacaan',
    desc: 'Materi Persegi, Persegi Panjang (Kain Sasirangan), Segitiga (Atap Bubungan Tinggi), Belah Ketupat & Layang-layang (Tatah Ukir), dan Lingkaran (Tudung Saji Purun).'
  },
  {
    title: 'Video Pembelajaran',
    url: '/video-pembelajaran',
    desc: 'Kumpulan video pembelajaran Luas & Keliling Bangun Datar dan Pengukuran Luas.'
  },
  {
    title: 'Video Pembelajaran 1: Luas & Keliling Bangun Datar',
    url: '/video-pembelajaran-1',
    desc: 'Video Matematika Hebat membahas cara menghitung luas dan keliling bangun datar.'
  },
  {
    title: 'Video Pembelajaran 2: Pengukuran Luas Satuan Baku & Tidak Baku',
    url: '/video-pembelajaran-2',
    desc: 'Video Matematika Kelas 4 SD tentang pengukuran luas satuan baku dan tidak baku.'
  },
  {
    title: 'Ayo Berlatih',
    url: '/ayo-berlatih',
    desc: 'Menu latihan soal Pilihan Ganda dan Isian Bangun Datar Kelas 4.'
  },
  {
    title: 'Ayo Berlatih: Pilihan Ganda',
    url: '/pilihan-ganda',
    desc: 'Permainan kuis membuka kotak 1-10 soal pilihan ganda bangun datar & tautan/QR soal eksternal.'
  },
  {
    title: 'Ayo Berlatih: Soal Isian',
    url: '/isian',
    desc: 'Latihan soal cerita kain sasirangan, atap rumah Banjar, tudung saji lingkaran, dan ukiran pintu rumah Banjar.'
  },
  {
    title: 'Daftar Pustaka',
    url: '/daftar-pustaka',
    desc: 'Referensi SIBI - Sistem Informasi Perbukuan Indonesia Matematika untuk SD/MI Kelas IV.'
  },
  {
    title: 'Penyusun',
    url: '/penyusun',
    desc: 'Profil tim penyusun media pembelajaran: Najwa Ulya Nugrahaini, Denny Setyadi, dan Novia Alifah Mawardah.'
  }
];

export const DEFAULT_SITE_CONTENTS = {
  petunjuk: {
    intro: 'LANGKAH-LANGKAH PEMBELAJARAN YANG PERLU KALIAN IKUTI ADALAH SEBAGAI BERIKUT:',
    items: [
      'Bacalah tujuan pembelajaran agar kalian memahami kompetensi yang akan dicapai.',
      'Pelajari bahan bacaan sesuai dengan materi yang sedang dipelajari.',
      'Tonton video pembelajaran untuk memperdalam pemahaman terhadap materi.',
      'Selanjutnya, kerjakan tugas pada bagian Ayo Berlatih dengan sungguh-sungguh.',
      'Apabila masih belum memahami materi, kalian dapat membaca ulang bahan bacaan atau menonton kembali video pembelajaran.'
    ]
  },
  tujuan: {
    intro: '',
    items: [
      'Peserta didik mampu mengidentifikasi berbagai bentuk bangun datar.',
      'Peserta didik dapat menghitung keliling dan luas bangun datar sederhana.',
      'Peserta didik mampu menghubungkan materi bangun datar dengan kearifan lokal Kalimantan Selatan.'
    ]
  },
  bahan_bacaan: {
    show_simulator: true,
    slides: [
      {
        id: 1,
        url: '/assets/images/content-bahan-1.png',
        alt: 'Bahan Bacaan: Persegi, Persegi Panjang, dan Segitiga pada Kearifan Lokal Banjar'
      },
      {
        id: 2,
        url: '/assets/images/content-bahan-2.png',
        alt: 'Bahan Bacaan: Belah Ketupat, Layang-Layang, dan Lingkaran pada Kearifan Lokal Banjar'
      },
      {
        id: 3,
        url: '/assets/images/content-bahan-3.png',
        alt: 'Rumus Luas dan Keliling Bangun Datar'
      }
    ]
  },
  penyusun: {
    images: [
      {
        id: 1,
        url: '/assets/images/content-penyusun.png',
        alt: 'Tim Penyusun: Najwa Ulya Nugrahaini, Denny Setyadi, Novia Alifah Mawardah'
      }
    ]
  },
  latihan_config: {
    show_builtin_mc: true,
    show_builtin_essay: true
  }
};

export const DEFAULT_EXTERNAL_LINKS = [
  {
    id: 1,
    category: 'pilihan-ganda',
    title: 'Soal Pilihan Ganda Matematika Materi Bangun Datar Kelas IV Sekolah Dasar',
    description:
      'Membuka kotak - Ketuk setiap kotak secara giliran untuk membukanya dan mengungkapkan benda di dalamnya.',
    url: 'https://wordwall.net/id/resource/105516598',
    thumbnail_url: '/assets/images/thumb-wordwall.jpg',
    custom_qr_url: '/assets/images/qr-wordwall.jpg',
    show_qr: true
  },
  {
    id: 2,
    category: 'daftar-pustaka',
    title: 'SIBI - Sistem Informasi Perbukuan Indonesia',
    description:
      'Buku teks pelajaran sekolah dalam berbagai bentuk seperti PDF, Audio, dan Interaktif produksi resmi Pusat Perbukuan untuk mendukung kegiatan belajar mengajar yang lebih modern.',
    url: 'https://buku.kemendikdasmen.go.id/katalog/Matematika-untuk-SDMI-Kelas-IV',
    thumbnail_url: '/assets/images/thumb-sibi.jpg',
    custom_qr_url: '',
    show_qr: false
  }
];

export const DEFAULT_VIDEOS = [
  {
    id: 1,
    title: 'Video Pembelajaran 1',
    subtitle: 'Luas & Keliling Bangun Datar (Matematika Hebat)',
    youtube_url: 'https://www.youtube.com/watch?v=0Z2f5yppJbo',
    embed_url: 'https://www.youtube.com/embed/0Z2f5yppJbo?si=H06BgT2sksOG8Ha2',
    thumbnail_url: '/assets/images/thumb-video-1.png'
  },
  {
    id: 2,
    title: 'Video Pembelajaran 2',
    subtitle: 'Matematika Kelas 4 SD — Pengukuran Luas Satuan Baku dan Tidak Baku',
    youtube_url: 'https://www.youtube.com/watch?v=JveVvv32Dr4',
    embed_url: 'https://www.youtube.com/embed/JveVvv32Dr4?si=RiFu4kcUWG_HlanR',
    thumbnail_url: '/assets/images/thumb-video-2.png'
  }
];

export const DEFAULT_MC_QUESTIONS = [
  {
    id: 1,
    no: 1,
    color: '#ffb703',
    question: 'Motif kotak-kotak sama sisi pada kain Sasirangan berbentuk bangun datar...',
    options: ['A. Persegi', 'B. Segitiga', 'C. Lingkaran', 'D. Trapesium'],
    answer: 0,
    explain:
      'Bangun datar yang keempat sisinya sama panjang dan keempat sudutnya siku-siku adalah Persegi.'
  },
  {
    id: 2,
    no: 2,
    color: '#fde047',
    question: 'Sebuah persegi memiliki panjang sisi 12 cm. Berapakah keliling persegi tersebut?',
    options: ['A. 24 cm', 'B. 36 cm', 'C. 48 cm', 'D. 144 cm'],
    answer: 2,
    explain: 'Keliling persegi = 4 × sisi = 4 × 12 cm = 48 cm.'
  },
  {
    id: 3,
    no: 3,
    color: '#86efac',
    question:
      'Papan lantai rumah adat Banjar berbentuk persegi panjang dengan panjang 15 cm dan lebar 6 cm. Berapakah luasnya?',
    options: ['A. 42 cm²', 'B. 75 cm²', 'C. 90 cm²', 'D. 110 cm²'],
    answer: 2,
    explain: 'Luas persegi panjang = panjang × lebar = 15 × 6 = 90 cm².'
  },
  {
    id: 4,
    no: 4,
    color: '#7dd3fc',
    question: 'Atap rumah adat Banjar Bubungan Tinggi yang menjulang tinggi berbentuk bangun datar...',
    options: ['A. Lingkaran', 'B. Segitiga sama kaki', 'C. Belah ketupat', 'D. Persegi'],
    answer: 1,
    explain: 'Atap rumah Banjar Bubungan Tinggi memiliki bentuk segitiga sama kaki yang kokoh.'
  },
  {
    id: 5,
    no: 5,
    color: '#f0abfc',
    question: 'Sebuah segitiga memiliki alas 10 cm dan tinggi 8 cm. Berapakah luas segitiga tersebut?',
    options: ['A. 18 cm²', 'B. 40 cm²', 'C. 60 cm²', 'D. 80 cm²'],
    answer: 1,
    explain: 'Luas segitiga = ½ × alas × tinggi = ½ × 10 × 8 = 40 cm².'
  },
  {
    id: 6,
    no: 6,
    color: '#ffb703',
    question:
      'Kerajinan anyaman purun khas Kalimantan Selatan berupa tudung saji dan bakul bundar berbentuk...',
    options: ['A. Layang-layang', 'B. Persegi panjang', 'C. Lingkaran', 'D. Segitiga'],
    answer: 2,
    explain: 'Tudung saji dan bakul bundar dari anyaman purun berbentuk lingkaran.'
  },
  {
    id: 7,
    no: 7,
    color: '#fde047',
    question:
      'Motif tatah ukir Banjar pada pintu dan jendela tradisional yang memiliki 4 sisi sama panjang dan 2 diagonal saling tegak lurus adalah...',
    options: ['A. Belah ketupat', 'B. Segitiga', 'C. Lingkaran', 'D. Persegi panjang'],
    answer: 0,
    explain: 'Belah ketupat memiliki 4 sisi sama panjang dan luasnya dihitung dengan ½ × d1 × d2.'
  },
  {
    id: 8,
    no: 8,
    color: '#86efac',
    question:
      'Sebuah belah ketupat memiliki diagonal 1 (d1) = 14 cm dan diagonal 2 (d2) = 10 cm. Luasnya adalah...',
    options: ['A. 48 cm²', 'B. 70 cm²', 'C. 140 cm²', 'D. 24 cm²'],
    answer: 1,
    explain: 'Luas belah ketupat = ½ × d1 × d2 = ½ × 14 × 10 = 70 cm².'
  },
  {
    id: 9,
    no: 9,
    color: '#7dd3fc',
    question:
      'Sebuah lingkaran memiliki jari-jari (r) = 7 cm. Jika π = 22/7, maka keliling lingkaran tersebut adalah...',
    options: ['A. 22 cm', 'B. 44 cm', 'C. 88 cm', 'D. 154 cm'],
    answer: 1,
    explain: 'Keliling lingkaran = 2 × π × r = 2 × (22/7) × 7 = 44 cm.'
  },
  {
    id: 10,
    no: 10,
    color: '#f0abfc',
    question:
      'Sebuah layang-layang memiliki panjang sisi pendek 8 cm dan sisi panjang 15 cm. Berapakah keliling layang-layang tersebut?',
    options: ['A. 23 cm', 'B. 46 cm', 'C. 60 cm', 'D. 120 cm'],
    answer: 1,
    explain:
      'Keliling layang-layang = 2 × (sisi 1 + sisi 2) = 2 × (8 + 15) = 2 × 23 = 46 cm.'
  }
];

export const DEFAULT_ESSAY_QUESTIONS = [
  {
    id: 1,
    no: 1,
    question:
      '1. Perhatikan pola kain sasirangan. Jika motifnya berbentuk persegi dengan sisi 10 cm, berapakah kelilingnya?',
    placeholder: 'Ketik jawabanmu (contoh: 40)...',
    unit: 'cm',
    expected_answers: ['40', '40 cm'],
    solution_html:
      '<strong>Pembahasan Soal 1:</strong><br/>Diketahui: sisi persegi (<i>s</i>) = 10 cm.<br/>Rumus Keliling Persegi = 4 &times; <i>s</i> = 4 &times; 10 cm = <strong>40 cm</strong>.'
  },
  {
    id: 2,
    no: 2,
    question:
      '2. Sebuah atap rumah Banjar berbentuk segitiga dengan alas 8 m dan tinggi 6 m. Berapakah luas atap bagian depan rumah tersebut?',
    placeholder: 'Ketik jawabanmu (contoh: 24)...',
    unit: 'm²',
    expected_answers: ['24', '24 m2', '24 m²'],
    solution_html:
      '<strong>Pembahasan Soal 2:</strong><br/>Diketahui: alas (<i>a</i>) = 8 m, tinggi (<i>t</i>) = 6 m.<br/>Rumus Luas Segitiga = &frac12; &times; <i>a</i> &times; <i>t</i> = &frac12; &times; 8 &times; 6 = <strong>24 m&sup2;</strong>.'
  },
  {
    id: 3,
    no: 3,
    question:
      '3. Sebuah tudung saji berbentuk lingkaran memiliki diameter 60 cm. Hitunglah kelilingnya! (Gunakan π = 3,14)',
    placeholder: 'Ketik jawabanmu (contoh: 188,4)...',
    unit: 'cm',
    expected_answers: ['188.4', '188,4', '188.4 cm', '188,4 cm'],
    solution_html:
      '<strong>Pembahasan Soal 3:</strong><br/>Diketahui: diameter (<i>d</i>) = 60 cm (jari-jari <i>r</i> = 30 cm), &pi; = 3,14.<br/>Rumus Keliling Lingkaran = &pi; &times; <i>d</i> = 3,14 &times; 60 = <strong>188,4 cm</strong>.'
  },
  {
    id: 4,
    no: 4,
    question:
      '4. Ukiran pada pintu rumah Banjar berbentuk belah ketupat dengan diagonal 20 cm dan 12 cm. Berapa luas ukiran tersebut?',
    placeholder: 'Ketik jawabanmu (contoh: 120)...',
    unit: 'cm²',
    expected_answers: ['120', '120 cm2', '120 cm²'],
    solution_html:
      '<strong>Pembahasan Soal 4:</strong><br/>Diketahui: diagonal 1 (<i>d</i><sub>1</sub>) = 20 cm, diagonal 2 (<i>d</i><sub>2</sub>) = 12 cm.<br/>Rumus Luas Belah Ketupat = &frac12; &times; <i>d</i><sub>1</sub> &times; <i>d</i><sub>2</sub> = &frac12; &times; 20 &times; 12 = <strong>120 cm&sup2;</strong>.'
  }
];
