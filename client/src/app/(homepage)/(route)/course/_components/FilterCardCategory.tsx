import CardCourse from "@/components/CardCourse";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { PaginationComponents } from "./Pagination";

const FilterCardCategory = () => {
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
        <div className="flex flex-wrap justify-between w-full gap-4 lg:w-3/4 ">
          {Array.from({ length: 9 }).map((_, index) => (
            <div className="w-full lg:w-[280px]">
              <CardCourse key={index} />
            </div>
          ))}
          <div className="w-full">
            <PaginationComponents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCardCategory;
