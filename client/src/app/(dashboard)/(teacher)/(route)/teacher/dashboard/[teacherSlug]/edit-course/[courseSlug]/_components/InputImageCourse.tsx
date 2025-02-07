import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

type InputImageCourseProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  image: string;
};

const InputImageCourse = ({ setFile, file, image }: InputImageCourseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const modifiedUrl = image.replace('http://localhost:8000/images/', 'http://localhost:8000/storage/images/');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Upload File Image</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant={"link"}>
          {isOpen ? "Save" : "Edit File"}
        </Button>
      </div>
      {isOpen ? (
        <Input
          type="file"
          onChange={handleFileChange}
          className="border-[0.3px] border-text-primary outline-none"
        />
      ) : image ? (
        <Image src={`${modifiedUrl}`} alt="image" className="object-cover rounded-md " width={900} height={300} />
      ) : (
        // "Ada file"
        "Tidak ada Foto"
      )}
    </div>
  );
};

export default InputImageCourse;
