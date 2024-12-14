import { getSession } from "@/lib/session";
import WrappingCreateChapter from "./_components/WrappingCreateChapter";

export default async function CreateChapterPage({
  params,
}: {
  params: { teacherSlug: string; courseId: string };
}) {
  const session = await getSession();

  if (!session) {
    return;
  }

  return <WrappingCreateChapter teacherSlug={params.teacherSlug} token={session} courseId={params.courseId} />;
}
