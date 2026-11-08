import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ExternalLinkSection from '../components/ExternalLinkCardWithQR';
import {
  fetchExternalLinks,
  fetchMcQuestions,
  fetchEssayQuestions
} from '../lib/dataService';
import { DEFAULT_MC_QUESTIONS, DEFAULT_ESSAY_QUESTIONS } from '../data/defaultData';

export function AyoBerlatihMenu() {
  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Ayo Berlatih</h1>
      </section>

      <main className="main-content">
        <div className="menu-grid-2">
          <div className="menu-card">
            <Link to="/pilihan-ganda" className="menu-card-img-link">
              <img
                src="/assets/images/card-game.jpg"
                alt="Pilihan Ganda"
                className="menu-card-img"
              />
            </Link>
            <Link to="/pilihan-ganda" className="btn-pill">
              Pilihan Ganda
            </Link>
          </div>

          <div className="menu-card">
            <Link to="/isian" className="menu-card-img-link">
              <img src="/assets/images/card-game.jpg" alt="Isian" className="menu-card-img" />
            </Link>
            <Link to="/isian" className="btn-pill">
              Isian
            </Link>
          </div>
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

export function PilihanGandaPage() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchExternalLinks('pilihan-ganda').then(setLinks);
  }, []);

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Pilihan Ganda</h1>
      </section>

      <main className="main-content">
        {/* DAFTAR LINK SOAL EKSTERNAL (WORDWALL, QUIZIZZ, GFORM, DLL) & QR CODE */}
        <ExternalLinkSection links={links} />

        <div className="btn-back-wrap">
          <Link to="/ayo-berlatih" className="btn-pill">
            Back
          </Link>
        </div>
      </main>
    </>
  );
}

export function IsianPage() {
  const [links, setLinks] = useState([]);
  const [questions, setQuestions] = useState(DEFAULT_ESSAY_QUESTIONS);
  const [inputs, setInputs] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [showSolutions, setShowSolutions] = useState(false);
  const [scoreBanner, setScoreBanner] = useState(null);

  const loadData = async () => {
    const [extLinks, essayList] = await Promise.all([
      fetchExternalLinks('isian'),
      fetchEssayQuestions()
    ]);
    setLinks(extLinks);
    setQuestions(essayList);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckAnswers = () => {
    let correct = 0;
    const nextFb = {};
    questions.forEach((item) => {
      const val = (inputs[item.no] || '').trim().toLowerCase();
      const expectedList = (item.expected_answers || []).map((ans) =>
        String(ans).trim().toLowerCase()
      );
      const isOk = expectedList.includes(val);
      if (isOk) {
        correct++;
        nextFb[item.no] = {
          ok: true,
          text: '✓ Jawaban benar! Hebat sekali!'
        };
      } else {
        nextFb[item.no] = {
          ok: false,
          text: `✗ Belum tepat. Coba periksa kembali rumusnya (Jawaban tepat: ${
            item.expected_answers?.[0] || ''
          }).`
        };
      }
    });
    setFeedbacks(nextFb);
    const total = questions.length || 1;
    const finalScore = Math.round((correct / total) * 100);
    setScoreBanner(`Nilai Kamu: ${finalScore} / 100 (${correct} dari ${total} soal benar)`);
  };

  return (
    <>
      <section className="hero-subpage">
        <h1 className="hero-subpage-title">Isian</h1>
      </section>

      <main className="main-content">
        {/* DUKUNGAN LINK SOAL EKSTERNAL & QR CODE DI HALAMAN ISIAN */}
        <ExternalLinkSection links={links} />

        <div className="essay-list">
          {questions.map((item) => {
            const fb = feedbacks[item.no];
            return (
              <div className="essay-card" key={item.id || item.no}>
                <div className="essay-question">{item.question}</div>
                <div className="essay-input-row">
                  <input
                    type="text"
                    className="essay-input"
                    placeholder={item.placeholder || 'Ketik jawabanmu...'}
                    value={inputs[item.no] || ''}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, [item.no]: e.target.value }))
                    }
                  />
                  <span className="essay-unit">{item.unit}</span>
                </div>
                {fb && (
                  <div className={`feedback-msg ${fb.ok ? 'correct' : 'wrong'}`}>
                    {fb.text}
                  </div>
                )}
                <div
                  className={`solution-box ${showSolutions ? 'open' : ''}`}
                  dangerouslySetInnerHTML={{ __html: item.solution_html }}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            marginTop: '24px'
          }}
        >
          <button
            className="btn-sm"
            style={{ padding: '12px 28px', fontSize: '1rem' }}
            onClick={handleCheckAnswers}
          >
            ✓ Periksa Jawaban
          </button>
          <button
            className="btn-sm btn-outline"
            style={{ padding: '12px 24px', fontSize: '1rem' }}
            onClick={() => setShowSolutions(!showSolutions)}
          >
            📖 Tampilkan / Sembunyikan Pembahasan
          </button>
        </div>

        {scoreBanner && (
          <div
            style={{
              marginTop: '20px',
              textAlign: 'center',
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--primary)',
              background: 'var(--primary-light)',
              padding: '14px',
              borderRadius: '12px'
            }}
          >
            {scoreBanner}
          </div>
        )}

        <div className="btn-back-wrap">
          <Link to="/ayo-berlatih" className="btn-pill">
            Back
          </Link>
        </div>
      </main>
    </>
  );
}

