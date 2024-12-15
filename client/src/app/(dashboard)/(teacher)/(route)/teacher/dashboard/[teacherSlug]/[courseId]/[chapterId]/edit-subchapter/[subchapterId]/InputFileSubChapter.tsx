import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

type InputFileSubChapterProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  attacment: any[];
};

const InputFileSubChapter = ({
  setFile,
  file,
  attacment,
}: InputFileSubChapterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Upload File</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant={"link"}>
          {isOpen ? "Save" : "Tambah File"}
        </Button>
      </div>
      {isOpen ? (
        <Input
          type="file"
          onChange={handleFileChange}
          className="border-[0.3px] border-text-primary outline-none"
        />
      ) : attacment ? (
        attacment.map((item, index) => (
          <p
            key={index}
            className="text-base text-text-primary truncate-chars-20"
          >
            {item.file_name}
          </p>
        ))
      ) : (
        "Tidak ada Attachment"
      )}
    </div>
  );
};

export default InputFileSubChapter;
