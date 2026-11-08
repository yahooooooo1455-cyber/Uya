import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchVideos } from '../lib/dataService';
import { DEFAULT_VIDEOS } from '../data/defaultData';

export function VideoPembelajaranMenu() {
  const [videos, setVideos] = useState(DEFAULT_VIDEOS);

  useEffect(() => {
    fetchVideos().then(setVideos);
  }, []);

  const getVideoRoute = (vid, idx) => {
    if (idx === 0) return '/video-pembelajaran-1';
    if (idx === 1) return '/video-pembelajaran-2';
    return `/video/${vid.id}`;
  };

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Video Pembelajaran</h1>
      </section>

      <main className="main-content">
        <div className="menu-grid-2">
          {videos.map((vid, idx) => {
            const target = getVideoRoute(vid, idx);
            return (
              <div className="menu-card" key={vid.id}>
                <Link to={target} className="menu-card-img-link">
                  <img
                    src={vid.thumbnail_url || '/assets/images/thumb-video-1.png'}
                    alt={vid.title}
                    className="menu-card-img"
                  />
                </Link>
                <Link to={target} className="btn-pill">
                  {vid.title}
                </Link>
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

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">{video.title}</h1>
      </section>

      <main className="main-content">
        <div className="video-frame-wrap">
          <iframe
            src={video.embed_url}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-caption-bar">
          <div>
            <strong>{video.title}:</strong> {video.subtitle}
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

