import { ChartNoAxesColumnIncreasing, Clock, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const CardCourse = () => {
  return (
    <div className="w-[400px] rounded-md shadow-xl cursor-pointer hover:opacity-95">
      <Image
        className="rounded-t-md"
        src={"/image/image-placeholder.png"}
        alt="image-placeholder"
        width={424}
        height={125}
      />
      <div className="p-5 space-y-4">
        <h4 className="text-3xl font-semibold">Web Development Dasar</h4>
        <div className="flex items-center gap-2">
          <Star className="text-[#FFEA28]" fill="#FFEA28" />
          <Star className="text-[#FFEA28]" fill="#FFEA28" />
          <Star className="text-[#FFEA28]" fill="#FFEA28" />
          <Star className="text-[#FFEA28]" fill="#FFEA28" />
          <Star />
        </div>
        <div className="flex items-center gap-2 text-xl">
          <p className="line-through text-text-primary">Rp.300,000</p>
          <p>RP.150,000</p>
        </div>
        <div className="flex items-center gap-4 text-xl">
          <div className="flex items-center gap-2">
            <Clock />
            <p>45 Jam</p>
          </div>
          <div className="flex items-center gap-2">
            <ChartNoAxesColumnIncreasing />
            <p>Beginer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCourse;
