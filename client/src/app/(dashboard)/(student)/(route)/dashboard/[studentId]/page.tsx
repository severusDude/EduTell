import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import Content from "./_components/Content";

export default async function DashboardPage({
  params,
}: {
  params: { studentId: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex items-start gap-16">
      <div className="w-1/4">
        <Sidebar token={session} />
      </div>
      <div className="w-3/4">
        <Content  />
      </div>
    </main>
  );
}
