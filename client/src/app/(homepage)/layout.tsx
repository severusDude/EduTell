import Footer from "@/components/Footer";
import NavigationWrapper from "@/components/Navigation";
import { getSessionRole, getSlug } from "@/lib/session";
import React from "react";
import { Toaster } from "react-hot-toast";

const HomePageLayout = async ({ children }: { children: React.ReactNode }) => {
  const slugSession = await getSlug();
  const roleSession = await getSessionRole();

  return (
    <>
      <Toaster position="bottom-right" />
      <div>
        <NavigationWrapper
          role={roleSession ? roleSession : ""}
          slug={slugSession ? slugSession : ""}
        />
        <div className="lg:px-[64px] lg:py-[34px]">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default HomePageLayout;
