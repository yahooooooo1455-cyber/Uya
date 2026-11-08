import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExternalLinkSection from '../components/ExternalLinkCardWithQR';
import { fetchExternalLinks } from '../lib/dataService';

export function AyoBerlatihMenu() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchExternalLinks().then((all) => {
      // Ambil semua link latihan (pilihan-ganda / latihan) selain daftar-pustaka
      const latihanList = (all || []).filter((x) => x.category !== 'daftar-pustaka');
      setLinks(latihanList);
    });
  }, []);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Ayo Bermain</h1>
      </section>

      <main className="main-content">
        {/* LANGSUNG MENAMPILKAN HASIL INPUTAN LINK SOAL & QR CODE */}
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

export function PilihanGandaPage() {
  return <AyoBerlatihMenu />;
}

export function IsianPage() {
  return <AyoBerlatihMenu />;
}
