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
  const [position, setPosition] = useState<number>(0);

  const router = useRouter();

  const { data: initialDataChapter, isLoading } = useQuery({
    queryKey: ["get-chapter-position"],
    queryFn: async () => {
      return (
        await axios.get(`${BASE_URL}/courses/${courseId}/chapters`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
    },
  });

  useEffect(() => {
    if (initialDataChapter) {
      setPosition(initialDataChapter?.data.length + 1);
    }
  }, [initialDataChapter]);

  const {
    mutate: handleCreate,
    data,
    isPending,
  } = useMutation({
    mutationKey: ["create-chapter"],
    onSuccess: () => {
      toast.success("Berhasil Membuat Chapter");
      router.push(
        `/teacher/dashboard/${teacherSlug}/${courseId}/edit-chapter/${position}`
      );
      router.refresh();
      router.refresh();
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
          position,
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
          </>
        )}
      </div>
    </div>
  );
};

export default WrappingCreateChapter;
