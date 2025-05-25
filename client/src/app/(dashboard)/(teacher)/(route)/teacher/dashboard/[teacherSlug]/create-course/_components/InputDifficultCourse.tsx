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
import { useFormContext } from "react-hook-form";

type InputDifficultCourseProps = {
  name: string;
};

const InputDifficultCourse = ({ name }: InputDifficultCourseProps) => {
  const { setValue, watch, formState } = useFormContext();
  const selectedDifficult = watch(name) || ""; // Pastikan nilai awalnya string kosong
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tingkat Kesulitan Kursus</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant="link">
          {isOpen ? "Simpan" : "Edit Tingkat Kesulitan"}
        </Button>
      </div>
      {isOpen ? (
        <Select
          value={selectedDifficult}
          onValueChange={(value) => setValue(name, value)}
        >
          <SelectTrigger className="border-[0.3px] border-text-primary">
            <SelectValue placeholder="Pilih Tingkat Kesulitan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tingkat Kesulitan</SelectLabel>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <p className="text-base text-text-primary">
          {selectedDifficult || "Belum dipilih"}
        </p>
      )}
      {formState.errors[name] && (
        <p className="text-xs text-red-500">
          {formState.errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InputDifficultCourse;
