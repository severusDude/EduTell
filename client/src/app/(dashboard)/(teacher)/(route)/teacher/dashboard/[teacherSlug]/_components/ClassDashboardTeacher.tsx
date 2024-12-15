"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constant/url";
import { CourseType } from "@/types/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ChevronsLeftRightIcon, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ClassDashboardTeacher = ({
  sessionSlug,
  session,
  isLoading,
  dataCourse,
}: {
  sessionSlug: string;
  session: string;
  dataCourse: CourseType[];
  isLoading: boolean;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: handleDelete } = useMutation({
    mutationKey: ["delete-chapter"],
    onSuccess: () => {
      toast.success("Berhasil Menghapus Kursus");
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("Gagal Menghapus Kursus");
    },
    mutationFn: async (slugCourse: string) => {
      await axios.delete(`${BASE_URL}/courses/${slugCourse}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    },
  });

  return (
    <div className="border-[0.3px] shadow-md rounded-md p-4 lg:min-h-[428px] space-y-4">
      <Link href={`/teacher/dashboard/${sessionSlug}/create-course`}>
        <Button className="flex items-center gap-2 ml-auto transition-all ease-in-out bg-primary-color hover:bg-primary-color/80">
          <Plus size={18} />
          <p>Tambah Kelas</p>
        </Button>
      </Link>

      <div className="space-y-2">
        {isLoading ? (
          <Loading />
        ) : (
          dataCourse.map((item: CourseType, index: number) => (
            <div className="p-2 border-b-[0.3px]" key={index}>
              <div className="flex flex-col gap-4 lg:gap-0 lg:justify-between lg:items-center lg:flex-row">
                <div className="flex items-center gap-4">
                  <ChevronsLeftRightIcon size={32} />
                  <div className="flex flex-col">
                    <h2 className="text-base font-semibold">{item.title}</h2>
                    <p className="text-sm">{item.duration} Jam</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    className="w-full"
                    href={`/teacher/dashboard/${sessionSlug}/edit-course/${item.slug}`}
                  >
                    <Button className="w-full bg-accent" variant={"outline"}>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(item?.slug)}
                    className="w-full"
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClassDashboardTeacher;
