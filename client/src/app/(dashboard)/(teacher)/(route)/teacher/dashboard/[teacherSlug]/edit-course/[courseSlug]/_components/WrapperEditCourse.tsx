"use client";

import React from "react";
import EditCourse from "./EditCourse";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constant/url";
import Loading from "@/components/Loading";

const WrapperEditCourse = ({
  slug,
  token,
  slugName,
}: {
  slug: string;
  token: string;
  slugName: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-course-for-edit"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/courses/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  console.log("UPDATE DATA ", data);

  return isLoading ? (
    <Loading />
  ) : (
    <EditCourse
      slugName={slugName}
      data={data?.data}
      slug={slug}
      token={token}
    />
  );
};

export default WrapperEditCourse;
