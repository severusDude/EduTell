import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const InputChapterCourse = ({ chapter }: { chapter: any[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
          {chapter.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          <Button className="w-full" variant={"outline"}>TAMBAH</Button>
        </>
      ) : (
        <p className="text-base text-text-primary">Chapter Kursus</p>
      )}
    </div>
  );
};

export default InputChapterCourse;
