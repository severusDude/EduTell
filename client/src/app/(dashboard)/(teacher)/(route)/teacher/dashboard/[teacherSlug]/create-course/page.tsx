import {
  getSession,
  getSessionName,
  getSessionRole,
  getSlug,
} from "@/lib/session";
import { redirect } from "next/navigation";

export default async function CreateCousePage({
  params,
}: {
  params: { teacherSlug: string };
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
    <div>
      <h1>Create Course</h1>
    </div>
  );
}
