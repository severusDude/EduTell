import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";
import React from "react";

const PriceSectionDetailCourse = () => {
  return (
    <>
      <div className="w-1/4 border-[0.3px] rounded-md p-4 space-y-4">
        <div className="space-y-2 text-center">
          <h3 className="text-base font-semibold text-text-primary">
            Web Development
          </h3>
          <h2 className="text-xl font-semibold">Rp.200.000</h2>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 w-[70%] mx-auto text-text-primary">
            <CheckCircleIcon className="text-primary-color" />
            <p className="text-base">Akses Selamanya</p>
          </div>
          <div className="flex items-center gap-2 w-[70%] mx-auto text-text-primary">
            <CheckCircleIcon className="text-primary-color" />
            <p className="text-base">Akses 24 Jam</p>
          </div>
          <div className="flex items-center gap-2 w-[70%] mx-auto text-text-primary">
            <CheckCircleIcon className="text-primary-color" />
            <p className="text-base">Sertifikat kelulusan</p>
          </div>
          <div className="flex items-center gap-2 w-[70%] mx-auto text-text-primary">
            <CheckCircleIcon className="text-primary-color" />
            <p className="text-base">Reward Premium</p>
          </div>
        </div>

        <div className="w-full">
          <Button className="w-full bg-primary-color hover:bg-primary-color/80">
            Daftar Kelas
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-20 flex justify-end w-full px-4 py-2 bg-white border-t border-gray-300 shadow-md lg:hidden">
        <Button className="tracking-widest rounded-sm bg-primary-color hover:bg-primary-color/80 border-[0.3px] border-text-primary/70">
          Daftar Kelas
        </Button>
      </div>
    </>
  );
};

export default PriceSectionDetailCourse;
