import { getSession } from "@/lib/session";
import Root from "./_components/Root";
import { redirect } from "next/navigation";

export default async function CourseContentPage({
  params,
}: {
  params: { studentId: string; courseId: string };
}) {
  const token = await getSession();

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="px-4 lg:px-0">
      <Root
        token={token}
        courseSlug={params.courseId}
        userSlug={params.studentId}
      />
    </div>
  );
}
