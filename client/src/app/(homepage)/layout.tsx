import Footer from "@/components/Footer";
import NavigationWrapper from "@/components/Navigation";
import { getSlug } from "@/lib/session";
import React from "react";

const HomePageLayout = async ({ children }: { children: React.ReactNode }) => {
  const slugSession = await getSlug();

  return (
    <div>
      <NavigationWrapper slug={slugSession ? slugSession : ""} />
      <div className="lg:px-[64px] lg:py-[34px]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomePageLayout;
