"use client";

import React, { useEffect } from "react";
import ButtonBack from "@/components/ButtonBack";
import InputTitleChapter from "./InputTitleChapter";
import { Button } from "@/components/ui/button";
import InputDescriptionChapter from "./InputDescriptionChapter";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constant/url";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Loading from "@/components/Loading";
import InputSubchapter from "./InputSubchapter";

const WrappingEditChapter = ({
  courseId,
  token,
  teacherSlug,
  chapterPosition,
}: {
  courseId: string;
  token: string;
  teacherSlug: string;
  chapterPosition: string;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [position, setPosition] = useState<number>(0);
  const [subchapters, setSubchapters] = useState<any[]>([]);

  const router = useRouter();

  const { data: initialDataChapter, isLoading } = useQuery({
    queryKey: ["get-chapter-position"],
    queryFn: async () => {
      return (
        await axios.get(
          `${BASE_URL}/courses/${courseId}/chapters/${chapterPosition}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      ).data;
    },
  });

  useEffect(() => {
    if (initialDataChapter?.data) {
      setTitle(initialDataChapter?.data.title);
      setDescription(initialDataChapter?.data.description);
      setPosition(Number(chapterPosition));
      if (initialDataChapter?.data.subchapters) {
        setSubchapters([...initialDataChapter?.data.subchapters]);
      }
    }
  }, [initialDataChapter]);

  const {
    mutate: handleCreate,
    data,
    isPending,
  } = useMutation({
    mutationKey: ["create-chapter"],
    onSuccess: () => {
      toast.success("Berhasil Mengupdate Chapter");
      router.push(`/teacher/dashboard/${teacherSlug}/edit-course/${courseId}`);
    },
    onError: () => {
      toast.error("Gagal Mengupdate Chapter");
    },
    mutationFn: async () => {
      return await axios.patch(
        `${BASE_URL}/courses/${courseId}/chapters/${chapterPosition}`,
        {
          title,
          description,
          is_published: true,
          position: Number(chapterPosition),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });

  return (
    <div className="border-[0.3px] p-4 mt-28 rounded-md">
      <div className="flex items-center justify-between">
        <ButtonBack />
        <Button
          onClick={() => handleCreate()}
          disabled={isPending}
          className="transition-all ease-in-out bg-primary-color hover:bg-primary-color/80"
        >
          {isPending && <Loader2 className="animate-spin" />}
          Simpan
        </Button>
      </div>
      <div className="mt-2 space-y-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h3 className="text-xl font-semibold">Kelola Chapter</h3>
            <InputTitleChapter title={title} setTitle={setTitle} />
            <InputDescriptionChapter
              description={description}
              setDescription={setDescription}
            />
            <InputSubchapter
              positionChapter={position}
              subchapter={subchapters}
              session={token}
              slugCourse={courseId}
              slugName={teacherSlug}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default WrappingEditChapter;
