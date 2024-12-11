"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ButtonLogout = ({ token }: { token: string }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      document.cookie = `accessToken=;`;
      toast.success("Berhasil Logout");
      router.refresh();
    } catch (error) {
      toast.error("Gagal Melakukan Logout");
    } finally {
      router.push("/");
    }
  };

  return (
    <Button onClick={handleLogout} variant={"destructive"}>
      Logout
    </Button>
  );
};

export default ButtonLogout;
