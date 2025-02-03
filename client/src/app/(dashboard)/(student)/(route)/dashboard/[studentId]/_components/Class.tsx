"use client";

import CardCourse from "@/components/CardCourse";
import Loading from "@/components/Loading";
import { CourseType } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";

const Class = ({
  session,
  token,
  isLoading,
  dataCourse,
}: {
  session: string;
  token: string;
  isLoading: boolean;
  dataCourse: CourseType[];
}) => {

  return (
    <section className="border-[0.3px] shadow-md rounded-md p-4">
      <div className="text-text-primary">
        <h1 className="text-xl font-semibold">Kelas Saya</h1>
        <p className="text-base">
          Semua Yang Anda Butuhkan Untuk Belajar Ada Di Sini.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 mt-12">
        {isLoading ? (
          <Loading />
        ) : dataCourse?.length === 0 ? (
          <div className="w-full text-center text-text-primary">
            <h1 className="text-center">Tidak ada kursus yang di ikuti</h1>
            <Link
              href={"/course"}
              className="text-sm underline hover:text-primary-color/80"
            >
              Cari Course
            </Link>
          </div>
        ) : (
          dataCourse?.map((item: CourseType, index: number) => (
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
