import {
  loginAction,
  loginActionType,
} from "@/app/(auth)/(route)/login/actions/loginAction";
import { useMutation } from "@tanstack/react-query";

type funcLoginActionType = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export const useAuthLogin = (
  requestUser: loginActionType,
  func: funcLoginActionType
) => {
  return useMutation({
    mutationKey: ["login-action"],
    mutationFn: () =>
      loginAction(requestUser),
    onError: ({ message }) => {
      console.log("Error ", message);
    },
    onSuccess: (data) => {
      console.log("Success ", data);
      func.setPassword("");
      func.setEmail("");
    },
  });
};
