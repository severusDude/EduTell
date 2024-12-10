import {
  loginAction,
  loginActionType,
} from "@/app/(auth)/(route)/login/actions/loginAction";
import { ValidationAuthShcema } from "@/validation/auth.validate";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ZodError } from "zod";

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
    mutationFn: () => {
      try {
        ValidationAuthShcema.LOGINSCHEMA.parse(requestUser);
      } catch (error) {
        if (error instanceof ZodError) {
          const formattedErrors: Record<string, string> = {};

          error.errors.forEach((err) => {
            const field = err.path.join(".");
            formattedErrors[field] = err.message;
          });
          throw new ZodError(JSON.parse(JSON.stringify(formattedErrors)));
        } else {
          throw error;
        }
      }

      // Kirim data ke API
      return loginAction(requestUser);
    },
    onError: (error) => {
      // if (error instanceof ZodError) {
      //   console.log(JSON.parse(error.message));
      // } else if (error instanceof Error) {
      //   console.log(error.message);
      // } else {
      //   console.log(error);
      // }
      toast.error("Gagal Melakukan Login");
    },
    onSuccess: (data) => {
      console.log("Success ", data);
      func.setPassword("");
      func.setEmail("");
    },
  });
};
