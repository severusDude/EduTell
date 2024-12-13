"use client";

import HeaderSectionDetailCourse from "./_components/HeaderSectionDetailCourse";
import DescriptionSectionDetailCourse from "./_components/DescriptionSectionDetailCourse";
import PriceSectionDetailCourse from "./_components/PriceSectionDetailCourse";
import ButtonBack from "@/components/ButtonBack";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constant/url";
import SkeletonHeaderSectionDetailCourse from "./_components/SkeletonHeaderSectionDetailCourse";
import Loading from "@/components/Loading";

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { data, isLoading: isLoadingCourse } = useQuery({
    queryKey: ["course-detail"],
    queryFn: async () =>
      (await axios.get(`${BASE_URL}/courses/${params.courseId}`)).data,
  });

  const { data: chapter } = useQuery({
    queryKey: ["chapter-courses"],
    queryFn: async () =>
      (await axios.get(`${BASE_URL}/courses/${params.courseId}/chapters`)).data,
  });

  console.log(data);
  console.log(chapter);

  return (
    <section className="px-4 mt-16 lg:mt-12 lg:px-0">
      <ButtonBack />
      {isLoadingCourse ? (
        <SkeletonHeaderSectionDetailCourse />
      ) : (
        <HeaderSectionDetailCourse />
      )}

      {isLoadingCourse ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-start gap-16 mt-12 lg:flex-row">
          <DescriptionSectionDetailCourse />
          <PriceSectionDetailCourse />
        </div>
      )}
    </section>
  );
}
