"use client";

import React from "react";
import Sidebar from "./Sidebar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constant/url";

type RootProps = {
  token: string;
  userSlug: string;
  courseSlug: string;
};

const Root = ({ courseSlug, token, userSlug }: RootProps) => {

  const { data: courseData } = useQuery({
    queryKey: ["show-content-course"],
    queryFn: async () => {
      return axios.get(`${BASE_URL}/courses/${courseSlug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  console.log(courseData?.data.data);

  return (
    <section className="relative flex flex-col-reverse items-start gap-4 lg:gap-16 lg:flex-row">
      <div className="w-full lg:w-1/4">
        {/* sidebar */}
        <Sidebar dataCourse={courseData?.data} />
      </div>
      <div className="w-full mt-8 lg:w-3/4 lg:mt-0"></div>
    </section>
  );
};

export default Root;
