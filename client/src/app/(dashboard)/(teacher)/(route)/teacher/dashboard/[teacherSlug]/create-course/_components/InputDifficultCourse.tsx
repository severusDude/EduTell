import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type InputDifficultCourseProps = {
  difficult: string;
  setDifficult: React.Dispatch<React.SetStateAction<string>>;
};

const InputDifficultCourse = ({
  difficult,
  setDifficult,
}: InputDifficultCourseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tingkat Kesulitan Kursus</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant={"link"}>
          {isOpen ? "Save" : "Edit Tingkat Kesulitan"}
        </Button>
      </div>
      {isOpen ? (
        <Select onValueChange={(value) => setDifficult(value)}>
          <SelectTrigger className="border-[0.3px] border-text-primary">
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kategori</SelectLabel>
              <SelectItem value={"Beginner"}>Beginner</SelectItem>
              <SelectItem value={"Intermediate"}>Intermediate</SelectItem>
              <SelectItem value={"Advanced"}>Advanced</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <p className="text-base text-text-primary">
          {difficult ? difficult : "Masukan Tingkat Kesulitan Kursus"}
        </p>
      )}
    </div>
  );
};

export default InputDifficultCourse;
