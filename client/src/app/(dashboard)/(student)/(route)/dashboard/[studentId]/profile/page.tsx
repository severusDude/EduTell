import { Button } from "@/components/ui/button";
import ButtonLogout from "./_components/ButtonLogout";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { studentId: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mt-24">
      <h1>{params.studentId}</h1>
      <ButtonLogout token={session} />
    </div>
  );
}
