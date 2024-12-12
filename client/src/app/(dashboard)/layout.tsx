import Footer from "@/components/Footer";
import NavigationWrapper from "@/components/Navigation";
import { getSlug } from "@/lib/session";
import React from "react";
import { Toaster } from "react-hot-toast";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const slugSession = await getSlug();

  return (
    <main>
      <Toaster />
      <NavigationWrapper slug={slugSession ? slugSession : ""} />
      <div className="lg:px-[64px] lg:py-[34px]">{children}</div>
      <Footer />
    </main>
  );
}
