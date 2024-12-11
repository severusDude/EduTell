import React from "react";

const Footer = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 bg-primary-color mt-24 lg:px-[64px] px-4 gap-6 py-[34px]">
      <h1 className="text-3xl font-semibold text-white">EduTell</h1>
      <div className="flex flex-col gap-2 text-xl text-white">
        <h1 className="font-semibold">Navigasi</h1>
        <p className="text-sm cursor-pointer">Tentang Kami</p>
        <p className="text-sm cursor-pointer">Kontak</p>
        <p className="text-sm cursor-pointer">Kebijakan & Privasi</p>
        <p className="text-sm cursor-pointer">Syarat & Ketentukan</p>
        <p className="text-sm cursor-pointer">Karir</p>
      </div>
      <div className="flex flex-col gap-2 text-xl text-white">
        <h1 className="font-semibold">Dukungan & Layanan</h1>
        <p className="text-sm cursor-pointer">Bantuan & FAQ</p>
        <p className="text-sm cursor-pointer">Pusat Pembayaran</p>
      </div>
      <div className="flex flex-col gap-2 text-sm text-white">
        <h1 className="text-xl font-semibold">Sosial Media</h1>
        <p>Facebook</p>
        <p className="cursor-pointer">Instagram</p>
        <p className="cursor-pointer">Tik-Tok</p>
      </div>
    </div>
  );
};

export default Footer;
