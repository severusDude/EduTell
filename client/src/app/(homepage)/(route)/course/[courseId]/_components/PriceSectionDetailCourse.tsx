import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constant/url";
import { formatRupiah } from "@/lib/utils";
import { CourseType } from "@/types/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CheckCircleIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

const PriceSectionDetailCourse = ({
  dataCourse,
  token,
  courseId,
  slugSession,
}: {
  dataCourse: CourseType;
  slugSession: string;
  token: string;
  courseId: string;
}) => {
  
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: handlePurchase, isPending } = useMutation({
    mutationKey: ["puchase-course"],
    mutationFn: async () => {
      return axios.post(
        `${BASE_URL}/courses/${courseId}/purchase`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onError: (error: AxiosError) => {
      if (error.status === 401) {
        router.push("/login");
      }
    },

    onSuccess: () => {
      toast.success("Berhasil Daftar Course");
      queryClient.invalidateQueries();
    },
  });

  return (
    <>
      <div className="hidden lg:block w-1/4 border-[0.3px] rounded-md p-4 space-y-4">
        <div className="space-y-2 text-center">
          <h3 className="text-base font-semibold text-text-primary">
            {dataCourse?.title}
          </h3>
          <h2 className="text-xl font-semibold">
            {dataCourse?.price && formatRupiah(dataCourse?.price)}
          </h2>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 w-[70%] mx-auto text-text-primary">
            <CheckCircleIcon className="text-primary-color" />
            <p className="text-base">Akses Selamanya</p>
          </div>
          <div className="flex items-center gap-2 w-[70%] mx-auto text-text-primary">
            <CheckCircleIcon className="text-primary-color" />
            <p className="text-base">Akses 24 Jam</p>
          </div>
          <div className="flex items-center gap-2 w-[70%] mx-auto text-text-primary">
            <CheckCircleIcon className="text-primary-color" />
            <p className="text-base">Sertifikat kelulusan</p>
          </div>
          <div className="flex items-center gap-2 w-[70%] mx-auto text-text-primary">
            <CheckCircleIcon className="text-primary-color" />
            <p className="text-base">Reward Premium</p>
          </div>
        </div>

        <div className="w-full">
          {dataCourse?.purchased ? (
            <Link href={`/dashboard/${slugSession}/${dataCourse?.slug}`}>
              <Button className="w-full bg-primary-color hover:bg-primary-color/80">
                Akses Kelas
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => handlePurchase()}
              className="w-full bg-primary-color hover:bg-primary-color/80"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Daftar Kelas
            </Button>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-20 flex justify-end w-full px-4 py-2 bg-white border-t border-gray-300 shadow-md lg:hidden">
        {dataCourse?.purchased ? (
          <Link href={`/dashboard/${slugSession}/${dataCourse?.slug}`}>
            <Button className="tracking-widest rounded-sm bg-primary-color hover:bg-primary-color/80 border-[0.3px] border-text-primary/70">
              Lihat Kelas
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => handlePurchase()}
            className="tracking-widest rounded-sm bg-primary-color hover:bg-primary-color/80 border-[0.3px] border-text-primary/70"
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin" />}
            Daftar Kelas
          </Button>
        )}
      </div>
    </>
  );
};

export default PriceSectionDetailCourse;
