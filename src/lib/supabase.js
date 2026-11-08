import { createClient } from '@supabase/supabase-js';

const STORAGE_CONFIG_KEY = 'bd_cloud_config_v1';

export function getRuntimeConfig() {
  let saved = {};
  try {
    const raw = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch (e) {
    // ignore
  }

  return {
    supabaseUrl: saved.supabaseUrl || import.meta.env.VITE_SUPABASE_URL || '',
    supabaseAnonKey: saved.supabaseAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    cloudinaryCloudName: saved.cloudinaryCloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
    cloudinaryUploadPreset: saved.cloudinaryUploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
  };
}

export function saveRuntimeConfig(config) {
  localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config));
  window.dispatchEvent(new Event('cloud-config-updated'));
}

export function isSupabaseConfigured() {
  const { supabaseUrl, supabaseAnonKey } = getRuntimeConfig();
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      supabaseUrl.startsWith('http') &&
      !supabaseUrl.includes('your-project-id')
  );
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  const { supabaseUrl, supabaseAnonKey } = getRuntimeConfig();
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Gagal menginisialisasi Supabase client:', err);
    return null;
  }
}

