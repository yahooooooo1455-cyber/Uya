import { getRuntimeConfig } from './supabase';

export function isCloudinaryConfigured() {
  const { cloudinaryCloudName, cloudinaryUploadPreset } = getRuntimeConfig();
  return Boolean(
    cloudinaryCloudName &&
      cloudinaryUploadPreset &&
      cloudinaryCloudName !== 'your-cloud-name' &&
      cloudinaryUploadPreset !== 'your-unsigned-upload-preset'
  );
}

/**
 * Upload file gambar (Thumbnail / QR Code / Gambar Soal) ke Cloudinary.
 * Jika Cloudinary belum dikonfigurasi, otomatis mengubah gambar menjadi Data URL lokal
 * supaya tetap bisa langsung dipakai dan tampil saat percobaan!
 */
export async function uploadImageToCloudinary(file) {
  if (!file) throw new Error('Pilih file gambar terlebih dahulu.');

  const { cloudinaryCloudName, cloudinaryUploadPreset } = getRuntimeConfig();

  if (isCloudinaryConfigured()) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryUploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(
        errData?.error?.message || 'Gagal mengunggah gambar ke Cloudinary. Periksa Cloud Name & Upload Preset.'
      );
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      source: 'cloudinary'
    };
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

