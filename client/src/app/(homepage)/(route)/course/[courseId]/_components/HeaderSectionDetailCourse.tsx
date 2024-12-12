import { ChartColumnIncreasing, Star } from "lucide-react";
import React from "react";

const HeaderSectionDetailCourse = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-semibold text-center">Web Development</h1>
      <div className="flex items-center w-full justify-evenly text-text-primary">
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-2xl font-bold">Peserta</h3>
          <p className="text-xl font-semibold">100 Peserta</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-2xl font-bold">Level</h3>
          <div className="flex items-center gap-2">
            <ChartColumnIncreasing size={32} />
            <p className="text-xl font-semibold">Beginer</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-2xl font-bold">Rating</h3>
          <div className="flex items-center gap-2">
            <Star className="text-[#FFEA28]" fill="#FFEA28" size={24} />
            <Star className="text-[#FFEA28]" fill="#FFEA28" size={24} />
            <Star className="text-[#FFEA28]" fill="#FFEA28" size={24} />
            <Star className="text-[#FFEA28]" fill="#FFEA28" size={24} />
            <Star size={24} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-2xl font-bold">Mentor</h3>
          <p className="text-xl font-semibold">Agus Budiman</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderSectionDetailCourse;
