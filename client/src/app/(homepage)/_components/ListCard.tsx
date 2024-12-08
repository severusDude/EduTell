"use client";

import { motion } from "framer-motion";
import {
  ChartNoAxesColumnIncreasingIcon,
  Clock,
  GraduationCapIcon,
  PartyPopper,
} from "lucide-react";
import React from "react";
import Card from "./Card";

const listData = [
  {
    text: "Belajar Flexsibel",
    Icon: Clock,
  },
  {
    text: "Materi Terupdate",
    Icon: ChartNoAxesColumnIncreasingIcon,
  },
  {
    text: "Pengajar Profesional",
    Icon: GraduationCapIcon,
  },
  {
    text: "Sertifikat Resmi",
    Icon: PartyPopper,
  },
];

const ListCard = () => {
  const repeatedData = [...listData, ...listData]; // Duplikasi data untuk menghindari jeda

  return (
    <>
      <div className="items-center justify-between hidden lg:flex">
        {listData.map((item, index) => (
          <Card text={item.text} key={`static-${index}`} Icon={item.Icon} />
        ))}
      </div>

      <motion.div
        className="relative overflow-hidden lg:hidden"
        style={{ width: "100%" }}
      >
        <motion.div
          className="flex items-center gap-4"
          animate={{
            translateX: "-100%", // Bergerak sepanjang lebar kontainer
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            display: "flex",
            gap: "16px", // Sesuaikan gap agar elemen menyambung
          }}
        >
          {repeatedData.map((item, index) => (
            <Card text={item.text} key={`moving-${index}`} Icon={item.Icon} />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ListCard;
