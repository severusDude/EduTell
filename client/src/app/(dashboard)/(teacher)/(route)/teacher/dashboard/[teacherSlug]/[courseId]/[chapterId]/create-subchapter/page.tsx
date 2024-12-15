import { getSession } from "@/lib/session";
import WrappingSubCreateChapter from "./WrappingCreateSubChapter";

export default async function CreateSubChapter({
  params,
}: {
  params: { teacherSlug: string; courseId: string; chapterId: string };
}) {
  const session = await getSession();

  if (!session) {
    return;
  }

  return (
    <WrappingSubCreateChapter
      teacherSlug={params.teacherSlug}
      token={session}
      courseId={params.courseId}
      chapterId={params.chapterId}
    />
  );
}
