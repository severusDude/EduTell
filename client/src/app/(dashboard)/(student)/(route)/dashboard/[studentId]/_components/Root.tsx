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
    <div className="flex items-start gap-16">
      <div className="w-1/4">
        <Sidebar
          token={session}
          contentView={contentView}
          setContentView={setContentView}
        />
      </div>
      <div className="w-3/4">
        {contentView === "content" && <Content sessionName={sessionName} />}
        {contentView === "class" && <Class />}
      </div>
    </div>
  );
};

export default Root;
