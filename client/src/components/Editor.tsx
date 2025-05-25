"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import "react-quill/dist/quill.snow.css";

export const Editor = () => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const description = watch("description"); // Mengawasi perubahan nilai

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={description || ""} // Pastikan ada nilai default
        onChange={(value) => setValue("description", value, { shouldValidate: true })}
      />
      {errors.description && (
        <p className="text-xs text-red-500">{errors.description.message as string}</p>
      )}
    </div>
  );
};
