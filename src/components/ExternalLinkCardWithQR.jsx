import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { convertYouTubeToEmbed, extractYouTubeId } from '../lib/dataService';

/**
 * Mengubah URL kuis/web populer (Wordwall, YouTube, Google Form, Canva) menjadi URL Embed
 * sehingga tampilan asli web/videonya bisa langsung muncul di halaman tanpa sampul.
 */
export function getDirectEmbedUrl(rawUrl) {
  if (!rawUrl) return '';
  const url = rawUrl.trim();

  // 1. YouTube
  if (extractYouTubeId(url)) {
    return convertYouTubeToEmbed(url);
  }

  // 2. Wordwall (contoh: https://wordwall.net/id/resource/105516598 -> https://wordwall.net/id/embed/resource/105516598)
  const wordwallMatch = url.match(/wordwall\.net\/(?:([a-z]{2})\/)?(?:play|resource)\/(\d+)/i);
  if (wordwallMatch) {
    const lang = wordwallMatch[1] ? `${wordwallMatch[1]}/` : '';
    return `https://wordwall.net/${lang}embed/resource/${wordwallMatch[2]}`;
  }

  // 3. Google Forms
  if (url.includes('docs.google.com/forms') && !url.includes('embedded=true')) {
    return url.includes('?') ? `${url}&embedded=true` : `${url}?embedded=true`;
  }

  // 4. Google Drive File / PDF (contoh: https://drive.google.com/file/d/ID/view -> /preview)
  const gdriveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (gdriveMatch) {
    return `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`;
  }

  // 5. Google Docs / Slides / Spreadsheets (/edit atau /view -> /preview)
  const gdocsMatch = url.match(
    /docs\.google\.com\/(document|presentation|spreadsheets)\/d\/([^/]+)/i
  );
  if (gdocsMatch) {
    return `https://docs.google.com/${gdocsMatch[1]}/d/${gdocsMatch[2]}/preview`;
  }

  // 6. Canva Design
  if (url.includes('canva.com/design/') && !url.includes('?embed')) {
    const baseCanva = url.split('?')[0].replace(/\/(edit|view)$/, '/view');
    return `${baseCanva.endsWith('/view') ? baseCanva : `${baseCanva}/view`}?embed`;
  }

  return url;
}

/**
 * Menghasilkan URL Screenshot / Preview otomatis dari alamat website tanpa perlu upload sampul.
 */
export function getAutoWebPreviewUrl(rawUrl) {
  if (!rawUrl) return '';
  const url = rawUrl.trim();
  const ytId = extractYouTubeId(url);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return `https://image.thum.io/get/width/640/crop/380/noanimate/${url}`;
}

