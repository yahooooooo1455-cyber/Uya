// ==================== SITE SEARCH DATA ====================
const SITE_PAGES = [
  {
    title: 'Halaman Muka',
    url: 'index.html',
    desc: 'Beranda Kearifan Lokal di Kalimantan Selatan - Materi Bangun Datar Matematika Fase B Kelas 4 SD.'
  },
  {
    title: 'Petunjuk Pembelajaran',
    url: 'petunjuk.html',
    desc: 'Langkah-langkah pembelajaran yang perlu diikuti oleh peserta didik.'
  },
  {
    title: 'Tujuan Pembelajaran',
    url: 'tujuan-pembelajaran.html',
    desc: 'Mengidentifikasi bentuk bangun datar, menghitung keliling & luas, serta menghubungkannya dengan kearifan lokal Kalimantan Selatan.'
  },
  {
    title: 'Bahan Bacaan & Rumus Bangun Datar',
    url: 'bahan-bacaan.html',
    desc: 'Materi Persegi, Persegi Panjang (Kain Sasirangan), Segitiga (Atap Bubungan Tinggi), Belah Ketupat & Layang-layang (Tatah Ukir), dan Lingkaran (Tudung Saji Purun).'
  },
  {
    title: 'Video Pembelajaran',
    url: 'video-pembelajaran.html',
    desc: 'Kumpulan video pembelajaran Luas & Keliling Bangun Datar dan Pengukuran Luas.'
  },
  {
    title: 'Video Pembelajaran 1: Luas & Keliling Bangun Datar',
    url: 'video-pembelajaran-1.html',
    desc: 'Video Matematika Hebat membahas cara menghitung luas dan keliling bangun datar.'
  },
  {
    title: 'Video Pembelajaran 2: Pengukuran Luas Satuan Baku & Tidak Baku',
    url: 'video-pembelajaran-2.html',
    desc: 'Video Matematika Kelas 4 SD tentang pengukuran luas satuan baku dan tidak baku.'
  },
  {
    title: 'Ayo Berlatih',
    url: 'ayo-berlatih.html',
    desc: 'Menu latihan soal Pilihan Ganda dan Isian Bangun Datar Kelas 4.'
  },
  {
    title: 'Ayo Berlatih: Pilihan Ganda (Membuka Kotak)',
    url: 'pilihan-ganda.html',
    desc: 'Permainan kuis membuka kotak 1-10 soal pilihan ganda bangun datar & tautan Wordwall.'
  },
  {
    title: 'Ayo Berlatih: Soal Isian Kearifan Lokal Banjar',
    url: 'isian.html',
    desc: 'Latihan soal cerita kain sasirangan, atap rumah Banjar, tudung saji lingkaran, dan ukiran pintu rumah Banjar.'
  },
  {
    title: 'Daftar Pustaka',
    url: 'daftar-pustaka.html',
    desc: 'Referensi SIBI - Sistem Informasi Perbukuan Indonesia Matematika untuk SD/MI Kelas IV.'
  },
  {
    title: 'Penyusun',
    url: 'penyusun.html',
    desc: 'Profil tim penyusun media pembelajaran: Najwa Ulya Nugrahaini, Denny Setyadi, dan Novia Alifah Mawardah.'
  }
];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initSearchModal();
  initPilihanGandaGame();
  initIsianChecker();
});

// ==================== MOBILE DRAWER ====================
function initMobileDrawer() {
  const openBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');

  if (!openBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  };

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
}

