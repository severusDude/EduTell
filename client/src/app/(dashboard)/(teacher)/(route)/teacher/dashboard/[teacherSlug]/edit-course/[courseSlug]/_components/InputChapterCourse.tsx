import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

const InputChapterCourse = ({
  chapter,
  slugName,
  slugCourse,
}: {
  chapter: any[];
  slugName: string;
  slugCourse: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log("ini dari chapter ", chapter);
  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Chapter Kursus</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant={"link"}>
          {isOpen ? "Close" : "Edit Chapter"}
        </Button>
      </div>
      {isOpen ? (
        <>
          {chapter[0].map((item: any, index: number) => (
            <p key={index}>{item.title}</p>
          ))}
          <Link
            href={`/teacher/dashboard/${slugName}/${slugCourse}/create-chapter`}
          >
            <Button className="w-full" variant={"outline"}>
              TAMBAH
            </Button>
          </Link>
        </>
      ) : (
        <div>
          {chapter ? (
            chapter[0].map((item: any, index: number) => (
              <p key={index}>{item.title}</p>
            ))
          ) : (
            <p className="text-base text-text-primary">Chapter Kursus</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputChapterCourse;
