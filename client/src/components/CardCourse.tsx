import { ChartNoAxesColumnIncreasing, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardCourse = () => {
  return (
    <Link
      scroll={true}
      href={`/course/web`}
      className="w-full rounded-md shadow-xl cursor-pointer lg:w-auto hover:opacity-95"
    >
      <Image
        className="w-full rounded-t-md"
        src={"/image/image-placeholder.png"}
        alt="image-placeholder"
        width={424}
        height={125}
      />
      <div className="p-5 space-y-2">
        <h4 className="text-2xl font-semibold">Web Development Dasar</h4>
        <div className="flex items-center gap-2">
          <Star className="text-[#FFEA28]" fill="#FFEA28" size={18} />
          <Star className="text-[#FFEA28]" fill="#FFEA28" size={18} />
          <Star className="text-[#FFEA28]" fill="#FFEA28" size={18} />
          <Star className="text-[#FFEA28]" fill="#FFEA28" size={18} />
          <Star size={18} />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <p className="line-through text-text-primary">Rp.300,000</p>
          <p>RP.150,000</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <p>45 Jam</p>
          </div>
          <div className="flex items-center gap-2">
            <ChartNoAxesColumnIncreasing size={20} />
            <p>Beginer</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardCourse;
