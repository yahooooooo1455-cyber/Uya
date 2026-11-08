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

  const rawUrl =
    saved.supabaseUrl ||
    import.meta.env.VITE_SUPABASE_URL ||
    'https://mgsfmmxrdwxecqoymeep.supabase.co';
  const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');

  return {
    supabaseUrl: cleanSupabaseUrl,
    supabaseAnonKey:
      saved.supabaseAnonKey ||
      import.meta.env.VITE_SUPABASE_ANON_KEY ||
      'sb_publishable_7v1l51UvEowFKnkuiTXhKw_BwLAs0u9',
    cloudinaryCloudName:
      saved.cloudinaryCloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'g8pomkme',
    cloudinaryUploadPreset:
      saved.cloudinaryUploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
    cloudinaryApiKey:
      saved.cloudinaryApiKey || import.meta.env.VITE_CLOUDINARY_API_KEY || '634327989619628',
    cloudinaryApiSecret:
      saved.cloudinaryApiSecret ||
      import.meta.env.VITE_CLOUDINARY_API_SECRET ||
      atob('amxfelIxOWhDLXJlUlhkRC1mOTAzdHhIaGR3')
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

