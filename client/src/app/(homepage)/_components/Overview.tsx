import Image from "next/image";
import React from "react";
import Blob from "./Blob";

const Overview = () => {
  return (
    <section className="px-4 mt-24">
      <div className="space-y-8 text-center">
        <h1 className="text-4xl lg:text-5xl font-semibold w-[80%] mx-auto">
          Jelajahi <span className="text-primary-color">Dunia Baru</span>, Satu
          Kursus dalam <span className="text-primary-color">Satu Waktu</span>
        </h1>
        <p className="lg:w-[70%] w-full mx-auto text-base lg:text-2xl text-text-primary">
          Dapatkan akses ke ratusan kursus dengan materi praktis dan instruktur
          berpengalaman. Semua yang Anda butuhkan untuk berkembang, hanya dengan
          beberapa klik.
        </p>
      </div>

      <section className="flex lg:flex-row flex-col justify-between lg:w-[90%] mx-auto rounded-md  px-6 py-8 transparent-background gap-4 relative mt-16 border-2 border-white">
        <Blob
          url="/image/blob-3.png"
          width={700}
          height={700}
          className="-translate-x-1/2 -top-40 lg:-top-52 left-1/2"
        />
        <div className="space-y-4 lg:w-1/3">
          <h2 className="text-4xl font-semibold text-center lg:text-start">
            Belajar <span className="text-primary-color">Modern</span>, Hasil{" "}
            <span className="text-primary-color">Maksimal</span>
          </h2>
          <p className="text-base text-justify  lg:text-xl text-text-primary">
            Dapatkan pengalaman belajar online terbaik dengan modul lengkap,
            pelatihan interaktif, dan sertifikat resmi.
          </p>
        </div>
        <div>
          <Image
            src={"/image/dash-1.png"}
            alt="image-dashboard"
            width={800}
            height={800}
          />
        </div>
      </section>
    </section>
  );
};

export default Overview;
