import { getSession, getSessionRole, getSlug } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";

const LoginLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const sessionSlug = await getSlug();
  const sessionRole = await getSessionRole();
  if (session) {
    if (sessionRole === "teacher") {
      redirect(`/teacher/dashboard/${sessionSlug}`);
    }
    if (sessionRole === "student") {
      redirect(`/dashboard/${sessionSlug}`);
    }
  }

  return (
    <div>
      <Toaster position="bottom-right" />
      {children}
    </div>
  );
};

export default LoginLayout;
