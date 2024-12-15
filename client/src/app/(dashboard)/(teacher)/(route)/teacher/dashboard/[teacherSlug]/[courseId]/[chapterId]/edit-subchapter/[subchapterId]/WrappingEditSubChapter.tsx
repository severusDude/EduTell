"use client";

import React, { useEffect } from "react";
import ButtonBack from "@/components/ButtonBack";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constant/url";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Loading from "@/components/Loading";
import InputSubchapter from "./InputSubchapter";
import InputDescriptionSubChapter from "./InputDescriptionSubChapter";
import InputTitleSubChapter from "./InputTitleSubChapter";

const WrappingEditSubChapter = ({
  courseId,
  token,
  teacherSlug,
  chapterPosition,
  subchapterPosition,
}: {
  courseId: string;
  token: string;
  teacherSlug: string;
  chapterPosition: string;
  subchapterPosition: string;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [position, setPosition] = useState<number>(0);

  const router = useRouter();

  const { data: initialDataChapter, isLoading } = useQuery({
    queryKey: ["get-chapter-position"],
    queryFn: async () => {
      return (
        await axios.get(
          `${BASE_URL}/courses/${courseId}/chapters/${chapterPosition}/subchapters/${subchapterPosition}`,
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
    }
  }, [initialDataChapter]);

  const {
    mutate: handleUpdate,
    data,
    isPending,
  } = useMutation({
    mutationKey: ["update-subchapter"],
    onSuccess: () => {
      toast.success("Berhasil Mengupdate Subchapter");
      router.push(
        `/teacher/dashboard/${teacherSlug}/${courseId}/edit-chapter/${chapterPosition}`
      );
    },
    onError: () => {
      toast.error("Gagal Mengupdate Subchapter");
    },
    mutationFn: async () => {
      return await axios.patch(
        `${BASE_URL}/courses/${courseId}/chapters/${chapterPosition}/subchapters/${subchapterPosition}`,
        {
          title,
          description,
          content: "CONTENT DUMY",
          is_published: true,
          position: Number(subchapterPosition),
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
    <div className="border-[0.3px] p-4 rounded-md">
      <div className="flex items-center justify-between">
        <ButtonBack />
        <Button
          onClick={() => handleUpdate()}
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
            <h3 className="text-xl font-semibold">Kelola Subchapter</h3>
            <InputTitleSubChapter title={title} setTitle={setTitle} />
            <InputDescriptionSubChapter
              description={description}
              setDescription={setDescription}
            />
            {/* <InputSubchapter
              positionChapter={position}
              subchapter={subchapters}
              session={token}
              slugCourse={courseId}
              slugName={teacherSlug}
            /> */}
            <h1>EDIT SUBCHAPTER</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default WrappingEditSubChapter;
