import { getSupabaseClient } from './supabase';
import {
  DEFAULT_SITE_CONTENTS,
  DEFAULT_EXTERNAL_LINKS,
  DEFAULT_VIDEOS,
  DEFAULT_MC_QUESTIONS,
  DEFAULT_ESSAY_QUESTIONS
} from '../data/defaultData';

const LS_KEYS = {
  SITE_CONTENTS: 'bd_site_contents_v1',
  LINKS: 'bd_external_links_v1',
  VIDEOS: 'bd_videos_v1',
  MC: 'bd_mc_questions_v1',
  ESSAY: 'bd_essay_questions_v1'
};

function readLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) {
    // ignore
  }
  return fallback;
}

function writeLocal(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Gagal menyimpan ke localStorage:', e);
  }
}

// ==================== SITE CONTENTS (PETUNJUK, TUJUAN, BAHAN BACAAN, PENYUSUN) ====================
export async function fetchSiteContent(key) {
  const supabase = getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('site_contents')
      .select('content')
      .eq('key', key)
      .single();
    if (!error && data && data.content) {
      return data.content;
    }
  }
  const allLocal = readLocal(LS_KEYS.SITE_CONTENTS, DEFAULT_SITE_CONTENTS);
  return allLocal[key] || DEFAULT_SITE_CONTENTS[key];
}

export async function saveSiteContent(key, content) {
  const allLocal = readLocal(LS_KEYS.SITE_CONTENTS, DEFAULT_SITE_CONTENTS);
  const updatedLocal = { ...allLocal, [key]: content };
  writeLocal(LS_KEYS.SITE_CONTENTS, updatedLocal);

  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase
      .from('site_contents')
      .upsert({ key, content, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    if (!error) {
      return { source: 'supabase', content };
    }
  }
  return { source: 'local', content };
}

// ==================== EXTERNAL LINKS & QR CODES ====================
export async function fetchExternalLinks(category = null) {
  const supabase = getSupabaseClient();
  if (supabase) {
    let query = supabase.from('external_links').select('*').order('id', { ascending: true });
    if (category) query = query.eq('category', category);
    const { data, error } = await query;
    if (!error && Array.isArray(data) && data.length > 0) {
      return data;
    }
  }
  const all = readLocal(LS_KEYS.LINKS, DEFAULT_EXTERNAL_LINKS);
  const list = Array.isArray(all) ? all : DEFAULT_EXTERNAL_LINKS;
  return category ? list.filter((item) => item.category === category) : list;
}

export async function addExternalLink(item) {
  const payload = {
    category: item.category || 'pilihan-ganda',
    title: item.title.trim(),
    description: (item.description || '').trim(),
    url: item.url.trim(),
    thumbnail_url: item.thumbnail_url || '',
    custom_qr_url: item.custom_qr_url || '',
    show_qr: item.show_qr !== undefined ? item.show_qr : true
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('external_links').insert([payload]).select();
    if (!error && data && data[0]) {
      return { data: data[0], source: 'supabase' };
    }
  }

  const current = readLocal(LS_KEYS.LINKS, DEFAULT_EXTERNAL_LINKS);
  const newItem = { ...payload, id: Date.now() };
  const updated = [...(Array.isArray(current) ? current : DEFAULT_EXTERNAL_LINKS), newItem];
  writeLocal(LS_KEYS.LINKS, updated);
  return { data: newItem, source: 'local' };
}

export async function deleteExternalLink(id) {
  const supabase = getSupabaseClient();
  if (supabase) {
    await supabase.from('external_links').delete().eq('id', id);
  }
  const current = readLocal(LS_KEYS.LINKS, DEFAULT_EXTERNAL_LINKS);
  if (Array.isArray(current)) {
    writeLocal(
      LS_KEYS.LINKS,
      current.filter((x) => x.id !== id)
    );
  }
  return true;
}

// ==================== VIDEOS ====================
export async function fetchVideos() {
  const supabase = getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('id', { ascending: true });
    if (!error && Array.isArray(data) && data.length > 0) return data;
  }
  const list = readLocal(LS_KEYS.VIDEOS, DEFAULT_VIDEOS);
  return Array.isArray(list) ? list : DEFAULT_VIDEOS;
}

