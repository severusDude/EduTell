"use client";

import ButtonBack from "@/components/ButtonBack";
import { BASE_URL } from "@/constant/url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import SkeletonHeaderSectionDetailCourse from "./SkeletonHeaderSectionDetailCourse";
import HeaderSectionDetailCourse from "./HeaderSectionDetailCourse";
import Loading from "@/components/Loading";
import DescriptionSectionDetailCourse from "./DescriptionSectionDetailCourse";
import PriceSectionDetailCourse from "./PriceSectionDetailCourse";

const RootCourseDetail = ({
  courseId,
  token,
  role,
}: {
  courseId: string;
  token: string;
  role?: string | undefined | null;
}) => {
  const { data: dataCourse, isLoading: isLoadingCourse } = useQuery({
    queryKey: ["course-detail"],
    queryFn: async () =>
      (await axios.get(`${BASE_URL}/courses/${courseId}`)).data,
  });

  const { data: dataChapter } = useQuery({
    queryKey: ["chapter-courses"],
    queryFn: async () =>
      (await axios.get(`${BASE_URL}/courses/${courseId}/chapters`)).data,
  });

  return (
    <section className="px-4 mt-16 lg:mt-12 lg:px-0">
      <ButtonBack />
      {isLoadingCourse ? (
        <SkeletonHeaderSectionDetailCourse />
      ) : (
        <HeaderSectionDetailCourse dataCourse={dataCourse.data} />
      )}

      {isLoadingCourse ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-start gap-16 mt-12 lg:flex-row">
          <DescriptionSectionDetailCourse
            dataChapter={dataChapter?.data}
            dataCourse={dataCourse?.data}
          />
          {role !== "teacher" ? (
            <PriceSectionDetailCourse
              courseId={courseId}
              token={token}
              dataCourse={dataCourse.data}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </section>
  );
};

export default RootCourseDetail;
