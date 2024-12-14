import RootCourseDetail from "./_components/Root";
import { getSession, getSessionRole } from "@/lib/session";

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const token = await getSession();
  const role = await getSessionRole()

  if (!token) {
    return;
  }

  return <RootCourseDetail role={role} token={token} courseId={params.courseId} />;
}
