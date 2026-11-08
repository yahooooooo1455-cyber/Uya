import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import {
  HalamanMuka,
  Petunjuk,
  TujuanPembelajaran,
  BahanBacaan,
  DaftarPustaka,
  Penyusun
} from './pages/HomePages';
import { VideoPembelajaranMenu, VideoDetailPage } from './pages/VideoPages';
import {
  AyoBerlatihMenu,
  PilihanGandaPage,
  IsianPage
} from './pages/LatihanPages';
import AdminKelola from './pages/AdminKelola';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HalamanMuka />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/halaman-muka" element={<Navigate to="/" replace />} />
          <Route path="/petunjuk" element={<Petunjuk />} />
          <Route path="/tujuan-pembelajaran" element={<TujuanPembelajaran />} />
          <Route path="/bahan-bacaan" element={<BahanBacaan />} />
          <Route path="/video-pembelajaran" element={<VideoPembelajaranMenu />} />
          <Route
            path="/video-pembelajaran-1"
            element={<VideoDetailPage fixedIndex={0} />}
          />
          <Route
            path="/video-pembelajaran-2"
            element={<VideoDetailPage fixedIndex={1} />}
          />
          <Route path="/video/:id" element={<VideoDetailPage />} />
          <Route path="/ayo-berlatih" element={<AyoBerlatihMenu />} />
          <Route path="/pilihan-ganda" element={<PilihanGandaPage />} />
          <Route path="/isian" element={<IsianPage />} />
          <Route path="/daftar-pustaka" element={<DaftarPustaka />} />
          <Route path="/penyusun" element={<Penyusun />} />
          <Route path="/penulis" element={<Navigate to="/penyusun" replace />} />
          <Route path="/guru" element={<AdminKelola />} />
          <Route path="/admin" element={<AdminKelola />} />
          <Route path="/kelola" element={<AdminKelola />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

