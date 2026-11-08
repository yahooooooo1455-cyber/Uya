import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExternalLinkSection from '../components/ExternalLinkCardWithQR';
import { fetchExternalLinks, fetchSiteContent } from '../lib/dataService';
import { DEFAULT_SITE_CONTENTS } from '../data/defaultData';

export function HalamanMuka() {
  return (
    <>
      <section className="hero-home">
        <div className="hero-home-inner">
          <img
            src="/assets/images/banner-purun.jpg"
            alt="Matematika BAB 1: Penjumlahan dan Pengurangan Bilangan Cacah sampai 100 - Kelas 3 SD - Menghitung Kerajinan Purun Kita"
          />
        </div>
      </section>

      <main className="main-content">
        {/* Row 1: Petunjuk, Tujuan, Bahan Bacaan */}
        <div className="menu-grid-3">
          <div className="menu-card">
            <Link to="/petunjuk" className="menu-card-img-link">
              <img
                src="/assets/images/purun-petunjuk.jpg"
                alt="Petunjuk"
                className="menu-card-img"
              />
            </Link>
            <Link to="/petunjuk" className="btn-pill">
              Petunjuk
            </Link>
          </div>

          <div className="menu-card">
            <Link to="/tujuan-pembelajaran" className="menu-card-img-link">
              <img
                src="/assets/images/purun-tujuan.jpg"
                alt="Tujuan Pembelajaran"
                className="menu-card-img"
              />
            </Link>
            <Link to="/tujuan-pembelajaran" className="btn-pill">
              Tujuan
            </Link>
          </div>

          <div className="menu-card">
            <Link to="/bahan-bacaan" className="menu-card-img-link">
              <img
                src="/assets/images/purun-bahan-bacaan.jpg"
                alt="Bahan Bacaan"
                className="menu-card-img"
              />
            </Link>
            <Link to="/bahan-bacaan" className="btn-pill">
              Bahan Bacaan
            </Link>
          </div>
        </div>

        {/* Row 2: Video Pembelajaran, Ayo Berlatih, Daftar Pustaka */}
        <div className="menu-grid-3">
          <div className="menu-card">
            <Link to="/video-pembelajaran" className="menu-card-img-link">
              <img
                src="/assets/images/purun-video.jpg"
                alt="Video Pembelajaran"
                className="menu-card-img"
              />
            </Link>
            <Link to="/video-pembelajaran" className="btn-pill">
              Video Pembelajaran
            </Link>
          </div>

          <div className="menu-card">
            <Link to="/ayo-berlatih" className="menu-card-img-link">
              <img
                src="/assets/images/purun-ayo-berlatih.jpg"
                alt="Ayo Berlatih"
                className="menu-card-img"
              />
            </Link>
            <Link to="/ayo-berlatih" className="btn-pill">
              Ayo Berlatih
            </Link>
          </div>

          <div className="menu-card">
            <Link to="/daftar-pustaka" className="menu-card-img-link">
              <img
                src="/assets/images/purun-daftar-pustaka.jpg"
                alt="Daftar Pustaka"
                className="menu-card-img"
              />
            </Link>
            <Link to="/daftar-pustaka" className="btn-pill">
              Daftar Pustaka
            </Link>
          </div>
        </div>

        {/* Row 3: Penulis */}
        <div className="menu-grid-1">
          <div className="menu-card">
            <Link to="/penyusun" className="menu-card-img-link">
              <img
                src="/assets/images/purun-penulis.jpg"
                alt="Penulis"
                className="menu-card-img"
              />
            </Link>
            <Link to="/penyusun" className="btn-pill">
              Penulis
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

/**
 * Komponen Papan Teks Kearifan Lokal (untuk Petunjuk & Tujuan Pembelajaran)
 * Menampilkan kotak tengah oranye dengan teks dinamis yang diinput oleh Guru tanpa perlu upload gambar.
 */
function KearifanTextBoard({ badgeTitle, intro, items = [] }) {
  return (
    <div className="kearifan-board">
      <div className="kearifan-board-badge">{badgeTitle}</div>
      <div className="kearifan-board-orange-box">
        {intro && <div className="kearifan-board-intro">{intro}</div>}
        <ol className="kearifan-board-list">
          {items.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function Petunjuk() {
  const [data, setData] = useState(DEFAULT_SITE_CONTENTS.petunjuk);

  useEffect(() => {
    fetchSiteContent('petunjuk').then((res) => {
      if (res) setData(res);
    });
  }, []);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Petunjuk</h1>
      </section>
      <main className="main-content">
        <div className="slide-container">
          <KearifanTextBoard
            badgeTitle="Petunjuk"
            intro={data.intro}
            items={data.items || []}
          />
        </div>
        <div className="btn-back-wrap">
          <Link to="/" className="btn-pill">
            Back
          </Link>
        </div>
      </main>
    </>
  );
}

export function TujuanPembelajaran() {
  const [data, setData] = useState(DEFAULT_SITE_CONTENTS.tujuan);

  useEffect(() => {
    fetchSiteContent('tujuan').then((res) => {
      if (res) setData(res);
    });
  }, []);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Tujuan Pembelajaran</h1>
      </section>
      <main className="main-content">
        <div className="slide-container">
          <KearifanTextBoard
            badgeTitle="Tujuan Pembelajaran"
            intro={data.intro}
            items={data.items || []}
          />
        </div>
        <div className="btn-back-wrap">
          <Link to="/" className="btn-pill">
            Back
          </Link>
        </div>
      </main>
    </>
  );
}

export function BahanBacaan() {
  const [bahanData, setBahanData] = useState(DEFAULT_SITE_CONTENTS.bahan_bacaan);
  const [simMode, setSimMode] = useState('purun'); // 'purun' | 'bangun_datar'

  // State Simulasi Kerajinan Purun (Penjumlahan & Pengurangan Bilangan Cacah s.d. 100)
  const [bendaPurun, setBendaPurun] = useState('Tas Anyaman Purun 👜');
  const [operasi, setOperasi] = useState('+');
  const [angka1, setAngka1] = useState(24);
  const [angka2, setAngka2] = useState(15);

  // State Simulasi Kalkulator Bangun Datar
  const [sisi, setSisi] = useState('');
  const [panjang, setPanjang] = useState('');
  const [lebar, setLebar] = useState('');
  const [alas, setAlas] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [jari, setJari] = useState('');

  useEffect(() => {
    fetchSiteContent('bahan_bacaan').then((res) => {
      if (res && Array.isArray(res.slides)) setBahanData(res);
    });
  }, []);

  const n1 = Math.max(0, Math.min(100, parseInt(angka1 || 0, 10)));
  const n2 = Math.max(0, Math.min(100, parseInt(angka2 || 0, 10)));
  const hasilPurun = operasi === '+' ? n1 + n2 : n1 - n2;
  const puluhan1 = Math.floor(n1 / 10);
  const satuan1 = n1 % 10;
  const puluhan2 = Math.floor(n2 / 10);
  const satuan2 = n2 % 10;
  const puluhanHasil = Math.floor(Math.abs(hasilPurun) / 10);
  const satuanHasil = Math.abs(hasilPurun) % 10;

  const s = parseFloat(sisi || 0);
  const p = parseFloat(panjang || 0);
  const l = parseFloat(lebar || 0);
  const a = parseFloat(alas || 0);
  const t = parseFloat(tinggi || 0);
  const r = parseFloat(jari || 0);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Bahan Bacaan</h1>
      </section>
      <main className="main-content">
        <div className="slide-container">
          {(bahanData.slides || []).map((slide, idx) => (
            <img
              key={slide.id || idx}
              src={slide.url}
              alt={slide.alt || `Bahan Bacaan Slide ${idx + 1}`}
              className="slide-img"
            />
          ))}
        </div>

        {bahanData.show_simulator !== false && (
          <section className="interactive-panel">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '12px'
              }}
            >
              <div>
                <h2 className="panel-title" style={{ marginBottom: '4px' }}>
                  🧮 Simulasi Interaktif: Menghitung Kerajinan Purun Kita
                </h2>
                <p className="panel-subtitle" style={{ marginBottom: 0 }}>
                  Penjumlahan &amp; Pengurangan Bilangan Cacah sampai 100 (Kelas 3 SD)
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className={`btn-sm ${simMode === 'purun' ? '' : 'btn-outline'}`}
                  onClick={() => setSimMode('purun')}
                >
                  🧺 Bilangan Cacah (Purun)
                </button>
                <button
                  type="button"
                  className={`btn-sm ${simMode === 'bangun_datar' ? '' : 'btn-outline'}`}
                  onClick={() => setSimMode('bangun_datar')}
                >
                  📐 Bangun Datar
                </button>
              </div>
            </div>

            {simMode === 'purun' ? (
              <div>
                <div className="calc-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                  <div className="calc-card">
                    <h4>1. Pilih Jenis Kerajinan Purun</h4>
                    <select
                      value={bendaPurun}
                      onChange={(e) => setBendaPurun(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #c5d7e2',
                        fontWeight: 700,
                        fontFamily: 'inherit'
                      }}
                    >
                      <option value="Tas Anyaman Purun 👜">Tas Anyaman Purun 👜</option>
                      <option value="Topi Purun 👒">Topi Purun 👒</option>
                      <option value="Bakul Purun 🧺">Bakul Purun 🧺</option>
                      <option value="Tikar Purun 🟫">Tikar Purun 🟫</option>
                    </select>
                  </div>

                  <div className="calc-card">
                    <h4>2. Pilih Operasi Hitung</h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        className={`btn-sm ${operasi === '+' ? '' : 'btn-outline'}`}
                        style={{ flex: 1 }}
                        onClick={() => setOperasi('+')}
                      >
                        ➕ Penjumlahan (+)
                      </button>
                      <button
                        type="button"
                        className={`btn-sm ${operasi === '-' ? '' : 'btn-outline'}`}
                        style={{ flex: 1 }}
                        onClick={() => setOperasi('-')}
                      >
                        ➖ Pengurangan (-)
                      </button>
                    </div>
                  </div>

                  <div className="calc-card">
                    <h4>3. Masukkan Bilangan (0 – 100)</h4>
                    <div className="calc-row" style={{ alignItems: 'center', marginBottom: 0 }}>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={angka1}
                        onChange={(e) => setAngka1(e.target.value)}
                        placeholder="Bilangan 1"
                      />
                      <strong style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>
                        {operasi}
                      </strong>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={angka2}
                        onChange={(e) => setAngka2(e.target.value)}
                        placeholder="Bilangan 2"
                      />
                    </div>
                  </div>
                </div>

                {/* HASIL & URAIAN NILAI TEMPAT PULUHAN / SATUAN */}
                <div
                  style={{
                    marginTop: '18px',
                    background: '#ffffff',
                    borderRadius: '14px',
                    padding: '20px',
                    border: '2px solid rgba(30, 108, 147, 0.2)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--primary)',
                      marginBottom: '12px',
                      textAlign: 'center'
                    }}
                  >
                    {n1} {bendaPurun} {operasi} {n2} {bendaPurun} ={' '}
                    <span
                      style={{
                        background: 'var(--primary)',
                        color: '#fff',
                        padding: '4px 14px',
                        borderRadius: '99px',
                        marginLeft: '6px'
                      }}
                    >
                      {hasilPurun} {bendaPurun}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '12px',
                      marginTop: '14px'
                    }}
                  >
                    <div className="calc-result" style={{ marginTop: 0 }}>
                      <div>
                        <strong>Bilangan Pertama ({n1}):</strong>
                      </div>
                      <div>
                        {puluhan1} Puluhan ({puluhan1 * 10}) + {satuan1} Satuan
                      </div>
                    </div>

                    <div className="calc-result" style={{ marginTop: 0 }}>
                      <div>
                        <strong>Bilangan Kedua ({n2}):</strong>
                      </div>
                      <div>
                        {puluhan2} Puluhan ({puluhan2 * 10}) + {satuan2} Satuan
                      </div>
                    </div>

                    <div
                      className="calc-result"
                      style={{
                        marginTop: 0,
                        background: '#dcfce7',
                        color: '#14532d'
                      }}
                    >
                      <div>
                        <strong>Hasil Akhir ({hasilPurun}):</strong>
                      </div>
                      <div>
                        {hasilPurun < 0
                          ? `Kurang ${Math.abs(hasilPurun)} (Bilangan pertama lebih kecil)`
                          : `${puluhanHasil} Puluhan (${puluhanHasil * 10}) + ${satuanHasil} Satuan`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="calc-grid">
                <div className="calc-card">
                  <h4>1. Persegi (Motif Sasirangan)</h4>
                  <div className="calc-row">
                    <input
                      type="number"
                      placeholder="Panjang sisi (cm)"
                      value={sisi}
                      onChange={(e) => setSisi(e.target.value)}
                    />
                  </div>
                  <div className="calc-result">
                    {s > 0
                      ? `Luas = ${s * s} cm² | Keliling = ${4 * s} cm`
                      : 'Luas = s × s | Keliling = 4 × s'}
                  </div>
                </div>

                <div className="calc-card">
                  <h4>2. Persegi Panjang (Tikar Purun)</h4>
                  <div className="calc-row">
                    <input
                      type="number"
                      placeholder="Panjang p (cm)"
                      value={panjang}
                      onChange={(e) => setPanjang(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Lebar l (cm)"
                      value={lebar}
                      onChange={(e) => setLebar(e.target.value)}
                    />
                  </div>
                  <div className="calc-result">
                    {p > 0 && l > 0
                      ? `Luas = ${p * l} cm² | Keliling = ${2 * (p + l)} cm`
                      : 'Luas = p × l | Keliling = 2 × (p + l)'}
                  </div>
                </div>

                <div className="calc-card">
                  <h4>3. Segitiga (Atap Bubungan Tinggi)</h4>
                  <div className="calc-row">
                    <input
                      type="number"
                      placeholder="Alas (cm)"
                      value={alas}
                      onChange={(e) => setAlas(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Tinggi (cm)"
                      value={tinggi}
                      onChange={(e) => setTinggi(e.target.value)}
                    />
                  </div>
                  <div className="calc-result">
                    {a > 0 && t > 0
                      ? `Luas = ${0.5 * a * t} cm²`
                      : 'Luas = ½ × alas × tinggi'}
                  </div>
                </div>

                <div className="calc-card">
                  <h4>4. Lingkaran (Tudung Saji Purun)</h4>
                  <div className="calc-row">
                    <input
                      type="number"
                      placeholder="Jari-jari r (cm)"
                      value={jari}
                      onChange={(e) => setJari(e.target.value)}
                    />
                  </div>
                  <div className="calc-result">
                    {r > 0
                      ? `Luas = ${(3.14 * r * r).toFixed(2)} cm² | Keliling = ${(2 * 3.14 * r).toFixed(2)} cm`
                      : 'Luas = π × r² | Keliling = 2 × π × r'}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        <div className="btn-back-wrap">
          <Link to="/" className="btn-pill">
            Back
          </Link>
        </div>
      </main>
    </>
  );
}

export function DaftarPustaka() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchExternalLinks('daftar-pustaka').then(setLinks);
  }, []);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Daftar Pustaka</h1>
      </section>
      <main className="main-content">
        <ExternalLinkSection links={links} />

        <div className="btn-back-wrap">
          <Link to="/" className="btn-pill">
            Back
          </Link>
        </div>
      </main>
    </>
  );
}

export function Penyusun() {
  const [penyusunData, setPenyusunData] = useState(DEFAULT_SITE_CONTENTS.penyusun);

  useEffect(() => {
    fetchSiteContent('penyusun').then((res) => {
      if (res && Array.isArray(res.images)) setPenyusunData(res);
    });
  }, []);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Penulis</h1>
      </section>
      <main className="main-content">
        <div className="slide-container">
          {(penyusunData.images || []).map((img, idx) => (
            <img
              key={img.id || idx}
              src={img.url}
              alt={img.alt || 'Tim Penulis'}
              className="slide-img"
            />
          ))}
        </div>
        <div className="btn-back-wrap">
          <Link to="/" className="btn-pill">
            Back
          </Link>
        </div>
      </main>
    </>
  );
}
