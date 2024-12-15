import { getSession } from "@/lib/session";
import WrappingEditChapter from "./_components/WrappingEditChapter";


export default async function EditChapterPage({
  params,
}: {
  params: { teacherSlug: string; courseId: string, chapterId: string };
}) {
  const session = await getSession();

  if (!session) {
    return;
  }

  return (
    <WrappingEditChapter
      teacherSlug={params.teacherSlug}
      token={session}
      courseId={params.courseId}
      chapterPosition={params.chapterId}
    />
  );
}
