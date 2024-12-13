"use client"

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonBack = () => {

  const router = useRouter()

  return <div className="my-4 cursor-pointer">
    <ArrowLeftIcon size={28} onClick={() => router.back()} />
  </div>
  
};

export default ButtonBack;
