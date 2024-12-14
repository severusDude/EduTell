"use client";

import React from "react";
import ButtonBack from "@/components/ButtonBack";
import InputTitleChapter from "./InputTitleChapter";
import { Button } from "@/components/ui/button";
import InputDescriptionChapter from "./InputDescriptionChapter";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constant/url";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const WrappingCreateChapter = ({
  courseId,
  token,
  teacherSlug,
}: {
  courseId: string;
  token: string;
  teacherSlug: string;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const router = useRouter();

  const { mutate: handleCreate, data } = useMutation({
    mutationKey: ["create-chapter"],
    onSuccess: () => {
      toast.success("Berhasil Membuat Chapter");
      router.push(`/teacher/dashboard/${teacherSlug}/edit-course/${courseId}`);
    },
    onError: () => {
      toast.error("Gagal Membuat Chapter");
    },
    mutationFn: async () => {
      return await axios.post(
        `${BASE_URL}/courses/${courseId}/chapters`,
        {
          title,
          description,
          is_published: true,
          position: 7,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });

  console.log("DATA CHAPTER ", data);

  return (
    <div className="border-[0.3px] p-4 rounded-md">
      <div className="flex items-center justify-between">
        <ButtonBack />
        <Button
          onClick={() => handleCreate()}
          className="transition-all ease-in-out bg-primary-color hover:bg-primary-color/80"
        >
          Simpan
        </Button>
      </div>
      <div className="mt-2 space-y-4">
        <h3 className="text-xl font-semibold">Kelola Chapter</h3>
        <InputTitleChapter title={title} setTitle={setTitle} />
        <InputDescriptionChapter
          description={description}
          setDescription={setDescription}
        />
      </div>
    </div>
  );
};

export default WrappingCreateChapter;
