import { getSession } from "@/lib/session";
import WrappingEditSubChapter from "./WrappingEditSubChapter";


export default async function EditSubChapterPage({
  params,
}: {
  params: { teacherSlug: string; courseId: string, chapterId: string, subchapterId: string };
}) {
  const session = await getSession();

  if (!session) {
    return;
  }

  return (
    <WrappingEditSubChapter
      teacherSlug={params.teacherSlug}
      token={session}
      courseId={params.courseId}
      chapterPosition={params.chapterId}
      subchapterPosition={params.subchapterId}
    />
  );
}
