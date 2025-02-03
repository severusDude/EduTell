import RootCourseDetail from "./_components/Root";
import { getSession, getSessionRole, getSlug } from "@/lib/session";

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const token = await getSession();
  const role = await getSessionRole();
  const slugSession = await getSlug();

  return (
    <RootCourseDetail
      slugSession={slugSession ? slugSession : ""}
      role={role}
      token={token ? token : ""}
      courseId={params.courseId}
    />
  );
}
