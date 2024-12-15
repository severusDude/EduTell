"use client"

import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constant/url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const InputChapterCourse = ({
  chapter,
  slugName,
  slugCourse,
  session,
  refetch,
}: {
  chapter: any[];
  slugName: string;
  slugCourse: string;
  session: string;
  refetch: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient(); 

  const { mutate: handleDelete, isPending } = useMutation({
    mutationKey: ["delete-chapter"],
    onSuccess: () => {
      toast.success("Berhasil Menghapus Chapter");
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("Gagal Menghapus Chapter");
    },
    mutationFn: async (position: string) => {
      await axios.delete(
        `${BASE_URL}/courses/${slugCourse}/chapters/${position}`,
        {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      );
    },
  });

  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Chapter Kursus</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant={"link"}>
          {isOpen ? "Close" : "Edit Chapter"}
        </Button>
      </div>
      {isOpen ? (
        <div className="space-y-2">
          {chapter?.map((item: any, index: number) => (
            <div
              className="p-2 border-[0.3px] rounded-md border-text-primary/60 flex justify-between items-center"
              key={index}
            >
              <p key={index} className="text-sm text-text-primary">
                {item.title}
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href={`/teacher/dashboard/${slugName}/${slugCourse}/edit-chapter/${item.position}`}
                >
                  <Button variant={"link"}>Edit</Button>
                </Link>
                <Button
                  onClick={() => {
                    console.log(item.position);
                    handleDelete(String(item.position));
                  }}
                  variant={"destructive"}
                >
                  Hapus
                </Button>
              </div>
            </div>
          ))}
          <Link
            href={`/teacher/dashboard/${slugName}/${slugCourse}/create-chapter`}
          >
            <Button className="w-full mt-2" variant={"outline"}>
              TAMBAH
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {chapter?.length !== 0 ? (
            chapter?.map((item: any, index: number) => (
              <div
                key={index}
                className="p-2 border-[0.3px] rounded-md border-text-primary/60"
              >
                <p className="text-sm text-text-primary">{item.title}</p>
              </div>
            ))
          ) : (
            <p className="text-base text-text-primary">Chapter Kursus</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputChapterCourse;