export default function ExternalLinkSection({ links = [] }) {
  const [zoomQrItem, setZoomQrItem] = useState(null);

  if (!links || links.length === 0) return null;

  return (
    <div className="external-links-wrapper">
      {links.map((item) => (
        <StudentExternalCard
          key={item.id}
          item={item}
          onZoomQr={() => setZoomQrItem(item)}
        />
      ))}

      {/* MODAL PERBESAR QR CODE UNTUK SCAN DI LAYAR KELAS */}
      {zoomQrItem && (
        <div className="search-modal open" onClick={() => setZoomQrItem(null)}>
          <div
            className="search-dialog"
            style={{ maxWidth: '420px', textAlign: 'center', padding: '28px 24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily: 'Fredoka, sans-serif',
                color: 'var(--primary)',
                marginBottom: '8px'
              }}
            >
              📱 Scan QR Code Soal
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#555', marginBottom: '18px' }}>
              {zoomQrItem.title}
            </p>
            <div
              style={{
                background: '#fff',
                padding: '16px',
                borderRadius: '16px',
                display: 'inline-block',
                boxShadow: 'var(--shadow-md)',
                border: '2px solid var(--primary-light)'
              }}
            >
              {zoomQrItem.custom_qr_url ? (
                <img
                  src={zoomQrItem.custom_qr_url}
                  alt="QR Code"
                  style={{ width: 240, height: 240, objectFit: 'contain' }}
                />
              ) : (
                <QRCodeCanvas value={zoomQrItem.url} size={240} level="H" includeMargin={true} />
              )}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <a
                href={zoomQrItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm"
                style={{ textDecoration: 'none' }}
              >
                Buka Soal ↗
              </a>
              <button className="btn-sm btn-outline" onClick={() => setZoomQrItem(null)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentExternalCard({ item, onZoomQr }) {
  const [imgError, setImgError] = useState(false);
  const [autoMeta, setAutoMeta] = useState(null);
  const [showLiveEmbed, setShowLiveEmbed] = useState(false);

  const cleanDomain = (item.url || '').replace(/^https?:\/\//, '');
  const embedUrl = getDirectEmbedUrl(item.url);

  // Ambil preview gambar & judul otomatis dari link website (via Microlink API gratis)
  useEffect(() => {
    if (!item.url) return;
    let active = true;
    fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true`
    )
      .then((r) => r.json())
      .then((res) => {
        if (active && res?.status === 'success' && res?.data) {
          setAutoMeta({
            image: res.data.image?.url || res.data.screenshot?.url || '',
            title: res.data.title || '',
            description: res.data.description || ''
          });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [item.url]);

  const previewImg =
    (item.thumbnail_url &&
    item.thumbnail_url !== '/assets/images/thumb-wordwall.jpg' &&
    item.thumbnail_url !== '/assets/images/thumb-sibi.jpg'
      ? item.thumbnail_url
      : '') ||
    autoMeta?.image ||
    item.thumbnail_url ||
    getAutoWebPreviewUrl(item.url);

  const displayTitle = item.title || autoMeta?.title || cleanDomain;
  const displayDesc = item.description || autoMeta?.description || '';

  return (
    <div style={{ marginBottom: '36px' }}>
      {/* KARTU PREVIEW OTOMATIS DARI LINK WEB */}
      <div
        className="external-card"
        style={{ flexDirection: 'column', alignItems: 'stretch', cursor: 'default' }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch'
          }}
        >
          {previewImg && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', flexShrink: 0 }}
            >
              <img
                src={previewImg}
                alt={displayTitle}
                className="external-card-img"
                style={{ height: '100%', minHeight: '160px' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </a>
          )}
          <div className="external-card-body" style={{ flex: 1, minWidth: '240px' }}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="external-card-title">{displayTitle}</div>
              {displayDesc && <div className="external-card-desc">{displayDesc}</div>}
              <div className="external-card-domain">🌐 {cleanDomain} ↗</div>
            </a>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm"
                style={{ textDecoration: 'none' }}
              >
                🚀 Buka Link Soal ↗
              </a>
              <button
                type="button"
                className="btn-sm btn-outline"
                onClick={() => setShowLiveEmbed(!showLiveEmbed)}
              >
                {showLiveEmbed ? '🔼 Sembunyikan Tampilan Web' : '▶️ Tampilkan Web Langsung di Sini'}
              </button>
            </div>
          </div>
        </div>

        {/* TAMPILAN LANGSUNG WEB / GAME DI DALAM HALAMAN (IFRAME) */}
        {showLiveEmbed && (
          <div
            style={{
              width: '100%',
              borderTop: '2px solid var(--primary-light)',
              background: '#000'
            }}
          >
            <iframe
              src={embedUrl}
              title={displayTitle}
              style={{ width: '100%', height: '500px', border: 'none', display: 'block' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      {item.show_qr !== false && (
        <div className="qr-box">
          <div
            onClick={onZoomQr}
            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
            title="Klik untuk memperbesar QR Code"
          >
            {item.custom_qr_url && !imgError ? (
              <img
                src={item.custom_qr_url}
                alt={`QR Code ${displayTitle}`}
                onError={() => setImgError(true)}
              />
            ) : (
              <div style={{ padding: '6px', background: '#fff', borderRadius: '10px' }}>
                <QRCodeCanvas value={item.url} size={196} level="H" includeMargin={true} />
              </div>
            )}
          </div>
          <div className="qr-caption">Scan Me...</div>
        </div>
      )}
    </div>
  );
}
