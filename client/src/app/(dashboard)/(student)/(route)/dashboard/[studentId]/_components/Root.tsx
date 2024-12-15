"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Class from "./Class";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Root = ({
  session,
  sessionName,
  sessionSlug,
}: {
  session: string;
  sessionName: string;
  sessionSlug: string;
}) => {
  const [contentView, setContentView] = useState("content");

  const { data: dataCourse, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      return (
        await axios.get(
          `http://localhost:8000/api/users/${sessionSlug}/courses`,
          // `http://localhost:8000/api/v1/me/courses`,
          {
            headers: {
              Authorization: `Bearer ${session}`,
            },
          }
        )
      ).data;
    },
  });

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
        {contentView === "content" && (
          <Content dataCourse={dataCourse?.data} sessionName={sessionName} />
        )}
        {contentView === "class" && (
          <Class
            isLoading={isLoading}
            dataCourse={dataCourse?.data}
            session={sessionSlug}
            token={session}
          />
        )}
      </div>
    </div>
  );
};

export default Root;
