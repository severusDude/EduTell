"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Class from "./Class";

const Root = ({
  session,
  sessionName,
}: {
  session: string;
  sessionName: string;
}) => {
  const [contentView, setContentView] = useState("content");

  return (
    <div className="relative flex flex-col-reverse items-start gap-4 lg:gap-16 lg:flex-row">
      <div className="w-full lg:w-1/4">
        <Sidebar
          token={session}
          contentView={contentView}
          setContentView={setContentView}
        />
      </div>
      <div className="w-full mt-8 lg:w-3/4 lg:mt-0">
        {contentView === "content" && <Content sessionName={sessionName} />}
        {contentView === "class" && <Class />}
      </div>
    </div>
  );
};

export default Root;
