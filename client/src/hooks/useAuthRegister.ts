import {
  registerAction,
  registerActionType,
} from "@/app/(auth)/(route)/register/actions/registerAction";
import { ValidationAuthShcema } from "@/validation/auth.validate";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { ZodError } from "zod";

type funcRegisterAction = {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setC_password: React.Dispatch<React.SetStateAction<string>>;
};

export const useAuthRegister = (
  requestUser: registerActionType,
  func: funcRegisterAction
) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["register-action"],
    mutationFn: () => {
      return registerAction(requestUser);
    },
    onError: () => {
      toast.error("Gagal Melakukan Register");
    },
    onSuccess: () => {
      func.setC_password("");
      func.setPassword("");
      func.setUsername("");
      func.setEmail("");
      router.push("/login");
      toast.success("Berhasil Melakukan Register");
    },
  });
};
