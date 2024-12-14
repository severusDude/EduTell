import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constant/url";
import { CourseType } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronsLeftRightIcon, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const ClassDashboardTeacher = ({
  sessionSlug,
  session,
  isLoading,
  dataCourse
}: {
  sessionSlug: string;
  session: string;
  dataCourse: CourseType[],
  isLoading: boolean
}) => {
  // const { data: dataCourse, isLoading } = useQuery({
  //   queryKey: ["only-course-created"],
  //   queryFn: async () => {
  //     return (
  //       await axios.get(`${BASE_URL}/users/${sessionSlug}/teaches`, {
  //         headers: {
  //           Authorization: `Bearer ${session}`,
  //         },
  //       })
  //     ).data;
  //   },
  // });

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
                    {/* <p className="text-sm">75 Chapter</p> */}
                    <p className="text-sm">{item.duration} Jam</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button className="w-full bg-accent" variant={"outline"}>
                    Edit
                  </Button>
                  <Button className="w-full" variant={"destructive"}>
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
