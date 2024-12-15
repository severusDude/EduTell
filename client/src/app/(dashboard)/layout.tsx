import Footer from "@/components/Footer";
import NavigationWrapper from "@/components/Navigation";
import { getSessionRole, getSlug } from "@/lib/session";
import { redirect } from "next/navigation";

import React from "react";
import { Toaster } from "react-hot-toast";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const slugSession = await getSlug();
  const roleSession = await getSessionRole();

  if(!slugSession){
    redirect("/login")
  }

  return (
    <main>
      <Toaster />
      <NavigationWrapper
        role={roleSession ? roleSession : ""}
        slug={slugSession ? slugSession : ""}
      />
      <div className="lg:px-[64px] lg:py-[34px]">{children}</div>
      <Footer />
    </main>
  );
}
