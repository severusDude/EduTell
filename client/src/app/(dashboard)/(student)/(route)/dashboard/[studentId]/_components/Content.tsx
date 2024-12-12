import {
  BookOpenText,
  ChartColumnIncreasingIcon,
  ListChecks,
} from "lucide-react";
import React from "react";
import Chart from "./Chart";

const Content = ({ sessionName }: { sessionName: string }) => {
  return (
    <div className="border-[0.3px] shadow-md rounded-md p-4 lg:min-h-[428px] space-y-4">
      <div className="p-4 space-y-2 rounded-md bg-primary-color">
        <h1 className="text-2xl font-semibold text-white">
          Selamat Datang {sessionName}
        </h1>
        <p className="text-white">
          Senang melihat Anda kembali. Yuk, lanjutkan perjalanan belajar Anda!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-1 lg:gap-12">
        <div className="border-[0.3px] p-3 rounded-md mt-auto">
          <div className="flex flex-col gap-0 lg:items-center lg:flex-row lg:gap-4">
            <BookOpenText
              size={48}
              className="w-8 h-8 text-primary-color lg:w-12 lg:h-12"
            />
            <p className="text-base font-semibold lg:text-2xl text-primary-color">
              Kelas
            </p>
          </div>
          <h2 className="mt-2 text-sm lg:text-base text-primary-color">
            4 Kelas
          </h2>
        </div>
        <div className="border-[0.3px] p-3 rounded-md mt-auto">
          <div className="flex flex-col gap-0 lg:items-center lg:flex-row lg:gap-4">
            <ChartColumnIncreasingIcon
              size={48}
              className="w-8 h-8 text-primary-color lg:w-12 lg:h-12"
            />
            <p className="text-base font-semibold lg:text-2xl text-primary-color">
              Progress
            </p>
          </div>
          <h2 className="mt-2 text-sm lg:text-base text-primary-color">
            75/100
          </h2>
        </div>
        <div className="border-[0.3px] p-3 rounded-md mt-auto">
          <div className="flex flex-col gap-0 lg:items-center lg:flex-row lg:gap-4">
            <ListChecks
              size={48}
              className="w-8 h-8 text-primary-color lg:w-12 lg:h-12"
            />
            <p className="text-base font-semibold lg:text-2xl text-primary-color">
              Tugas
            </p>
          </div>
          <h2 className="mt-2 text-sm lg:text-base text-primary-color">
            10/35
          </h2>
        </div>
      </div>
      <Chart />
    </div>
  );
};

export default Content;
