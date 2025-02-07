import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Blob from "./Blob";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="relative flex flex-col items-center px-4 mt-52 lg:mt-2 lg:flex-row lg:px-0 lg:py-0"
    >
      <Blob url="/image/blob-2.png" className="-left-16 -top-40" />
      <Blob url="/image/blob-1.png" className="-right-0 lg:-right-16 -top-32" />
      <div className="lg:w-1/2">
        <h2 className="lg:text-6xl text-5xl leading-[130%] font-bold">
          <span className="text-primary-color">Belajar</span> Tanpa <br />{" "}
          Batas, Mulai <br />{" "}
          <span className="text-primary-color">Hari ini!</span>
        </h2>
        <p className="text-sm text-justify w-[90%]">
          Temukan kursus terbaik untuk meningkatkan skill-mu, dari pemula hingga
          ahli. Belajar fleksibel kapan saja, di mana saja.
        </p>
        <div className="flex flex-col gap-2 py-6 lg:block lg:space-x-2">
          <Link href={"/register"}>
            <Button className="text-[20px] px-8 py-6 bg-primary-color hover:bg-primary-color/80 w-fit">
              Daftar Sekarang
            </Button>
          </Link>
          <Link href={"/course"}>
            <Button
              className="text-[20px] px-8 py-6 text-primary-color hover:text-primary-color/80 border-primary-color w-fit"
              variant={"outline"}
            >
              <span>Lihat Course</span>
              <ChevronRightIcon size={32} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="text-center lg:w-1/2">
        <Image
          className="mx-auto"
          src={"/image/Hero-img.png"}
          alt=""
          width={600}
          height={600}
        />
      </div>
    </section>
  );
};

export default HeroSection;
