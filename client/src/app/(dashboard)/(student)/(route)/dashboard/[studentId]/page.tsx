import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  params,
}: {
  params: { studentId: string };
}) {
  const session = await getSession();

  if(!session){
    redirect("/login")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{params.studentId}</p>
    </div>
  );
}