// ==================== SEARCH MODAL ====================
function initSearchModal() {
  const searchBtn = document.getElementById('openSearchBtn');
  const modal = document.getElementById('searchModal');
  const closeBtn = document.getElementById('closeSearchBtn');
  const input = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('searchResults');

  if (!searchBtn || !modal || !input || !resultsContainer) return;

  const renderResults = (query) => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? SITE_PAGES.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.desc.toLowerCase().includes(q)
        )
      : SITE_PAGES;

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<div style="padding:14px;color:#666;text-align:center;">Tidak ditemukan hasil untuk "<strong>${query}</strong>"</div>`;
      return;
    }

    resultsContainer.innerHTML = filtered
      .map(
        (p) => `
        <a class="search-result-item" href="${p.url}">
          <div class="search-result-title">${p.title}</div>
          <div class="search-result-desc">${p.desc}</div>
        </a>
      `
      )
      .join('');
  };

  searchBtn.addEventListener('click', () => {
    modal.classList.add('open');
    renderResults('');
    setTimeout(() => input.focus(), 80);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('open');
  });

  input.addEventListener('input', (e) => renderResults(e.target.value));
}

// ==================== PILIHAN GANDA: MEMBUKA KOTAK 1-10 ====================
const KOTAK_QUESTIONS = [
  {
    no: 1,
    color: '#ffb703',
    q: 'Motif kotak-kotak sama sisi pada kain Sasirangan berbentuk bangun datar...',
    options: ['A. Persegi', 'B. Segitiga', 'C. Lingkaran', 'D. Trapesium'],
    answer: 0,
    explain: 'Bangun datar yang keempat sisinya sama panjang dan keempat sudutnya siku-siku adalah Persegi.'
  },
  {
    no: 2,
    color: '#fde047',
    q: 'Sebuah persegi memiliki panjang sisi 12 cm. Berapakah keliling persegi tersebut?',
    options: ['A. 24 cm', 'B. 36 cm', 'C. 48 cm', 'D. 144 cm'],
    answer: 2,
    explain: 'Keliling persegi = 4 × sisi = 4 × 12 cm = 48 cm.'
  },
  {
    no: 3,
    color: '#86efac',
    q: 'Papan lantai rumah adat Banjar berbentuk persegi panjang dengan panjang 15 cm dan lebar 6 cm. Berapakah luasnya?',
    options: ['A. 42 cm²', 'B. 75 cm²', 'C. 90 cm²', 'D. 110 cm²'],
    answer: 2,
    explain: 'Luas persegi panjang = panjang × lebar = 15 × 6 = 90 cm².'
  },
  {
    no: 4,
    color: '#7dd3fc',
    q: 'Atap rumah adat Banjar Bubungan Tinggi yang menjulang tinggi berbentuk bangun datar...',
    options: ['A. Lingkaran', 'B. Segitiga sama kaki', 'C. Belah ketupat', 'D. Persegi'],
    answer: 1,
    explain: 'Atap rumah Banjar Bubungan Tinggi memiliki bentuk segitiga sama kaki yang kokoh.'
  },
  {
    no: 5,
    color: '#f0abfc',
    q: 'Sebuah segitiga memiliki alas 10 cm dan tinggi 8 cm. Berapakah luas segitiga tersebut?',
    options: ['A. 18 cm²', 'B. 40 cm²', 'C. 60 cm²', 'D. 80 cm²'],
    answer: 1,
    explain: 'Luas segitiga = ½ × alas × tinggi = ½ × 10 × 8 = 40 cm².'
  },
  {
    no: 6,
    color: '#ffb703',
    q: 'Kerajinan anyaman purun khas Kalimantan Selatan berupa tudung saji dan bakul bundar berbentuk...',
    options: ['A. Layang-layang', 'B. Persegi panjang', 'C. Lingkaran', 'D. Segitiga'],
    answer: 2,
    explain: 'Tudung saji dan bakul bundar dari anyaman purun berbentuk lingkaran.'
  },
  {
    no: 7,
    color: '#fde047',
    q: 'Motif tatah ukir Banjar pada pintu dan jendela tradisional yang memiliki 4 sisi sama panjang dan 2 diagonal saling tegak lurus adalah...',
    options: ['A. Belah ketupat', 'B. Segitiga', 'C. Lingkaran', 'D. Persegi panjang'],
    answer: 0,
    explain: 'Belah ketupat memiliki 4 sisi sama panjang dan luasnya dihitung dengan ½ × d1 × d2.'
  },
  {
    no: 8,
    color: '#86efac',
    q: 'Sebuah belah ketupat memiliki diagonal 1 (d1) = 14 cm dan diagonal 2 (d2) = 10 cm. Luasnya adalah...',
    options: ['A. 48 cm²', 'B. 70 cm²', 'C. 140 cm²', 'D. 24 cm²'],
    answer: 1,
    explain: 'Luas belah ketupat = ½ × d1 × d2 = ½ × 14 × 10 = 70 cm².'
  },
  {
    no: 9,
    color: '#7dd3fc',
    q: 'Sebuah lingkaran memiliki jari-jari (r) = 7 cm. Jika π = 22/7, maka keliling lingkaran tersebut adalah...',
    options: ['A. 22 cm', 'B. 44 cm', 'C. 88 cm', 'D. 154 cm'],
    answer: 1,
    explain: 'Keliling lingkaran = 2 × π × r = 2 × (22/7) × 7 = 44 cm.'
  },
  {
    no: 10,
    color: '#f0abfc',
    q: 'Sebuah layang-layang memiliki panjang sisi pendek 8 cm dan sisi panjang 15 cm. Berapakah keliling layang-layang tersebut?',
    options: ['A. 23 cm', 'B. 46 cm', 'C. 60 cm', 'D. 120 cm'],
    answer: 1,
    explain: 'Keliling layang-layang = 2 × (sisi 1 + sisi 2) = 2 × (8 + 15) = 2 × 23 = 46 cm.'
  }
];

function initPilihanGandaGame() {
  const grid = document.getElementById('kotakGrid');
  const card = document.getElementById('quizActiveCard');
  const scoreEl = document.getElementById('quizScoreBadge');
  const resetBtn = document.getElementById('resetQuizBtn');

  if (!grid || !card) return;

  let state = {};

  const updateScore = () => {
    const answeredCount = Object.keys(state).length;
    const correctCount = Object.values(state).filter((v) => v === true).length;
    if (scoreEl) {
      scoreEl.textContent = `Skor: ${correctCount * 10} / 100 (${answeredCount}/10 Kotak Terbuka)`;
    }
  };

  const renderGrid = () => {
    grid.innerHTML = KOTAK_QUESTIONS.map((item) => {
      const status = state[item.no];
      let cls = '';
      let badge = 'Ketuk Kotak';
      if (status === true) {
        cls = 'answered-correct';
        badge = '✓ Benar';
      } else if (status === false) {
        cls = 'answered-wrong';
        badge = '✗ Salah';
      }
      return `
        <div class="mystery-box ${cls}" style="background:${item.color}" data-no="${item.no}">
          <div class="mystery-box-inner">
            <span>${item.no}</span>
            <span class="mystery-status">${badge}</span>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.mystery-box').forEach((box) => {
      box.addEventListener('click', () => {
        const no = parseInt(box.getAttribute('data-no'), 10);
        openQuestion(no);
      });
    });
    updateScore();
  };

  const openQuestion = (no) => {
    const item = KOTAK_QUESTIONS.find((q) => q.no === no);
    if (!item) return;

    const alreadyAnswered = state.hasOwnProperty(no);
    card.classList.add('active');
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="background:var(--primary);color:#fff;padding:4px 12px;border-radius:99px;font-weight:800;font-size:0.88rem;">Kotak Nomor ${item.no}</span>
        <span style="font-size:0.86rem;color:#666;">Pilih jawaban yang paling tepat</span>
      </div>
      <div style="font-size:1.12rem;font-weight:800;color:#222;">${item.q}</div>
      <div class="mc-options">
        ${item.options
          .map(
            (opt, idx) => `
          <button class="mc-btn" data-idx="${idx}" ${alreadyAnswered ? 'disabled' : ''}>${opt}</button>
        `
          )
          .join('')}
      </div>
      <div id="mcExplain" style="margin-top:14px;display:${alreadyAnswered ? 'block' : 'none'};padding:12px;background:#fff;border-radius:8px;border-left:4px solid var(--primary);font-size:0.93rem;">
        <strong> Pembahasan:</strong> ${item.explain}
      </div>
    `;

    const btns = card.querySelectorAll('.mc-btn');
    if (alreadyAnswered) {
      btns[item.answer].classList.add('correct');
    } else {
      btns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const picked = parseInt(btn.getAttribute('data-idx'), 10);
          const isCorrect = picked === item.answer;
          state[no] = isCorrect;
          btns.forEach((b) => (b.disabled = true));
          if (isCorrect) {
            btn.classList.add('correct');
          } else {
            btn.classList.add('wrong');
            btns[item.answer].classList.add('correct');
          }
          const exp = document.getElementById('mcExplain');
          if (exp) exp.style.display = 'block';
          renderGrid();
        });
      });
    }
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state = {};
      card.classList.remove('active');
      card.innerHTML = '';
      renderGrid();
    });
  }

  renderGrid();
}

// ==================== ISIAN: ESSAY CHECKER ====================
function initIsianChecker() {
  const checkAllBtn = document.getElementById('checkIsianBtn');
  const toggleSolBtn = document.getElementById('toggleSolutionsBtn');

  if (!checkAllBtn) return;

  // Answers:
  // 1) Keliling persegi sisi 10 cm = 40
  // 2) Luas segitiga alas 8 m, tinggi 6 m = 24
  // 3) Keliling lingkaran d=60 cm, pi=3.14 -> 188.4 (accept 188,4 or 188.4)
  // 4) Luas belah ketupat d1=20, d2=12 -> 120
  const expected = {
    1: ['40', '40 cm'],
    2: ['24', '24 m2', '24 m²'],
    3: ['188.4', '188,4', '188.4 cm', '188,4 cm'],
    4: ['120', '120 cm2', '120 cm²']
  };

  checkAllBtn.addEventListener('click', () => {
    let correct = 0;
    for (let i = 1; i <= 4; i++) {
      const inp = document.getElementById(`isianInput${i}`);
      const fb = document.getElementById(`isianFeedback${i}`);
      if (!inp || !fb) continue;

      const val = inp.value.trim().toLowerCase();
      const isOk = expected[i].includes(val);
      if (isOk) {
        correct++;
        fb.className = 'feedback-msg correct';
        fb.textContent = '✓ Jawaban benar! Hebat sekali!';
      } else {
        fb.className = 'feedback-msg wrong';
        fb.textContent = `✗ Belum tepat. Coba periksa kembali rumusnya (Jawaban tepat: ${expected[i][0]}).`;
      }
    }
    const scoreBanner = document.getElementById('isianScoreBanner');
    if (scoreBanner) {
      scoreBanner.style.display = 'block';
      scoreBanner.textContent = `Nilai Kamu: ${correct * 25} / 100 (${correct} dari 4 soal benar)`;
    }
  });

  if (toggleSolBtn) {
    toggleSolBtn.addEventListener('click', () => {
      document.querySelectorAll('.solution-box').forEach((box) => {
        box.classList.toggle('open');
      });
    });
  }
}

// ==================== BAHAN BACAAN: KALKULATOR BANGUN DATAR ====================
function calcPersegi() {
  const s = parseFloat(document.getElementById('calcSisi')?.value || 0);
  const out = document.getElementById('resPersegi');
  if (out) {
    out.textContent = s > 0 ? `Luas = ${s * s} cm² | Keliling = ${4 * s} cm` : 'Masukkan panjang sisi > 0';
  }
}

function calcPersegiPanjang() {
  const p = parseFloat(document.getElementById('calcP')?.value || 0);
  const l = parseFloat(document.getElementById('calcL')?.value || 0);
  const out = document.getElementById('resPersegiPanjang');
  if (out) {
    out.textContent =
      p > 0 && l > 0 ? `Luas = ${p * l} cm² | Keliling = ${2 * (p + l)} cm` : 'Masukkan p dan l > 0';
  }
}

function calcSegitiga() {
  const a = parseFloat(document.getElementById('calcAlas')?.value || 0);
  const t = parseFloat(document.getElementById('calcTinggi')?.value || 0);
  const out = document.getElementById('resSegitiga');
  if (out) {
    out.textContent =
      a > 0 && t > 0 ? `Luas = ${0.5 * a * t} cm²` : 'Masukkan alas dan tinggi > 0';
  }
}

function calcLingkaran() {
  const r = parseFloat(document.getElementById('calcJari')?.value || 0);
  const out = document.getElementById('resLingkaran');
  if (out) {
    const luas = (3.14 * r * r).toFixed(2);
    const kel = (2 * 3.14 * r).toFixed(2);
    out.textContent = r > 0 ? `Luas = ${luas} cm² | Keliling = ${kel} cm` : 'Masukkan jari-jari (r) > 0';
  }
}

