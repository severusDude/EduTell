import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

type InputTitleChapterProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const InputTitleChapter = ({ title, setTitle }: InputTitleChapterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Judul Chapter</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant={"link"}>
          {isOpen ? "Save" : "Edit Judul"}
        </Button>
      </div>
      {isOpen ? (
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-[0.3px] border-text-primary outline-none"
        />
      ) : (
        <p className="text-base text-text-primary">
          {title ? title : "Masukan Judul Chapter"}
        </p>
      )}
    </div>
  );
};

export default InputTitleChapter;
