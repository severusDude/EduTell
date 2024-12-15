import { Preview } from "@/components/Preview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChapterType, CourseType, SubChapterType } from "@/types/course";
import React from "react";

const DescriptionSectionDetailCourse = ({
  dataCourse,
  dataChapter,
}: {
  dataCourse: CourseType;
  dataChapter: ChapterType[];
}) => {
  return (
    <div className="w-full lg:w-3/4">
      {/* deskripsi */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Deskripsi</h2>
        <div className="text-justify text-text-primary">
          <Preview value={dataCourse?.description} />
          {/* <p>{dataCourse?.description}</p> */}
        </div>
      </div>

      {/* silabus */}
      <div className="mt-12 space-y-2">
        <h2 className="text-2xl font-semibold">Silabus</h2>
        <div className="space-y-4">
          {dataChapter?.map((item: ChapterType, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value="item-1" className="px-6 shadow-md">
                <AccordionTrigger className="text-base">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-text-primary">
                    {item?.subchapters?.map((item: SubChapterType, index) => (
                      <p key={index}>
                        {index + 1}. {item?.title}
                      </p>
                    ))}
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
