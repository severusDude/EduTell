import {
  getSession,
  getSessionName,
  getSessionRole,
  getSlug,
} from "@/lib/session";
import { redirect } from "next/navigation";
import RootDashboardTeacher from "./_components/RootDashboardTeacher";

export default async function TeacherDashboardPage({
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
    <main className="px-4 lg:px-0 mt-28">
      <RootDashboardTeacher
        session={session}
        sessionName={sessionName}
        sessionSlug={sessionSlug}
      />
    </main>
  );
}
