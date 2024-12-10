import {
  registerAction,
  registerActionType,
} from "@/app/(auth)/(route)/register/actions/registerAction";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

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
    mutationFn: () => registerAction(requestUser),
    onError: ({ message }) => {
      console.log("Error ", message);
    },
    onSuccess: () => {
      func.setC_password("");
      func.setPassword("");
      func.setUsername("");
      func.setEmail("");
      router.push("/login");
    },
  });
};
