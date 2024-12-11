import { LucideIcon, LucideProps } from "lucide-react";
import React from "react";

const Card = ({ text, Icon }: { text: string; Icon: LucideIcon }) => {
  return (
    <div className="shadow-xl rounded-md flex justify-between items-center px-[30px] py-[30px] w-[267px] border-[0.3px] hover:opacity-90 transition-all ease-in-out cursor-pointer">
      <Icon size={48} className="text-primary-color" />
      <p className="text-[20px] text-slate-800 font-bold w-[137px]">
        {text}
      </p>
    </div>
  );
};

export default Card;