export function convertYouTubeToEmbed(url) {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

export async function addVideo(item) {
  const embed_url = item.embed_url || convertYouTubeToEmbed(item.youtube_url);
  const payload = {
    title: item.title.trim(),
    subtitle: (item.subtitle || '').trim(),
    youtube_url: item.youtube_url.trim(),
    embed_url,
    thumbnail_url: item.thumbnail_url || '/assets/images/thumb-video-1.png'
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('videos').insert([payload]).select();
    if (!error && data && data[0]) {
      return { data: data[0], source: 'supabase' };
    }
  }

  const current = await fetchVideos();
  const newItem = { ...payload, id: Date.now() };
  writeLocal(LS_KEYS.VIDEOS, [...current, newItem]);
  return { data: newItem, source: 'local' };
}

export async function updateVideo(id, item) {
  const embed_url = item.embed_url || convertYouTubeToEmbed(item.youtube_url);
  const payload = {
    title: item.title.trim(),
    subtitle: (item.subtitle || '').trim(),
    youtube_url: item.youtube_url.trim(),
    embed_url,
    thumbnail_url: item.thumbnail_url || '/assets/images/thumb-video-1.png'
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    await supabase.from('videos').update(payload).eq('id', id);
  }
  const current = await fetchVideos();
  writeLocal(
    LS_KEYS.VIDEOS,
    current.map((v) => (v.id === id ? { ...v, ...payload } : v))
  );
  return true;
}

export async function deleteVideo(id) {
  const supabase = getSupabaseClient();
  if (supabase) {
    await supabase.from('videos').delete().eq('id', id);
  }
  const current = await fetchVideos();
  writeLocal(
    LS_KEYS.VIDEOS,
    current.filter((x) => x.id !== id)
  );
  return true;
}

// ==================== PILIHAN GANDA (MEMBUKA KOTAK) ====================
export async function fetchMcQuestions() {
  const supabase = getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('mc_questions')
      .select('*')
      .order('no', { ascending: true });
    if (!error && Array.isArray(data) && data.length > 0) return data;
  }
  const list = readLocal(LS_KEYS.MC, DEFAULT_MC_QUESTIONS);
  return Array.isArray(list) ? list : DEFAULT_MC_QUESTIONS;
}

// ==================== SOAL ISIAN ====================
export async function fetchEssayQuestions() {
  const supabase = getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('essay_questions')
      .select('*')
      .order('no', { ascending: true });
    if (!error && Array.isArray(data) && data.length > 0) return data;
  }
  const list = readLocal(LS_KEYS.ESSAY, DEFAULT_ESSAY_QUESTIONS);
  return Array.isArray(list) ? list : DEFAULT_ESSAY_QUESTIONS;
}

// ==================== SINKRONISASI DATA LOKAL KE SUPABASE ====================
export async function syncLocalDataToSupabase() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Kunci Supabase URL & Anon Key belum terhubung.');
  }

  const allSite = readLocal(LS_KEYS.SITE_CONTENTS, DEFAULT_SITE_CONTENTS);
  for (const key of Object.keys(DEFAULT_SITE_CONTENTS)) {
    const content = allSite[key] || DEFAULT_SITE_CONTENTS[key];
    const { error } = await supabase
      .from('site_contents')
      .upsert({ key, content, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    if (error) {
      throw new Error(
        `Gagal mengakses tabel Supabase (${error.message}). Pastikan kamu sudah menjalankan isi file supabase-schema.sql di SQL Editor Supabase.`
      );
    }
  }

  const localLinks = (await fetchExternalLinks()).map(({ id, created_at, ...rest }) => rest);
  const { data: existingLinks } = await supabase.from('external_links').select('id').limit(1);
  if (!existingLinks || existingLinks.length === 0) {
    await supabase.from('external_links').insert(localLinks);
  }

  const localVideos = (await fetchVideos()).map(({ id, created_at, ...rest }) => rest);
  const { data: existingVids } = await supabase.from('videos').select('id').limit(1);
  if (!existingVids || existingVids.length === 0) {
    await supabase.from('videos').insert(localVideos);
  }

  return true;
}
