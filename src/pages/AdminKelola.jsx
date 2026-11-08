import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import {
  getRuntimeConfig,
  saveRuntimeConfig,
  isSupabaseConfigured
} from '../lib/supabase';
import {
  isCloudinaryConfigured,
  uploadImageToCloudinary
} from '../lib/cloudinary';
import {
  fetchSiteContent,
  saveSiteContent,
  fetchExternalLinks,
  addExternalLink,
  deleteExternalLink,
  fetchVideos,
  addVideo,
  deleteVideo,
  syncLocalDataToSupabase
} from '../lib/dataService';
import { DEFAULT_SITE_CONTENTS } from '../data/defaultData';

export default function AdminKelola() {
  const [activeTab, setActiveTab] = useState('petunjuk');
  const [savingMsg, setSavingMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  // 1. State Petunjuk (Upload Foto)
  const [petunjukData, setPetunjukData] = useState(DEFAULT_SITE_CONTENTS.petunjuk);

  // 2. State Tujuan Pembelajaran (Upload Foto)
  const [tujuanData, setTujuanData] = useState(DEFAULT_SITE_CONTENTS.tujuan);

  // 3. State Bahan Bacaan (Upload Foto Slide Canva + Toggle Simulasi)
  const [bahanData, setBahanData] = useState(DEFAULT_SITE_CONTENTS.bahan_bacaan);

  // 4. State Video Pembelajaran (Link YouTube)
  const [videos, setVideos] = useState([]);
  const [vidTitle, setVidTitle] = useState('');
  const [vidSubtitle, setVidSubtitle] = useState('');
  const [vidYoutube, setVidYoutube] = useState('');
  const [vidThumb, setVidThumb] = useState('');

  // 5. State Ayo Berlatih (Link Soal + QR Otomatis / Upload Foto QR)
  const [latihanLinks, setLatihanLinks] = useState([]);
  const [latCategory, setLatCategory] = useState('pilihan-ganda');
  const [latTitle, setLatTitle] = useState('');
  const [latDesc, setLatDesc] = useState('');
  const [latUrl, setLatUrl] = useState('');
  const [latThumb, setLatThumb] = useState('');
  const [qrMode, setQrMode] = useState('auto'); // 'auto' | 'upload' | 'none'
  const [latCustomQr, setLatCustomQr] = useState('');

  // 6. State Daftar Pustaka (Link Referensi)
  const [pustakaLinks, setPustakaLinks] = useState([]);
  const [pusTitle, setPusTitle] = useState('');
  const [pusDesc, setPusDesc] = useState('');
  const [pusUrl, setPusUrl] = useState('');
  const [pusThumb, setPusThumb] = useState('');

  // 7. State Penyusun (Upload Gambar Saja)
  const [penyusunData, setPenyusunData] = useState(DEFAULT_SITE_CONTENTS.penyusun);

  // 8. State Konfigurasi Cloud
  const [config, setConfig] = useState(getRuntimeConfig());

  const showToast = (msg) => {
    setSavingMsg(msg);
    setTimeout(() => setSavingMsg(''), 4000);
  };

  const loadAllData = async () => {
    const [p, t, b, pen, allLinks, vids] = await Promise.all([
      fetchSiteContent('petunjuk'),
      fetchSiteContent('tujuan'),
      fetchSiteContent('bahan_bacaan'),
      fetchSiteContent('penyusun'),
      fetchExternalLinks(),
      fetchVideos()
    ]);

    if (p) {
      setPetunjukData({
        ...p,
        images:
          Array.isArray(p.images) && p.images.length > 0
            ? p.images
            : DEFAULT_SITE_CONTENTS.petunjuk.images
      });
    }
    if (t) {
      setTujuanData({
        ...t,
        images:
          Array.isArray(t.images) && t.images.length > 0
            ? t.images
            : DEFAULT_SITE_CONTENTS.tujuan.images
      });
    }
    if (b) setBahanData(b);
    if (pen) setPenyusunData(pen);

    setLatihanLinks(
      (allLinks || []).filter(
        (x) => x.category === 'pilihan-ganda' || x.category === 'isian'
      )
    );
    setPustakaLinks((allLinks || []).filter((x) => x.category === 'daftar-pustaka'));
    setVideos(vids || []);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // ==================== HANDLERS PER MENU ====================

  // 1. Upload Foto Petunjuk
  const handleUploadPetunjukImage = async (e, replaceAll = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImageToCloudinary(file);
      const newImg = {
        id: Date.now(),
        url: res.url,
        alt: file.name || 'Petunjuk Pembelajaran'
      };
      const nextImages = replaceAll
        ? [newImg]
        : [...(petunjukData.images || []), newImg];
      const updated = { ...petunjukData, images: nextImages };
      setPetunjukData(updated);
      await saveSiteContent('petunjuk', updated);
      showToast('✓ Gambar Petunjuk berhasil diunggah!');
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDeletePetunjukImage = async (id) => {
    const nextImages = (petunjukData.images || []).filter((img) => img.id !== id);
    const updated = { ...petunjukData, images: nextImages };
    setPetunjukData(updated);
    await saveSiteContent('petunjuk', updated);
    showToast('✓ Gambar Petunjuk dihapus.');
  };

  // 2. Upload Foto Tujuan Pembelajaran
  const handleUploadTujuanImage = async (e, replaceAll = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImageToCloudinary(file);
      const newImg = {
        id: Date.now(),
        url: res.url,
        alt: file.name || 'Tujuan Pembelajaran'
      };
      const nextImages = replaceAll
        ? [newImg]
        : [...(tujuanData.images || []), newImg];
      const updated = { ...tujuanData, images: nextImages };
      setTujuanData(updated);
      await saveSiteContent('tujuan', updated);
      showToast('✓ Gambar Tujuan Pembelajaran berhasil diunggah!');
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteTujuanImage = async (id) => {
    const nextImages = (tujuanData.images || []).filter((img) => img.id !== id);
    const updated = { ...tujuanData, images: nextImages };
    setTujuanData(updated);
    await saveSiteContent('tujuan', updated);
    showToast('✓ Gambar Tujuan Pembelajaran dihapus.');
  };

  // 3. Upload Foto Bahan Bacaan (Canva Slide)
  const handleUploadBahanSlide = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImageToCloudinary(file);
      const nextSlides = [
        ...(bahanData.slides || []),
        {
          id: Date.now(),
          url: res.url,
          alt: file.name
        }
      ];
      const updated = { ...bahanData, slides: nextSlides };
      setBahanData(updated);
      await saveSiteContent('bahan_bacaan', updated);
      showToast('✓ Foto Slide Bahan Bacaan berhasil diunggah!');
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteBahanSlide = async (id) => {
    const nextSlides = (bahanData.slides || []).filter((s) => s.id !== id);
    const updated = { ...bahanData, slides: nextSlides };
    setBahanData(updated);
    await saveSiteContent('bahan_bacaan', updated);
    showToast('✓ Slide Bahan Bacaan dihapus.');
  };

  const handleToggleSimulator = async (checked) => {
    const updated = { ...bahanData, show_simulator: checked };
    setBahanData(updated);
    await saveSiteContent('bahan_bacaan', updated);
    showToast(
      checked
        ? '✓ Simulasi Kalkulator Bangun Datar diaktifkan!'
        : '✓ Simulasi Kalkulator Bangun Datar disembunyikan.'
    );
  };

  // 4. Tambah Video Pembelajaran (Link)
  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!vidTitle.trim() || !vidYoutube.trim()) return;
    await addVideo({
      title: vidTitle,
      subtitle: vidSubtitle,
      youtube_url: vidYoutube,
      thumbnail_url: vidThumb || '/assets/images/thumb-video-1.png'
    });
    setVidTitle('');
    setVidSubtitle('');
    setVidYoutube('');
    setVidThumb('');
    await loadAllData();
    showToast('✓ Link Video Pembelajaran berhasil disimpan!');
  };

  // 5. Tambah Link Soal Ayo Berlatih & QR Code
  const handleAddLatihanLink = async (e) => {
    e.preventDefault();
    if (!latTitle.trim() || !latUrl.trim()) return;
    let formattedUrl = latUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    await addExternalLink({
      category: latCategory,
      title: latTitle,
      description: latDesc,
      url: formattedUrl,
      thumbnail_url: latThumb || '/assets/images/thumb-wordwall.jpg',
      custom_qr_url: qrMode === 'upload' ? latCustomQr : '',
      show_qr: qrMode !== 'none'
    });
    setLatTitle('');
    setLatDesc('');
    setLatUrl('');
    setLatThumb('');
    setLatCustomQr('');
    await loadAllData();
    showToast('✓ Link Soal & QR Code Ayo Berlatih berhasil ditambahkan!');
  };

  // 6. Tambah Link Daftar Pustaka
  const handleAddPustakaLink = async (e) => {
    e.preventDefault();
    if (!pusTitle.trim() || !pusUrl.trim()) return;
    let formattedUrl = pusUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    await addExternalLink({
      category: 'daftar-pustaka',
      title: pusTitle,
      description: pusDesc,
      url: formattedUrl,
      thumbnail_url: pusThumb || '/assets/images/thumb-sibi.jpg',
      custom_qr_url: '',
      show_qr: false
    });
    setPusTitle('');
    setPusDesc('');
    setPusUrl('');
    setPusThumb('');
    await loadAllData();
    showToast('✓ Link Daftar Pustaka berhasil ditambahkan!');
  };

  // 7. Upload Gambar Penyusun
  const handleReplacePenyusunImage = async (e, replaceAll = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImageToCloudinary(file);
      const newImg = {
        id: Date.now(),
        url: res.url,
        alt: 'Tim Penyusun'
      };
      const nextImages = replaceAll
        ? [newImg]
        : [...(penyusunData.images || []), newImg];
      const updated = { images: nextImages };
      setPenyusunData(updated);
      await saveSiteContent('penyusun', updated);
      showToast('✓ Gambar Penyusun berhasil diperbarui!');
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDeletePenyusunImage = async (id) => {
    const nextImages = (penyusunData.images || []).filter((img) => img.id !== id);
    const updated = { images: nextImages };
    setPenyusunData(updated);
    await saveSiteContent('penyusun', updated);
    showToast('✓ Gambar Penyusun dihapus.');
  };

  return (
    <>
      <section className="hero-subpage" style={{ minHeight: '200px' }}>
        <div>
          <h1 className="hero-subpage-title">Portal Guru</h1>
          <p style={{ color: '#fff', fontWeight: 700, marginTop: '6px' }}>
            Kelola Isi Materi, Link Video, Link Soal, QR Code &amp; Gambar untuk Siswa SD
          </p>
        </div>
      </section>

      <main className="main-content">
        {/* BANNER STATUS PENYIMPANAN */}
        <div className="cloud-banner">
          <div>
            <strong>Mode Halaman Guru (Terpisah dari Siswa SD)</strong>
            <div style={{ fontSize: '0.86rem', color: '#555', marginTop: '2px' }}>
              Siswa SD hanya melihat tampilan materi yang bersih. Perubahan di halaman ini langsung
              mengubah tampilan di halaman siswa.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="status-pill">
              {isSupabaseConfigured() ? '🟢 Supabase Aktif' : '🟡 Mode Lokal'}
            </span>
            <span className="status-pill">
              {isCloudinaryConfigured() ? '🟢 Cloudinary Aktif' : '🟡 Upload Lokal'}
            </span>
          </div>
        </div>

        {savingMsg && (
          <div
            style={{
              padding: '12px 18px',
              background: '#dcfce7',
              color: '#14532d',
              borderRadius: '12px',
              fontWeight: 800,
              marginBottom: '18px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {savingMsg}
          </div>
        )}

        {/* MENU TABS GURU SESUAI URUTAN HALAMAN */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'petunjuk' ? 'active' : ''}`}
            onClick={() => setActiveTab('petunjuk')}
          >
            1. 🖼️ Petunjuk (Upload Foto)
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'tujuan' ? 'active' : ''}`}
            onClick={() => setActiveTab('tujuan')}
          >
            2. 🎯 Tujuan Pembelajaran (Upload Foto)
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'bahan' ? 'active' : ''}`}
            onClick={() => setActiveTab('bahan')}
          >
            3. 📚 Bahan Bacaan (Upload Foto &amp; Simulasi)
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            4. 🎬 Video Pembelajaran (Link)
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'latihan' ? 'active' : ''}`}
            onClick={() => setActiveTab('latihan')}
          >
            5. 🎮 Ayo Berlatih (Link &amp; QR)
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'pustaka' ? 'active' : ''}`}
            onClick={() => setActiveTab('pustaka')}
          >
            6. 📖 Daftar Pustaka (Link)
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'penyusun' ? 'active' : ''}`}
            onClick={() => setActiveTab('penyusun')}
          >
            7. 👥 Penyusun (Upload Gambar)
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'cloud' ? 'active' : ''}`}
            onClick={() => setActiveTab('cloud')}
          >
            🔑 Kunci Cloud
          </button>
        </div>

        {/* ==================== 1. TAB PETUNJUK (UPLOAD FOTO) ==================== */}
        {activeTab === 'petunjuk' && (
          <section className="interactive-panel" style={{ marginTop: 0 }}>
            <h2 className="panel-title">🖼️ Upload Gambar Halaman Petunjuk</h2>
            <p className="panel-subtitle">
              Unggah gambar desain Petunjuk (misalnya dari Canva). Gambar otomatis tampil di halaman{' '}
              <Link to="/petunjuk" style={{ color: 'var(--primary)', fontWeight: 800 }}>
                Petunjuk Siswa ↗
              </Link>
              .
            </p>

            <div className="add-link-card" style={{ marginBottom: '24px' }}>
              <div className="form-grid-2">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>🔄 Ganti Gambar Petunjuk Utama</label>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => handleUploadPetunjukImage(e, true)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>➕ Tambah Gambar Petunjuk Tambahan</label>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => handleUploadPetunjukImage(e, false)}
                  />
                </div>
              </div>
              {uploading && (
                <div style={{ marginTop: '10px', color: 'var(--primary)', fontWeight: 700 }}>
                  ⏳ Sedang mengunggah gambar ke Cloudinary...
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gap: '18px' }}>
              {(petunjukData.images || []).map((img, idx) => (
                <div
                  key={img.id || idx}
                  style={{
                    background: '#fff',
                    padding: '16px',
                    borderRadius: '14px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}
                  >
                    <strong>Gambar Petunjuk #{idx + 1}</strong>
                    <button
                      type="button"
                      className="btn-sm btn-danger"
                      onClick={() => handleDeletePetunjukImage(img.id)}
                    >
                      🗑 Hapus Gambar Ini
                    </button>
                  </div>
                  <img
                    src={img.url}
                    alt={img.alt || 'Petunjuk'}
                    style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '10px' }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 2. TAB TUJUAN PEMBELAJARAN (UPLOAD FOTO) ==================== */}
        {activeTab === 'tujuan' && (
          <section className="interactive-panel" style={{ marginTop: 0 }}>
            <h2 className="panel-title">🎯 Upload Gambar Tujuan Pembelajaran</h2>
            <p className="panel-subtitle">
              Unggah gambar desain Tujuan Pembelajaran (misalnya dari Canva). Gambar otomatis tampil di halaman{' '}
              <Link to="/tujuan-pembelajaran" style={{ color: 'var(--primary)', fontWeight: 800 }}>
                Tujuan Pembelajaran Siswa ↗
              </Link>
              .
            </p>

            <div className="add-link-card" style={{ marginBottom: '24px' }}>
              <div className="form-grid-2">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>🔄 Ganti Gambar Tujuan Pembelajaran Utama</label>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => handleUploadTujuanImage(e, true)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>➕ Tambah Gambar Tujuan Pembelajaran Tambahan</label>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => handleUploadTujuanImage(e, false)}
                  />
                </div>
              </div>
              {uploading && (
                <div style={{ marginTop: '10px', color: 'var(--primary)', fontWeight: 700 }}>
                  ⏳ Sedang mengunggah gambar ke Cloudinary...
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gap: '18px' }}>
              {(tujuanData.images || []).map((img, idx) => (
                <div
                  key={img.id || idx}
                  style={{
                    background: '#fff',
                    padding: '16px',
                    borderRadius: '14px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}
                  >
                    <strong>Gambar Tujuan Pembelajaran #{idx + 1}</strong>
                    <button
                      type="button"
                      className="btn-sm btn-danger"
                      onClick={() => handleDeleteTujuanImage(img.id)}
                    >
                      🗑 Hapus Gambar Ini
                    </button>
                  </div>
                  <img
                    src={img.url}
                    alt={img.alt || 'Tujuan Pembelajaran'}
                    style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '10px' }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 3. TAB BAHAN BACAAN (UPLOAD FOTO CANVA & SIMULASI) ==================== */}
        {activeTab === 'bahan' && (
          <section className="interactive-panel" style={{ marginTop: 0 }}>
            <h2 className="panel-title">📚 Kelola Foto Bahan Bacaan &amp; Simulasi</h2>
            <p className="panel-subtitle">
              Karena desain kotak-kotak bangun datar pada Bahan Bacaan dibuat di Canva, Guru bisa
              mengunggah gambar slide Canva di sini, serta mengatur fitur Simulasi Kalkulator Rumus.
            </p>

            <div className="add-link-card" style={{ marginBottom: '24px' }}>
              <div className="form-group">
                <label>➕ Upload Gambar Slide Bahan Bacaan Baru (PNG / JPG dari Canva)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadBahanSlide}
                  disabled={uploading}
                />
                {uploading && (
                  <span className="upload-badge">⏳ Sedang mengunggah gambar...</span>
                )}
              </div>

              <div
                style={{
                  marginTop: '14px',
                  paddingTop: '14px',
                  borderTop: '1px solid #eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div>
                  <strong>🧮 Fitur Simulasi Kalkulator Rumus Bangun Datar</strong>
                  <div style={{ fontSize: '0.86rem', color: '#666' }}>
                    Memudahkan siswa mencoba menghitung luas &amp; keliling langsung di bawah Bahan
                    Bacaan.
                  </div>
                </div>
                <label
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 800,
                    color: 'var(--primary)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={bahanData.show_simulator !== false}
                    onChange={(e) => handleToggleSimulator(e.target.checked)}
                  />
                  Tampilkan Simulasi di Halaman Siswa
                </label>
              </div>
            </div>

            <h3 style={{ marginBottom: '12px' }}>
              🖼️ Daftar Gambar Slide Bahan Bacaan Saat Ini ({(bahanData.slides || []).length})
            </h3>
            <div className="guru-slide-grid">
              {(bahanData.slides || []).map((slide, idx) => (
                <div key={slide.id || idx} className="guru-slide-card">
                  <img src={slide.url} alt={slide.alt || `Slide ${idx + 1}`} />
                  <div className="guru-slide-footer">
                    <span>Slide #{idx + 1}</span>
                    <button
                      type="button"
                      className="qr-action-btn danger"
                      onClick={() => handleDeleteBahanSlide(slide.id)}
                    >
                      🗑️ Hapus Foto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 4. TAB VIDEO PEMBELAJARAN (LINK YOUTUBE) ==================== */}
        {activeTab === 'video' && (
          <section className="interactive-panel" style={{ marginTop: 0 }}>
            <h2 className="panel-title">🎬 Kelola Link Video Pembelajaran</h2>
            <p className="panel-subtitle">
              Masukkan link video dari YouTube untuk ditampilkan di menu Video Pembelajaran siswa.
            </p>

            <form
              onSubmit={handleAddVideo}
              className="add-link-card"
              style={{ marginBottom: '24px' }}
            >
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Judul Video *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Video Pembelajaran 1"
                    value={vidTitle}
                    onChange={(e) => setVidTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Keterangan / Topik Materi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Luas & Keliling Bangun Datar"
                    value={vidSubtitle}
                    onChange={(e) => setVidSubtitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Link YouTube Video Pembelajaran *</label>
                  <input
                    type="text"
                    required
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={vidYoutube}
                    onChange={(e) => setVidYoutube(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Gambar Sampul Kartu Video (Opsional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploading(true);
                      try {
                        const res = await uploadImageToCloudinary(file);
                        setVidThumb(res.url);
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-sm" disabled={uploading}>
                ➕ Tambahkan Link Video
              </button>
            </form>

            <h3 style={{ marginBottom: '12px' }}>📋 Daftar Video Saat Ini ({videos.length})</h3>
            <div className="essay-list">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="essay-card"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800 }}>{v.title}</div>
                    <div style={{ fontSize: '0.9rem', color: '#555' }}>{v.subtitle}</div>
                    <a
                      href={v.youtube_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}
                    >
                      {v.youtube_url} ↗
                    </a>
                  </div>
                  <button
                    type="button"
                    className="qr-action-btn danger"
                    onClick={async () => {
                      if (window.confirm(`Hapus ${v.title}?`)) {
                        await deleteVideo(v.id);
                        loadAllData();
                      }
                    }}
                  >
                    🗑️ Hapus
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 5. TAB AYO BERLATIH (LINK SOAL & QR FLEKSIBEL) ==================== */}
        {activeTab === 'latihan' && (
          <section className="interactive-panel" style={{ marginTop: 0 }}>
            <h2 className="panel-title">🎮 Kelola Link Soal &amp; QR Code (Ayo Berlatih)</h2>
            <p className="panel-subtitle">
              Masukkan link soal latihan (seperti Wordwall, Quizizz, Google Form). Untuk{' '}
              <strong>QR Code</strong>, bisa diatur <strong>Muncul Otomatis dari Link</strong> atau{' '}
              <strong>Upload Foto QR Sendiri</strong> jika ada gambarnya dari klien!
            </p>

            <form
              onSubmit={handleAddLatihanLink}
              className="add-link-card"
              style={{ marginBottom: '24px' }}
            >
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Pilih Halaman Latihan *</label>
                  <select
                    value={latCategory}
                    onChange={(e) => setLatCategory(e.target.value)}
                  >
                    <option value="pilihan-ganda">Pilihan Ganda</option>
                    <option value="isian">Isian</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Judul Kartu Soal *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Soal Pilihan Ganda Matematika Materi Bangun Datar"
                    value={latTitle}
                    onChange={(e) => setLatTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Link Soal (Wordwall / Quizizz / Google Form / Web Lain) *</label>
                <input
                  type="text"
                  required
                  placeholder="https://wordwall.net/id/resource/..."
                  value={latUrl}
                  onChange={(e) => setLatUrl(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Deskripsi Singkat (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: Membuka kotak - Ketuk setiap kotak secara giliran..."
                  value={latDesc}
                  onChange={(e) => setLatDesc(e.target.value)}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Pengaturan Tampilan QR Code *</label>
                  <select value={qrMode} onChange={(e) => setQrMode(e.target.value)}>
                    <option value="auto">⚡ Munculkan QR Otomatis dari Link Soal</option>
                    <option value="upload">🖼️ Upload Foto QR Code Sendiri</option>
                    <option value="none">🚫 Tanpa QR Code (Hanya Link Kartu)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Upload Foto Sampul Kartu Link (Opsional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploading(true);
                      try {
                        const res = await uploadImageToCloudinary(file);
                        setLatThumb(res.url);
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                </div>
              </div>

              {qrMode === 'upload' && (
                <div className="form-group">
                  <label>Upload Foto QR Code dari Klien *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploading(true);
                      try {
                        const res = await uploadImageToCloudinary(file);
                        setLatCustomQr(res.url);
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                  {latCustomQr && (
                    <div className="mini-preview">
                      <img src={latCustomQr} alt="QR Custom" />
                      <span>✓ Foto QR siap disimpan</span>
                    </div>
                  )}
                </div>
              )}

              {qrMode === 'auto' && latUrl.trim() && (
                <div className="live-qr-preview">
                  <div>
                    <strong>✨ Preview QR Code Otomatis:</strong>
                    <div style={{ fontSize: '0.86rem', color: '#555' }}>
                      QR ini otomatis dibuat dari link: {latUrl.trim()}
                    </div>
                  </div>
                  <div className="live-qr-box">
                    <QRCodeCanvas
                      value={
                        latUrl.trim().startsWith('http')
                          ? latUrl.trim()
                          : `https://${latUrl.trim()}`
                      }
                      size={90}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="btn-sm" disabled={uploading}>
                ➕ Simpan Link Soal &amp; QR Code
              </button>
            </form>

            <h3 style={{ marginBottom: '12px' }}>
              📋 Daftar Link Soal Ayo Berlatih Saat Ini ({latihanLinks.length})
            </h3>
            <div className="essay-list">
              {latihanLinks.map((item) => (
                <div
                  key={item.id}
                  className="essay-card"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '14px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <span className="badge-cat">{item.category}</span>
                    <div style={{ fontWeight: 800, marginTop: '4px' }}>{item.title}</div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--primary)', fontSize: '0.86rem', fontWeight: 700 }}
                    >
                      {item.url} ↗
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {item.show_qr !== false && (
                      <QRCodeCanvas value={item.url} size={52} />
                    )}
                    <button
                      type="button"
                      className="qr-action-btn danger"
                      onClick={async () => {
                        if (window.confirm(`Hapus "${item.title}"?`)) {
                          await deleteExternalLink(item.id);
                          loadAllData();
                        }
                      }}
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 6. TAB DAFTAR PUSTAKA (LINK) ==================== */}
        {activeTab === 'pustaka' && (
          <section className="interactive-panel" style={{ marginTop: 0 }}>
            <h2 className="panel-title">📖 Kelola Link Daftar Pustaka</h2>
            <p className="panel-subtitle">
              Masukkan link sumber buku atau referensi pembelajaran untuk halaman Daftar Pustaka.
            </p>

            <form
              onSubmit={handleAddPustakaLink}
              className="add-link-card"
              style={{ marginBottom: '24px' }}
            >
              <div className="form-group">
                <label>Judul Buku / Sumber Referensi *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SIBI - Sistem Informasi Perbukuan Indonesia"
                  value={pusTitle}
                  onChange={(e) => setPusTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Link URL Referensi *</label>
                <input
                  type="text"
                  required
                  placeholder="https://buku.kemendikdasmen.go.id/..."
                  value={pusUrl}
                  onChange={(e) => setPusUrl(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Deskripsi Buku / Pustaka</label>
                <textarea
                  rows={2}
                  placeholder="Deskripsi singkat buku referensi..."
                  value={pusDesc}
                  onChange={(e) => setPusDesc(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Gambar Sampul Buku / Web (Opsional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    try {
                      const res = await uploadImageToCloudinary(file);
                      setPusThumb(res.url);
                    } finally {
                      setUploading(false);
                    }
                  }}
                />
              </div>

              <button type="submit" className="btn-sm" disabled={uploading}>
                ➕ Simpan Link Daftar Pustaka
              </button>
            </form>

            <h3 style={{ marginBottom: '12px' }}>
              📋 Daftar Pustaka Saat Ini ({pustakaLinks.length})
            </h3>
            <div className="essay-list">
              {pustakaLinks.map((item) => (
                <div
                  key={item.id}
                  className="essay-card"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800 }}>{item.title}</div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--primary)', fontSize: '0.86rem', fontWeight: 700 }}
                    >
                      {item.url} ↗
                    </a>
                  </div>
                  <button
                    type="button"
                    className="qr-action-btn danger"
                    onClick={async () => {
                      if (window.confirm(`Hapus "${item.title}"?`)) {
                        await deleteExternalLink(item.id);
                        loadAllData();
                      }
                    }}
                  >
                    🗑️ Hapus
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 7. TAB PENYUSUN (UPLOAD GAMBAR SAJA) ==================== */}
        {activeTab === 'penyusun' && (
          <section className="interactive-panel" style={{ marginTop: 0 }}>
            <h2 className="panel-title">👥 Upload Gambar Halaman Penyusun</h2>
            <p className="panel-subtitle">
              Unggah gambar profil tim penyusun untuk ditampilkan pada halaman{' '}
              <Link to="/penyusun" style={{ color: 'var(--primary)', fontWeight: 800 }}>
                Penyusun ↗
              </Link>
              .
            </p>

            <div className="add-link-card" style={{ marginBottom: '24px' }}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>🔄 Ganti Gambar Utama Penyusun (Upload Foto)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleReplacePenyusunImage(e, true)}
                    disabled={uploading}
                  />
                </div>
                <div className="form-group">
                  <label>➕ Atau Tambah Slide Gambar Penyusun Baru</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleReplacePenyusunImage(e, false)}
                    disabled={uploading}
                  />
                </div>
              </div>
              {uploading && <span className="upload-badge">⏳ Sedang mengunggah gambar...</span>}
            </div>

            <div className="guru-slide-grid">
              {(penyusunData.images || []).map((img, idx) => (
                <div key={img.id || idx} className="guru-slide-card">
                  <img src={img.url} alt={img.alt || 'Penyusun'} />
                  <div className="guru-slide-footer">
                    <span>Gambar Penyusun #{idx + 1}</span>
                    {(penyusunData.images || []).length > 1 && (
                      <button
                        type="button"
                        className="qr-action-btn danger"
                        onClick={() => handleDeletePenyusunImage(img.id)}
                      >
                        🗑️ Hapus
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 8. TAB KUNCI CLOUD (SUPABASE & CLOUDINARY) ==================== */}
        {activeTab === 'cloud' && (
          <section className="interactive-panel" style={{ marginTop: 0 }}>
            <h2 className="panel-title">🔑 Koneksi Supabase, Cloudinary &amp; Netlify</h2>
            <p className="panel-subtitle">
              Masukkan kunci API Supabase &amp; Cloudinary di bawah ini agar seluruh perubahan Guru
              tersimpan secara online untuk semua siswa.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveRuntimeConfig(config);
                showToast('✓ Kunci Supabase & Cloudinary berhasil disimpan!');
                loadAllData();
              }}
              className="add-link-card"
            >
              <div className="form-grid-2">
                <div className="form-group">
                  <label>VITE_SUPABASE_URL</label>
                  <input
                    type="text"
                    placeholder="https://xyzcompany.supabase.co"
                    value={config.supabaseUrl}
                    onChange={(e) => setConfig({ ...config, supabaseUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>VITE_SUPABASE_ANON_KEY</label>
                  <input
                    type="text"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={config.supabaseAnonKey}
                    onChange={(e) => setConfig({ ...config, supabaseAnonKey: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>VITE_CLOUDINARY_CLOUD_NAME</label>
                  <input
                    type="text"
                    placeholder="Contoh: dxyz123abc"
                    value={config.cloudinaryCloudName}
                    onChange={(e) =>
                      setConfig({ ...config, cloudinaryCloudName: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>VITE_CLOUDINARY_UPLOAD_PRESET (Unsigned)</label>
                  <input
                    type="text"
                    placeholder="Contoh: preset_unsigned_kamu"
                    value={config.cloudinaryUploadPreset}
                    onChange={(e) =>
                      setConfig({ ...config, cloudinaryUploadPreset: e.target.value })
                    }
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button type="submit" className="btn-sm">
                  💾 Simpan Kunci Cloud
                </button>
                <button
                  type="button"
                  className="btn-sm btn-outline"
                  onClick={async () => {
                    try {
                      saveRuntimeConfig(config);
                      await syncLocalDataToSupabase();
                      await loadAllData();
                      showToast(
                        '✓ Berhasil! Seluruh konten Petunjuk, Tujuan, Bahan Bacaan, Video, Link & QR sudah tersinkron ke Supabase!'
                      );
                    } catch (err) {
                      alert(err.message);
                    }
                  }}
                >
                  ☁️ Sinkronkan Semua Data ke Supabase (1-Klik)
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </>
  );
}
