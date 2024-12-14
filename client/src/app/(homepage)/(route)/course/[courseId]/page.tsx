import HeaderSectionDetailCourse from "./_components/HeaderSectionDetailCourse";
import DescriptionSectionDetailCourse from "./_components/DescriptionSectionDetailCourse";
import PriceSectionDetailCourse from "./_components/PriceSectionDetailCourse";
import ButtonBack from "@/components/ButtonBack";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constant/url";
import SkeletonHeaderSectionDetailCourse from "./_components/SkeletonHeaderSectionDetailCourse";
import Loading from "@/components/Loading";
import RootCourseDetail from "./_components/Root";
import { getSession } from "@/lib/session";

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const token = await getSession();

  if (!token) {
    return;
  }

  return <RootCourseDetail token={token} courseId={params.courseId} />;
}
