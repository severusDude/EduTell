import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

type InputTitleCourseProps = {
  name: string;
};

const InputTitleCourse = ({ name }: InputTitleCourseProps) => {
  const { register, watch, formState } = useFormContext();
  const title = watch(name);
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Judul Kursus</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant={"link"}>
          {isOpen ? "Save" : "Edit Judul"}
        </Button>
      </div>
      {isOpen ? (
        <Input
          {...register(name)}
          className="border-[0.3px] border-text-primary outline-none"
        />
      ) : (
        <p className="text-base text-text-primary">
          {title ? title : "Masukan Judul Kursus"}
        </p>
      )}
      <p className="text-xs text-red-500">
        {formState.errors && (formState.errors.title?.message as string)}
      </p>
    </div>
  );
};

export default InputTitleCourse;
