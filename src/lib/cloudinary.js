import { getRuntimeConfig } from './supabase';

export function isCloudinaryConfigured() {
  const { cloudinaryCloudName, cloudinaryUploadPreset, cloudinaryApiKey } = getRuntimeConfig();
  return Boolean(
    cloudinaryCloudName &&
      cloudinaryCloudName !== 'your-cloud-name' &&
      (cloudinaryUploadPreset || cloudinaryApiKey)
  );
}

async function sha1Hex(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function tryUploadToCloudName(cloudName, file, preset, apiKey, apiSecret) {
  // 1. Coba Unsigned Upload terlebih dahulu
  if (preset) {
    const unsignedForm = new FormData();
    unsignedForm.append('file', file);
    unsignedForm.append('upload_preset', preset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: unsignedForm
    });

    if (res.ok) {
      return await res.json();
    }

    const errJson = await res.json().catch(() => ({}));
    const errMsg = errJson?.error?.message || '';
    // Jika cloud_name salah (misal kurang huruf 'd' di depan), lempar agar bisa dicoba kandidat berikutnya
    if (errMsg.toLowerCase().includes('invalid cloud_name')) {
      throw new Error(errMsg);
    }
  }

  // 2. Jika preset ml_default bertipe Signed, gunakan API Key + API Secret secara otomatis
  if (apiKey && apiSecret) {
    const timestamp = Math.floor(Date.now() / 1000);
    const sigString = `timestamp=${timestamp}${apiSecret}`;
    const signature = await sha1Hex(sigString);

    const signedForm = new FormData();
    signedForm.append('file', file);
    signedForm.append('api_key', apiKey);
    signedForm.append('timestamp', String(timestamp));
    signedForm.append('signature', signature);

    const resSigned = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: signedForm
    });

    if (resSigned.ok) {
      return await resSigned.json();
    }

    const errSigned = await resSigned.json().catch(() => ({}));
    throw new Error(errSigned?.error?.message || 'Gagal upload ke Cloudinary.');
  }

  throw new Error('Gagal mengunggah gambar ke Cloudinary.');
}

/**
 * Upload file gambar (Thumbnail / QR Code / Gambar Slide) ke Cloudinary.
 * Mendukung Unsigned Upload Preset maupun Signed Upload (API Key + Secret).
 */
export async function uploadImageToCloudinary(file) {
  if (!file) throw new Error('Pilih file gambar terlebih dahulu.');

  const {
    cloudinaryCloudName,
    cloudinaryUploadPreset,
    cloudinaryApiKey,
    cloudinaryApiSecret
  } = getRuntimeConfig();

  if (isCloudinaryConfigured()) {
    const candidates = [cloudinaryCloudName];
    if (!cloudinaryCloudName.startsWith('d')) {
      candidates.push(`d${cloudinaryCloudName}`);
    }

    let lastErr = null;
    for (const candidateName of candidates) {
      try {
        const data = await tryUploadToCloudName(
          candidateName,
          file,
          cloudinaryUploadPreset,
          cloudinaryApiKey,
          cloudinaryApiSecret
        );
        return {
          url: data.secure_url,
          source: 'cloudinary'
        };
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr || new Error('Gagal mengunggah gambar ke Cloudinary.');
  }

  // Fallback jika pengguna belum memasukkan kunci Cloudinary: simpan sebagai Base64 Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result,
        source: 'local'
      });
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.readAsDataURL(file);
  });
}
