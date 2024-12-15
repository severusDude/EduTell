import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

type InputLinkVideoSubChapterProps = {
  title: any[];
  setTitle: React.Dispatch<React.SetStateAction<any[]>>;
};

const InputLinkVideoSubChapter = ({
  title,
  setTitle,
}: InputLinkVideoSubChapterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  console.log("video ", title);

  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Link Video</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant={"link"}>
          {isOpen ? "Save" : "Edit Judul"}
        </Button>
      </div>
      {isOpen ? (
        <Input
          value={title}
          onChange={(e) => setTitle(() => [e.target.value])}
          className="border-[0.3px] border-text-primary outline-none"
        />
      ) : (
        <p className="text-base text-text-primary">
          {title ? title : "Masukan Link Video"}
        </p>
      )}
    </div>
  );
};

export default InputLinkVideoSubChapter;
