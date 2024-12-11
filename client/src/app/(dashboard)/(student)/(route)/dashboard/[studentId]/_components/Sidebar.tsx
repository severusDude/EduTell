import { LogOutIcon, Settings } from "lucide-react";
import React, { Dispatch } from "react";
import ButtonLogout from "../profile/_components/ButtonLogout";

const itemSidebar = [
  {
    name: "Home",
    content: "content",
  },
  {
    name: "Kelas",
    content: "class",
  },
  {
    name: "Tugas",
    content: "task",
  },
  {
    name: "Progress Belajar",
    content: "progress",
  },
];

const Sidebar = ({
  token,
  contentView,
  setContentView,
}: {
  token: string;
  contentView: string;
  setContentView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="px-4 py-4 rounded-md shadow-md min-h-[428px] flex flex-col gap-2 border-[0.3px]">
      {itemSidebar.map((item, index) => (
        <div
          key={index}
          className={`w-full px-4 py-2 text-base text-text-primary rounded-md border-[0.3px] cursor-pointer hover:bg-primary-color/80 ${
            item.content === contentView && "bg-primary-color text-white"
          }`}
          onClick={() => setContentView(item.content)}
        >
          {item.name}
        </div>
      ))}

      <div className="mt-auto space-y-2">
        <div className="flex items-center w-full gap-2 px-4 py-2 text-base rounded-md hover:bg-primary-color/80 border-[0.3px] cursor-pointer">
          <Settings />
          Pengaturan
        </div>
        <div className="flex items-center w-full gap-2 px-4 py-2  text-base rounded-md hover:bg-red-600 border-[0.3px] cursor-pointer">
          <LogOutIcon />
          <ButtonLogout token={token} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
