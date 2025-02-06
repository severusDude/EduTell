import {
  getSession,
  getSessionName,
  getSessionRole,
  getSlug,
} from "@/lib/session";
import { redirect } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import Content from "./_components/Content";
import Root from "./_components/Root";

export default async function DashboardPage({
  params,
}: {
  params: { studentId: string };
}) {
  const sessionName = await getSessionName();
  const session = await getSession();
  const sessionSlug = await getSlug();
  const sessionRole = await getSessionRole();

  if (!sessionName || !session || !sessionSlug) {
    redirect("/login");
  }

  if (sessionRole !== "student") {
    redirect("/");
  }

  if (params.studentId !== sessionSlug) {
    return <h1>404</h1>;
  }

  return (
    <main className="px-4 mt-28 lg:px-0">
      <Root
        session={session}
        sessionName={sessionName}
        sessionSlug={sessionSlug}
      />
    </main>
  );
}
