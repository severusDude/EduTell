import { Home, LogOutIcon, Settings } from "lucide-react";
import React from "react";
import {
  BookOpenText,
  ChartColumnIncreasingIcon,
  ListChecks,
} from "lucide-react";
import ButtonLogout from "../../profile/_components/ButtonLogout";
import { CourseType } from "@/types/course";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter, useSearchParams } from "next/navigation";
import { BASE_URL } from "@/constant/url";

const itemSidebar = [
  {
    name: "Home",
    content: "content",
    Icon: Home,
  },
  {
    name: "Kelas",
    content: "class",
    Icon: BookOpenText,
  },
  {
    name: "Tugas",
    content: "task",
    Icon: ListChecks,
  },
  {
    name: "Progress",
    content: "progress",
    Icon: ChartColumnIncreasingIcon,
  },
];

const Sidebar = ({
  // token,
  // contentView,
  // setContentView,
  courseSlug,
  dataCourse,
  slugUser,
}: {
  // token: string;
  // contentView: string;
  // setContentView: React.Dispatch<React.SetStateAction<string>>;
  // setContentView: () => void;
  courseSlug: string;
  slugUser: string;
  dataCourse: {
    data: CourseType;
  };
}) => {
  console.log("dari sidebar ", dataCourse);
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQueryParams = (chapter: string, subchapter: string) => {
    router.push(
      `/dashboard/${slugUser}/${courseSlug}?chapter=${chapter}&subchapter=${subchapter}`
    );
  };

  console.log(searchParams.get("chapter"))

  return (
    <>
      <div className="hidden px-4 py-4 rounded-md shadow-md min-h-[428px] lg:flex flex-col gap-2 border-[0.3px]">
        {dataCourse &&
          dataCourse?.data?.chapters?.map((chapter: any, index: number) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem
                value="item-1"
                className="px-4 py-2 text-base text-text-primary rounded-md border-[0.3px] cursor-pointer"
              >
                <AccordionTrigger>{chapter.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1">
                    {chapter.subchapters?.map((item: any, index: number) => (
                      <p
                        onClick={() =>
                          setQueryParams(chapter.position, item.position)
                        }
                        key={index}
                        className={`p-1 rounded-sm border-[0.3px] hover:underline ${
                          searchParams.get("chapter") == chapter.position &&
                          searchParams.get("subchapter") == item.position &&
                          "bg-primary-color"
                        }`}
                      >
                        {item.title}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}

        <div className="mt-auto space-y-2">
          <div className="flex items-center w-full gap-2 px-4 py-2 text-base rounded-md hover:bg-primary-color/80 border-[0.3px] cursor-pointer">
            <Settings />
            Pengaturan
          </div>
          <div className="flex items-center w-full gap-2 px-4 py-2  text-base rounded-md hover:bg-red-600 border-[0.3px] cursor-pointer">
            <LogOutIcon />
            {/* <ButtonLogout token={token} /> */}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-20 flex justify-around w-full p-2 bg-white border-t border-gray-300 shadow-md lg:hidden">
        {/* {itemSidebar.map(({ Icon, content, name }, index) => (
          <p
            key={index}
            className={`flex flex-col items-center transition-all ease-in-out hover:text-primary-color/80 ${
              content === contentView
                ? "text-primary-color"
                : "text-text-primary"
            }`}
            onClick={() => setContentView(content)}
          >
            <Icon />
            <span className="text-sm">{name}</span>
          </p>
        ))} */}
        {/* <p
          className={`flex flex-col items-center transition-all ease-in-out hover:text-primary-color/80 ${
            contentView === "setting"
              ? "text-primary-color"
              : "text-text-primary"
          }`}
          onClick={() => setContentView("setting")}
        >
          <Settings />
          <span className="text-sm">Pengaturan</span>
        </p> */}
        {/* <p
          className={`flex flex-col text-text-primary items-center transition-all ease-in-out hover:text-red-600 cursor-pointer`}
        >
          <LogOutIcon />
          <ButtonLogout token={token} />
        </p> */}
      </div>
    </>
  );
};

export default Sidebar;
