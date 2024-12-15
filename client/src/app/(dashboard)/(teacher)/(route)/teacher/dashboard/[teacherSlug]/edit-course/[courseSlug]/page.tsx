import {
  getSession,
  getSessionName,
  getSessionRole,
  getSlug,
} from "@/lib/session";
import { redirect } from "next/navigation";
import EditCourse from "./_components/EditCourse";
import WrapperEditCourse from "./_components/WrapperEditCourse";

export default async function CreateCousePage({
  params,
}: {
  params: { teacherSlug: string, courseSlug: string };
}) {
  const sessionName = await getSessionName();
  const session = await getSession();
  const sessionSlug = await getSlug();
  const sessionRole = await getSessionRole();

  if (!sessionName || !session || !sessionSlug) {
    redirect("/login");
  }

  if (sessionRole !== "teacher") {
    redirect("/");
  }

  if (sessionSlug !== params.teacherSlug) {
    return <h1>404</h1>;
  }

  return (
    <div className="border-[0.3px] rounded-md p-4">
      <WrapperEditCourse slug={params.courseSlug} token={session} />
    </div>
  );
}
