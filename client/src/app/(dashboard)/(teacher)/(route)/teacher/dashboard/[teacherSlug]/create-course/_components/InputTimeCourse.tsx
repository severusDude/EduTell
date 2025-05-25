import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

type InputTimeCourseProps = {
  name: string;
};

const InputTimeCourse = ({ name }: InputTimeCourseProps) => {
  const { register, watch, formState } = useFormContext();
  const time = watch(name);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Durasi Kursus</h2>
        <Button variant={"link"} onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? "Save" : "Edit Durasi"}
        </Button>
      </div>
      {isOpen ? (
        <Input
          {...register(name)}
          type="number"
          className="border-[0.3px] border-text-primary"
        />
      ) : (
        <p className="text-base text-text-primary">
          {time ? `${time} Jam` : "Masukan Durasi Kursus"}
        </p>
      )}

      <p className="text-xs text-red-500">
        {formState.errors && (formState.errors.time?.message as string)}
      </p>
    </div>
  );
};

export default InputTimeCourse;
