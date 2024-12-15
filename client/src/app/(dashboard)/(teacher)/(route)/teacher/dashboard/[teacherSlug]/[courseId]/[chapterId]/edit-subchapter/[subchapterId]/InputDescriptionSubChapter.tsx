import { Editor } from "@/components/Editor";
import { Preview } from "@/components/Preview";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type InputDescriptionSubChapterProps = {
  description: string;
  setDescription: (value: string) => void;
};

const InputDescriptionSubChapter = ({
  description,
  setDescription,
}: InputDescriptionSubChapterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Deskripsi Subchapter</h2>
        <Button variant={"link"} onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? "Save" : "Edit Deskripsi"}
        </Button>
      </div>
      {isOpen ? (
        <Editor description={description} setDescription={setDescription} />
      ) : description ? (
        <Preview value={description} />
      ) : (
        <p className="text-base text-text-primary">Masukan Deskripsi Subchapter</p>
      )}
    </div>
  );
};

export default InputDescriptionSubChapter;
