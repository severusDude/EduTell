import { CourseType } from "@/types/course";
import {
  ChartColumnIncreasing,
  GraduationCap,
  Star,
  UsersIcon,
} from "lucide-react";
import React from "react";

const HeaderSectionDetailCourse = ({
  dataCourse,
}: {
  dataCourse: CourseType;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-semibold text-start lg:text-center">
        {dataCourse?.title}
      </h1>

      <div className="flex flex-col w-full gap-2 lg:flex-row lg:items-center lg:justify-evenly text-text-primary lg:gap-0">
        <div className="flex flex-row items-center gap-2 lg:justify-center lg:flex-col">
          <h3 className="hidden text-2xl font-bold lg:block">Peserta</h3>
          <UsersIcon className="lg:hidden" size={24} />
          <p className="text-base font-semibold lg:text-xl">100 Peserta</p>
        </div>
        <div className="flex flex-row gap-2 lg:justify-center lg:flex-col lg:items-center">
          <h3 className="hidden text-2xl font-bold lg:block">Level</h3>
          <div className="flex items-center gap-2">
            <ChartColumnIncreasing
              size={32}
              className="w-6 h-6 lg:w-8 lg:h-8"
            />
            <p className="text-base font-semibold lg:text-xl">{dataCourse?.difficulty}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 lg:justify-center lg:flex-col lg:items-center">
          <h3 className="hidden text-2xl font-bold lg:block">Rating</h3>
          <div className="flex items-center gap-2">
            <Star className="text-[#FFEA28]" fill="#FFEA28" size={24} />
            <Star className="text-[#FFEA28]" fill="#FFEA28" size={24} />
            <Star className="text-[#FFEA28]" fill="#FFEA28" size={24} />
            <Star className="text-[#FFEA28]" fill="#FFEA28" size={24} />
            <Star size={24} />
          </div>
        </div>
        <div className="flex flex-col items-start lg:gap-2 lg:items-center lg:justify-center">
          <h3 className="hidden text-base font-bold lg:text-2xl lg:block">
            Mentor
          </h3>
          <div className="flex items-center gap-2">
            <GraduationCap className="lg:hidden" />
            <p className="text-base font-semibold capitalize lg:text-xl">{dataCourse?.user_id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSectionDetailCourse;
