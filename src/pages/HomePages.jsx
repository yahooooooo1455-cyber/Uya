import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExternalLinkSection, { getDirectEmbedUrl } from '../components/ExternalLinkCardWithQR';
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
      if (res) {
        if (!Array.isArray(res.images) || res.images.length === 0) {
          setData({
            ...res,
            images: DEFAULT_SITE_CONTENTS.petunjuk.images
          });
        } else {
          setData(res);
        }
      }
    });
  }, []);

  const imageList = (
    Array.isArray(data?.images) &&
    data.images.length > 0 &&
    data.images[0].url !== '/assets/images/content-petunjuk.png'
      ? data.images
      : DEFAULT_SITE_CONTENTS.petunjuk.images
  ).slice(0, 1);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Petunjuk</h1>
      </section>
      <main className="main-content">
        <div className="slide-container">
          {imageList.map((img, idx) => (
            <img
              key={img.id || idx}
              src={img.url}
              alt={img.alt || `Petunjuk ${idx + 1}`}
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

export function TujuanPembelajaran() {
  const [data, setData] = useState(DEFAULT_SITE_CONTENTS.tujuan);

  useEffect(() => {
    fetchSiteContent('tujuan').then((res) => {
      if (res) {
        if (!Array.isArray(res.images) || res.images.length === 0) {
          setData({
            ...res,
            images: DEFAULT_SITE_CONTENTS.tujuan.images
          });
        } else {
          setData(res);
        }
      }
    });
  }, []);

  const imageList = (
    Array.isArray(data?.images) && data.images.length > 0
      ? data.images
      : DEFAULT_SITE_CONTENTS.tujuan.images
  ).slice(0, 1);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Tujuan Pembelajaran</h1>
      </section>
      <main className="main-content">
        <div className="slide-container">
          {imageList.map((img, idx) => (
            <img
              key={img.id || idx}
              src={img.url}
              alt={img.alt || `Tujuan Pembelajaran ${idx + 1}`}
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

export function BahanBacaan() {
  const [bahanData, setBahanData] = useState(DEFAULT_SITE_CONTENTS.bahan_bacaan);

  useEffect(() => {
    fetchSiteContent('bahan_bacaan').then((res) => {
      if (res && Array.isArray(res.links)) {
        setBahanData(res);
      }
    });
  }, []);

  const links = Array.isArray(bahanData?.links) ? bahanData.links : [];

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Bahan Bacaan</h1>
      </section>
      <main className="main-content">
        {links.length > 0 ? (
          <div className="video-grid-responsive">
            {links.map((item) => {
              const embedSrc = getDirectEmbedUrl(item.url);
              return (
                <div
                  key={item.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid rgba(30, 108, 147, 0.14)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* TAMPILAN LANGSUNG BAHAN BACAAN TANPA SAMPUL (SAMA SEPERTI MENU 4) */}
                  <div className="video-frame-wrap" style={{ borderRadius: 0, margin: 0 }}>
                    <iframe
                      src={embedSrc}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div
                    style={{
                      padding: '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '1.12rem',
                          fontWeight: 800,
                          color: 'var(--primary)'
                        }}
                      >
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div style={{ fontSize: '0.9rem', color: '#555', marginTop: '2px' }}>
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      Buka Bahan Bacaan ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              padding: '36px 24px',
              textAlign: 'center',
              maxWidth: '720px',
              margin: '0 auto',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(30, 108, 147, 0.14)'
            }}
          >
            <div style={{ fontSize: '2.4rem', marginBottom: '10px' }}>📚</div>
            <h3 style={{ color: 'var(--primary)', marginBottom: '6px' }}>
              Belum Ada Link Bahan Bacaan
            </h3>
            <p style={{ color: '#555', fontSize: '0.95rem' }}>
              Silakan tambahkan link Bahan Bacaan (Canva / Google Drive / Flipbook / Web) melalui
              Portal Guru pada menu No. 3.
            </p>
          </div>
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
  const [pustakaData, setPustakaData] = useState(DEFAULT_SITE_CONTENTS.daftar_pustaka);

  useEffect(() => {
    fetchSiteContent('daftar_pustaka').then((res) => {
      if (res && Array.isArray(res.images) && res.images.length > 0) {
        setPustakaData(res);
      }
    });
  }, []);

  const imageList = (
    Array.isArray(pustakaData?.images) && pustakaData.images.length > 0
      ? pustakaData.images
      : DEFAULT_SITE_CONTENTS.daftar_pustaka.images
  ).slice(0, 1);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Daftar Pustaka</h1>
      </section>
      <main className="main-content">
        <div className="slide-container">
          {imageList.map((img, idx) => (
            <img
              key={img.id || idx}
              src={img.url}
              alt={img.alt || 'Daftar Pustaka'}
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
