import CardCourse from "@/components/CardCourse";
import React from "react";

const Class = () => {
  return (
    <section className="border-[0.3px] shadow-md rounded-md p-4">
      <div className="text-text-primary">
        <h1 className="text-xl font-semibold">Kelas Saya</h1>
        <p className="text-base">
          Semua Yang Anda Butuhkan Untuk Belajar Ada Di Sini.
        </p>
      </div>
      <div className="flex flex-wrap justify-between gap-4 mt-12">
        {Array.from({ length: 9 }).map((_, index) => (
          <div className="w-full lg:w-[260px] border-[0.3px] rounded-md">
            <CardCourse key={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Class;
