import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const DescriptionSectionDetailCourse = () => {
  return (
    <div className="w-3/4">
      {/* deskripsi */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Deskripsi</h2>
        <div className="text-justify text-text-primary">
          <p>
            Pelajari dasar-dasar web development dan mulailah membangun website
            Anda sendiri! Kelas ini akan membimbing Anda memahami elemen utama
            dalam pengembangan website, mulai dari HTML, CSS, hingga JavaScript.
            Dengan metode pembelajaran yang mudah diikuti, Anda akan
            mempelajari:
          </p>
          <ul>
            <li>1. HTML untuk membuat struktur halaman.</li>
            <li>2. CSS untuk mendesain tampilan website.</li>
            <li>
              3. JavaScript untuk menambahkan interaktivitas pada website Anda.
            </li>
          </ul>
          <p>
            Kelas ini dirancang untuk pemula tanpa pengalaman coding, sehingga
            Anda dapat belajar dengan nyaman, langkah demi langkah. Di akhir
            kelas, Anda akan mampu membuat website sederhana yang responsif dan
            fungsional.
          </p>
        </div>
      </div>

      {/* benefit */}
      <div className="mt-12 space-y-2">
        <h2 className="text-2xl font-semibold">Apa yang anda dapatkan?</h2>
        <div className="text-justify text-text-primary">
          <p>1. Pemahaman dasar tentang komponen website</p>
          <p>2. Langkah demi langkah membangun halaman web responsif.</p>
          <p>3. Studi kasus langsung dengan proyek sederhana.</p>
          <p>4. Sertifikat</p>
        </div>
      </div>

      {/* silabus */}
      <div className="mt-12 space-y-2">
        <h2 className="text-2xl font-semibold">Silabus</h2>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value="item-1" className="px-6 shadow-md">
                <AccordionTrigger className="text-base">
                  Introduction
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-text-primary">
                    <p>1. Pemahaman dasar tentang komponen website</p>
                    <p>
                      2. Langkah demi langkah membangun halaman web responsif.
                    </p>
                    <p>3. Studi kasus langsung dengan proyek sederhana.</p>
                    <p>4. Sertifikat</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionSectionDetailCourse;
