export const slugify = (text: string) => {
  return text
    .toLowerCase() // Ubah ke huruf kecil
    .trim() // Hilangkan spasi di awal dan akhir
    .replace(/[\s]+/g, "-") // Ganti spasi dengan tanda hubung
    .replace(/[^a-z0-9\-]/g, ""); // Hilangkan karakter selain huruf, angka, dan tanda hubung
};
