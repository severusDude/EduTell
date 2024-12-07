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
  return (
    <div className="flex items-center justify-between">
      {listData.map((item, index) => (
        <Card text={item.text} key={index} Icon={item.Icon} />
      ))}
    </div>
  );
};

export default ListCard;
