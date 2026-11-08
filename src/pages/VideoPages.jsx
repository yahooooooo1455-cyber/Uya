import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchVideos, convertYouTubeToEmbed } from '../lib/dataService';
import { DEFAULT_VIDEOS } from '../data/defaultData';

export function VideoPembelajaranMenu() {
  const [videos, setVideos] = useState(DEFAULT_VIDEOS);

  useEffect(() => {
    fetchVideos().then(setVideos);
  }, []);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Video Pembelajaran</h1>
      </section>

      <main className="main-content">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              videos.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '28px',
            maxWidth: '1080px',
            margin: '0 auto'
          }}
        >
          {videos.map((vid) => {
            const embedSrc = vid.embed_url || convertYouTubeToEmbed(vid.youtube_url);
            return (
              <div
                key={vid.id}
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
                {/* TAMPILAN LANGSUNG VIDEO PLAYER TANPA SAMPUL */}
                <div className="video-frame-wrap" style={{ borderRadius: 0, margin: 0 }}>
                  <iframe
                    src={embedSrc}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
                      {vid.title}
                    </div>
                    {vid.subtitle && (
                      <div style={{ fontSize: '0.9rem', color: '#555', marginTop: '2px' }}>
                        {vid.subtitle}
                      </div>
                    )}
                  </div>
                  <a
                    href={vid.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sm"
                    style={{ textDecoration: 'none' }}
                  >
                    Buka di YouTube ↗
                  </a>
                </div>
              </div>
            );
          })}
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

export function VideoDetailPage({ fixedIndex = null }) {
  const { id } = useParams();
  const [videos, setVideos] = useState(DEFAULT_VIDEOS);

  useEffect(() => {
    fetchVideos().then(setVideos);
  }, []);

  let video = null;
  if (fixedIndex !== null) {
    video = videos[fixedIndex] || DEFAULT_VIDEOS[fixedIndex];
  } else {
    video = videos.find((v) => String(v.id) === String(id)) || videos[0];
  }

  if (!video) return null;

  const embedSrc = video.embed_url || convertYouTubeToEmbed(video.youtube_url);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">{video.title}</h1>
      </section>

      <main className="main-content">
        <div className="video-frame-wrap">
          <iframe
            src={embedSrc}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-caption-bar">
          <div>
            <strong>{video.title}</strong>
            {video.subtitle ? `: ${video.subtitle}` : ''}
          </div>
          <a
            href={video.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sm"
            style={{ textDecoration: 'none' }}
          >
            Tonton di YouTube ↗
          </a>
        </div>

        <div className="btn-back-wrap">
          <Link to="/video-pembelajaran" className="btn-pill">
            Back
          </Link>
        </div>
      </main>
    </>
  );
}
