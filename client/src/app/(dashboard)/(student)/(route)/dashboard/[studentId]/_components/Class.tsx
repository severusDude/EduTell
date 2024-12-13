"use client";

import CardCourse from "@/components/CardCourse";
import Loading from "@/components/Loading";
import { CourseType } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const Class = () => {
  const { data: dataCourse, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      return (await axios.get("http://localhost:8000/api/courses")).data;
    },
  });

  return (
    <section className="border-[0.3px] shadow-md rounded-md p-4">
      <div className="text-text-primary">
        <h1 className="text-xl font-semibold">Kelas Saya</h1>
        <p className="text-base">
          Semua Yang Anda Butuhkan Untuk Belajar Ada Di Sini.
        </p>
      </div>
      <div className="flex flex-wrap justify-between gap-4 mt-12">
        {isLoading ? (
          <Loading />
        ) : (
          dataCourse?.data?.map((item: CourseType, index: number) => (
            <div
              className="w-full lg:w-[260px] border-[0.3px] rounded-md"
              key={index}
            >
              <CardCourse key={index} courseData={item} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Class;
