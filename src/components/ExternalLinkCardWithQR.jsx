import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

/**
 * Komponen Tampilan Kartu Link & QR Code khusus untuk Siswa (Anak SD).
 * Bersih tanpa tombol edit/hapus agar murid tidak bisa mengutak-atik data.
 */
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
  const cleanDomain = (item.url || '').replace(/^https?:\/\//, '');

  return (
    <div style={{ marginBottom: '32px' }}>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="external-card"
      >
        {item.thumbnail_url && (
          <img
            src={item.thumbnail_url}
            alt={item.title}
            className="external-card-img"
            onError={(e) => {
              e.currentTarget.src = '/assets/images/card-game.jpg';
            }}
          />
        )}
        <div className="external-card-body">
          <div className="external-card-title">{item.title}</div>
          {item.description && <div className="external-card-desc">{item.description}</div>}
          <div className="external-card-domain">🎮 {cleanDomain} ↗</div>
        </div>
      </a>

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
                alt={`QR Code ${item.title}`}
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
