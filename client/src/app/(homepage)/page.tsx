import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import ListCard from "./_components/ListCard";
import Blob from "./_components/Blob";
import CardCourse from "@/components/CardCourse";
import CardReview from "./_components/CardReview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main>
      {/* hero section start */}
      <section
        id="hero-section"
        className="flex items-center mt-[72px] relative"
      >
        <Blob url="/image/blob-2.png" className="-left-16 -top-40" />
        <Blob url="/image/blob-1.png" className="-right-16 -top-32" />
        <div className="w-1/2">
          <h2 className="text-6xl leading-[130%] font-bold">
            <span className="text-primary-color">Belajar</span> Tanpa <br />{" "}
            Batas, Mulai <br />{" "}
            <span className="text-primary-color">Hari ini!</span>
          </h2>
          <p className="text-2xl text-justify w-[90%]">
            Temukan kursus terbaik untuk meningkatkan skill-mu, dari pemula
            hingga ahli. Belajar fleksibel kapan saja, di mana saja.
          </p>
          <div className="py-6 space-x-4">
            <Button className="text-[20px] px-8 py-6 bg-primary-color hover:bg-primary-color/80">
              Daftar Sekarang
            </Button>
            <Button
              className="text-[20px] px-8 py-6 text-primary-color hover:text-primary-color/80 border-primary-color"
              variant={"outline"}
            >
              <span>Lihat Course</span>
              <ChevronRightIcon size={32} />
            </Button>
          </div>
        </div>
        <div className="w-1/2 text-center">
          <Image
            className="mx-auto"
            src={"/image/Hero-img.png"}
            alt=""
            width={600}
            height={600}
          />
        </div>
      </section>
      {/* hero section end */}

      {/* list section start */}
      <div className="mt-24">
        <ListCard />
      </div>
      {/* list section end */}

      {/* Section 2 start */}
      <section className="mt-24">
        <div className="space-y-8 text-center">
          <h1 className="text-5xl font-semibold w-[80%] mx-auto">
            Jelajahi <span className="text-primary-color">Dunia Baru</span>,
            Satu Kursus dalam{" "}
            <span className="text-primary-color">Satu Waktu</span>
          </h1>
          <p className="w-[70%] mx-auto text-2xl text-text-primary">
            Dapatkan akses ke ratusan kursus dengan materi praktis dan
            instruktur berpengalaman. Semua yang Anda butuhkan untuk berkembang,
            hanya dengan beberapa klik.
          </p>
        </div>

        <section className="flex justify-between w-[90%] mx-auto rounded-md  px-6 py-8 transparent-background gap-4 relative mt-16 border-2 border-white">
          <Blob
            url="/image/blob-3.png"
            width={700}
            height={700}
            className="-translate-x-1/2 -top-52 left-1/2"
          />
          <div className="w-1/3 space-y-4">
            <h2 className="text-4xl font-semibold text-start">
              Belajar <span className="text-primary-color">Modern</span>, Hasil{" "}
              <span className="text-primary-color">Maksimal</span>
            </h2>
            <p className="text-xl text-justify text-text-primary">
              Dapatkan pengalaman belajar online terbaik dengan modul lengkap,
              pelatihan interaktif, dan sertifikat resmi.
            </p>
          </div>
          <div>
            <Image
              src={"/image/dash-1.png"}
              alt="image-dashboard"
              width={800}
              height={800}
            />
          </div>
        </section>
      </section>
      {/* Section 2 end */}

      {/* Section Course start */}
      <section className="mt-24">
        <h1 className="text-5xl font-semibold w-[80%] mx-auto text-center">
          Temukan <span className="text-primary-color">Kursus</span> yang Tepat
          untuk <span className="text-primary-color">Anda</span>
        </h1>

        <div className="grid grid-cols-3 gap-16 mt-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardCourse key={index} />
          ))}
        </div>
        <div className="w-full mt-12">
          <Button className="flex items-center gap-3 px-8 mx-auto bg-primary-color hover:bg-primary-color/80">
            Lihat Course Lainnya <ChevronRightIcon />
          </Button>
        </div>
      </section>
      {/* Section Course end */}

      {/* Section Review Start */}
      <section className="mt-24">
        <h1 className="text-5xl font-semibold text-center">
          Kata <span className="text-primary-color">Mereka</span>
        </h1>
        <div className="flex w-full mt-12 overflow-x-auto">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardReview key={index} />
          ))}
        </div>
        <div className="flex w-full mt-12 overflow-x-auto">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardReview key={index} />
          ))}
        </div>
      </section>
      {/* Section Review End */}

      {/* Section FAQ Start */}
      <section className="mt-24">
        <h1 className="text-5xl font-bold text-center text-transparent bg-gradient-to-tl from-primary-color to-slate-700 bg-clip-text">
          FAQ
        </h1>

        <div className="grid grid-cols-2 gap-8 mt-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value="item-1" className="px-6 shadow-lg">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </section>
      {/* Section FAQ End */}
    </main>
  );
}
