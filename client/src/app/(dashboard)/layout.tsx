import Navigation from "@/components/Navigation";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Toaster />
      <Navigation />
      <div className="lg:px-[64px] lg:py-[34px]">{children}</div>
    </main>
  );
}
