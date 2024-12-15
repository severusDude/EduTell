import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

type InputLinkVideoSubChapterProps = {
  title: string;
  attacmentVideo: any[];
  setAttacmentVideo: React.Dispatch<React.SetStateAction<any[]>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const InputLinkVideoSubChapter = ({
  title,
  setTitle,
  setAttacmentVideo,
  attacmentVideo,
}: InputLinkVideoSubChapterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  console.log("video ", attacmentVideo);

  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Link Video</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant={"link"}>
          {isOpen ? "Save" : "Tambah Video"}
        </Button>
      </div>
      {isOpen ? (
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-[0.3px] border-text-primary outline-none"
        />
      ) : attacmentVideo ? (
        attacmentVideo.map((item, index) => (
          <p key={index} className="text-base text-text-primary truncate-chars-20">{item.file_name}</p>
        ))
      ) : (
        "Masukan Link Video"
      )}
    </div>
  );
};

export default InputLinkVideoSubChapter;
