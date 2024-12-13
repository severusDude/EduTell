"use client";

import CardCourse from "@/components/CardCourse";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { CourseType } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

const CourseList = () => {
  const { data: courseData, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () =>
      (await axios.get("http://localhost:8000/api/courses")).data,
  });

  return (
    <section className="mt-24 lg:block">
      <h1 className="text-5xl font-semibold w-[80%] mx-auto text-center">
        Temukan <span className="text-primary-color">Kursus</span> yang Tepat
        untuk <span className="text-primary-color">Anda</span>
      </h1>

      {isLoading ? (
        <div className="w-full">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 px-4 mt-12 lg:grid-cols-4 lg:px-0 lg:gap-4">
          {courseData.data
            .slice(0, 8)
            .map((item: CourseType, index: number) => (
              <CardCourse key={index} courseData={item} />
            ))}
        </div>
      )}
      <div className="w-full mt-12">
        <Button className="flex items-center gap-3 px-8 mx-auto bg-primary-color hover:bg-primary-color/80">
          Lihat Course Lainnya <ChevronRightIcon />
        </Button>
      </div>
    </section>
  );
};

export default CourseList;
