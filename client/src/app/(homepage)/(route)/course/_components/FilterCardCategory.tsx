"use client";

import CardCourse from "@/components/CardCourse";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { PaginationComponents } from "./Pagination";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CourseType } from "@/types/course";
import Loading from "@/components/Loading";

const FilterCardCategory = () => {
  const { data: dataCourse, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      return (await axios.get("http://localhost:8000/api/courses")).data;
    },
  });

  return (
    <div className="mt-12">
      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <div className="w-full space-y-4 lg:w-1/4 lg:block">
          <h3 className="text-xl font-semibold">Urutkan</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms1" className="w-6 h-6 border-black" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Terbaru
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms1" className="w-6 h-6 border-black" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Termurah
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms1" className="w-6 h-6 border-black" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Populer
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms1" className="w-6 h-6 border-black" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Termahal
                </label>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold">Tingkat Kesulitan</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms1" className="w-6 h-6 border-black" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Beginer
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms1" className="w-6 h-6 border-black" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Intermediate
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms1" className="w-6 h-6 border-black" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Advance
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms1" className="w-6 h-6 border-black" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Termahal
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between w-full gap-4 lg:w-3/4">
          {isLoading ? (
            <Loading />
          ) : (
            dataCourse &&
            dataCourse?.data.map((item: CourseType, index: number) => (
              <div
                key={index}
                className="w-full lg:w-[280px] border-[0.3px] rounded-md"
              >
                <CardCourse key={index} courseData={item} />
              </div>
            ))
          )}
          <div className="w-full">
            <PaginationComponents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCardCategory;
