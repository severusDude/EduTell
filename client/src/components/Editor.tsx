"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  setDescription: (value: string) => void;
  description: string;
}

export const Editor = ({ description, setDescription }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={description}
        onChange={(value) => setDescription(value)}
      />
    </div>
  );
};
