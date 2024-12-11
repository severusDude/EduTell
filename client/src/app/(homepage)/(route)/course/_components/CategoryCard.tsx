import Image from "next/image";
import React from "react";

const CategoryCard = ({ text, image }: { text: string; image: string }) => {
  return (
    <div className="w-full lg:w-[380px] px-4 py-2 border-[0.3px] flex items-center gap-4 rounded-md shadow-lg">
      <Image src={`/image/${image}`} alt={text} width={72} height={72} />
      <p className="text-2xl font-semibold">{text}</p>
    </div>
  );
};

export default CategoryCard;
