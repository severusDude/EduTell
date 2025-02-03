"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

type ButtonLogoutProps = {
  props?: React.HTMLProps<HTMLHeadingElement>;
  token: string;
};

const ButtonLogout = ({ token, props }: ButtonLogoutProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Cookies.remove("accessToken");
      toast.success("Berhasil Logout");
    } catch (error) {
      toast.error("Gagal Melakukan Logout");
    } finally {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <>
      <span
        className={cn("text-sm lg:text-base", props?.className)}
        onClick={handleLogout}
      >
        Logout
      </span>
    </>
  );
};

export default ButtonLogout;
