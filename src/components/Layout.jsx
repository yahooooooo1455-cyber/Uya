import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SITE_PAGES } from '../data/defaultData';

export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isGuruRoute =
    location.pathname.startsWith('/guru') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/kelola');

  useEffect(() => {
    setDrawerOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isVideoGroup = location.pathname.startsWith('/video-pembelajaran');
  const isLatihanGroup =
    location.pathname.startsWith('/ayo-berlatih') ||
    location.pathname === '/pilihan-ganda' ||
    location.pathname === '/isian';

  const filteredPages = searchQuery.trim()
    ? SITE_PAGES.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SITE_PAGES;

  return (
    <>
      {/* TOP NAVIGATION BAR */}
      <header className="site-header">
        <div className="nav-container">
          <div className="nav-left-group">
            <button
              className="icon-btn mobile-toggle"
              onClick={() => setDrawerOpen(true)}
              aria-label="Buka Navigasi"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link to="/" className="brand">
              <div className="brand-logos">
                <img
                  src="/assets/images/logo-ulm.png"
                  alt="Logo Universitas Lambung Mangkurat"
                  className="brand-logo"
                />
                <img
                  src="/assets/images/logo-pgsd.png"
                  alt="Logo PGSD ULM"
                  className="brand-logo"
                />
                <img
                  src="/assets/images/logo-diktisaintek.png"
                  alt="Logo Diktisaintek Berdampak"
                  className="brand-logo brand-logo-wide"
                />
              </div>
              <span className="brand-title">
                {isGuruRoute ? '👩‍🏫 Portal Guru' : 'Matematika Kelas 3'}
              </span>
            </Link>
          </div>

          {isGuruRoute ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/" className="btn-sm nav-switch-btn" style={{ textDecoration: 'none' }}>
                <span className="btn-desktop-text">👦 Lihat Tampilan Siswa</span>
                <span className="btn-mobile-text">👦 Siswa</span>
              </Link>
            </div>
          ) : (
            <>
              <nav aria-label="Navigasi Utama Siswa">
                <ul className="nav-links">
                  <li className="nav-item">
                    <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                      Halaman Muka
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/petunjuk"
                      className={`nav-link ${isActive('/petunjuk') ? 'active' : ''}`}
                    >
                      Petunjuk
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/tujuan-pembelajaran"
                      className={`nav-link ${isActive('/tujuan-pembelajaran') ? 'active' : ''}`}
                    >
                      Tujuan Pembelajaran
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/bahan-bacaan"
                      className={`nav-link ${isActive('/bahan-bacaan') ? 'active' : ''}`}
                    >
                      Bahan Bacaan
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/video-pembelajaran"
                      className={`nav-link ${isVideoGroup ? 'active' : ''}`}
                    >
                      Video Pembelajaran
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/ayo-berlatih"
                      className={`nav-link ${isLatihanGroup ? 'active' : ''}`}
                    >
                      Ayo Berlatih
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/daftar-pustaka"
                      className={`nav-link ${isActive('/daftar-pustaka') ? 'active' : ''}`}
                    >
                      Daftar Pustaka
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/penyusun"
                      className={`nav-link ${
                        isActive('/penyusun') || isActive('/penulis') ? 'active' : ''
                      }`}
                    >
                      Penulis
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="nav-actions">
                <button
                  className="icon-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchOpen(true);
                  }}
                  title="Cari di situs ini"
                  aria-label="Cari di situs ini"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* MOBILE DRAWER (UNTUK SISWA) */}
      <div
        className={`drawer-overlay ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      ></div>
      <aside className={`mobile-drawer ${drawerOpen ? 'open' : ''}`} aria-label="Menu Seluler">
        <div className="drawer-header">
          <Link to="/" className="brand">
            <div className="brand-logos">
              <img
                src="/assets/images/logo-ulm.png"
                alt="Logo ULM"
                className="brand-logo"
                style={{ height: '28px' }}
              />
              <img
                src="/assets/images/logo-pgsd.png"
                alt="Logo PGSD"
                className="brand-logo"
                style={{ height: '28px' }}
              />
              <img
                src="/assets/images/logo-diktisaintek.png"
                alt="Logo Diktisaintek"
                className="brand-logo brand-logo-wide"
                style={{ height: '22px' }}
              />
            </div>
            <span className="brand-title" style={{ fontSize: '0.98rem', color: '#ffffff' }}>
              Matematika Kelas 3
            </span>
          </Link>
          <button
            className="icon-btn"
            onClick={() => setDrawerOpen(false)}
            aria-label="Tutup Menu"
          >
            ✕
          </button>
        </div>
        <ul className="drawer-list">
          <li>
            <Link to="/" className={`drawer-link ${isActive('/') ? 'active' : ''}`}>
              Halaman Muka
            </Link>
          </li>
          <li>
            <Link
              to="/petunjuk"
              className={`drawer-link ${isActive('/petunjuk') ? 'active' : ''}`}
            >
              Petunjuk
            </Link>
          </li>
          <li>
            <Link
              to="/tujuan-pembelajaran"
              className={`drawer-link ${isActive('/tujuan-pembelajaran') ? 'active' : ''}`}
            >
              Tujuan Pembelajaran
            </Link>
          </li>
          <li>
            <Link
              to="/bahan-bacaan"
              className={`drawer-link ${isActive('/bahan-bacaan') ? 'active' : ''}`}
            >
              Bahan Bacaan
            </Link>
          </li>
          <li>
            <Link
              to="/video-pembelajaran"
              className={`drawer-link ${isVideoGroup ? 'active' : ''}`}
            >
              Video Pembelajaran
            </Link>
          </li>
          <li>
            <Link
              to="/ayo-berlatih"
              className={`drawer-link ${isLatihanGroup ? 'active' : ''}`}
            >
              Ayo Berlatih
            </Link>
          </li>
          <li>
            <Link
              to="/daftar-pustaka"
              className={`drawer-link ${isActive('/daftar-pustaka') ? 'active' : ''}`}
            >
              Daftar Pustaka
            </Link>
          </li>
          <li>
            <Link
              to="/penyusun"
              className={`drawer-link ${
                isActive('/penyusun') || isActive('/penulis') ? 'active' : ''
              }`}
            >
              Penulis
            </Link>
          </li>
        </ul>
      </aside>

      {/* SEARCH MODAL */}
      <div
        className={`search-modal ${searchOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Pencarian Situs"
        onClick={(e) => {
          if (e.target === e.currentTarget) setSearchOpen(false);
        }}
      >
        <div className="search-dialog">
          <div className="search-input-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Cari materi, rumus, atau halaman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={searchOpen}
            />
            <button
              className="icon-btn"
              onClick={() => setSearchOpen(false)}
              aria-label="Tutup Pencarian"
            >
              ✕
            </button>
          </div>
          <div className="search-results">
            {filteredPages.length === 0 ? (
              <div style={{ padding: '14px', color: '#666', textAlign: 'center' }}>
                Tidak ditemukan hasil untuk &ldquo;<strong>{searchQuery}</strong>&rdquo;
              </div>
            ) : (
              filteredPages.map((p) => (
                <div
                  key={p.url}
                  className="search-result-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(p.url);
                    setSearchOpen(false);
                  }}
                >
                  <div className="search-result-title">{p.title}</div>
                  <div className="search-result-desc">{p.desc}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {children}

      {/* FOOTER */}
      <footer className="site-footer">
        <p>
          Media Pembelajaran Interaktif{' '}
          <strong>
            Matematika BAB 1: Penjumlahan &amp; Pengurangan Bilangan Cacah sampai 100 — Kelas 3 SD (Menghitung Kerajinan Purun Kita)
          </strong>
        </p>
        <p style={{ fontSize: '0.82rem', marginTop: '4px', opacity: 0.9 }}>
          Pendidikan Guru Sekolah Dasar • Universitas Lambung Mangkurat • Kurikulum Merdeka
        </p>
      </footer>
    </>
  );
}
