import { getSession, getSessionName } from "@/lib/session";
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

  if (!sessionName || !session) {
    redirect("/login");
  }

  return (
    <main>
      <Root session={session} sessionName={sessionName} />
    </main>
  );
}
