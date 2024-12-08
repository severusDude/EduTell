import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import React from "react";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="lg:px-[64px] lg:py-[34px]">
        <Navigation />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default HomePageLayout;
