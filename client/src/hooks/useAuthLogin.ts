import { loginAction } from "@/app/(auth)/(route)/login/actions/loginAction";
import { ValidationAuthShcema } from "@/validation/auth.validate";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ZodError, ZodIssue } from "zod";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useRouter } from "next/navigation";
import { loginActionType } from "@/types/authTypes";

export interface jwtPayload extends JwtPayload {
  slug: string;
  name: string;
}

type funcLoginActionType = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export const useAuthLogin = (
  requestUser: loginActionType,
  func: funcLoginActionType
) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["login-action"],
    mutationFn: () => {
      return loginAction(requestUser);
    },
    onError: (error) => {
      toast.error("Gagal Melakukan Login");
    },
    onSuccess: (data) => {
      func.setPassword("");
      func.setEmail("");
      document.cookie = `accessToken=${
        data.data.token ? data.data.token : ""
      }; path=/; max-age=3600; secure`;
      const decode = jwtDecode<jwtPayload>(data.data.token && data.data.token);
      toast.success("Berhasil Melakukan Login");
      router.push(`/dashboard/${decode.slug}`);
      router.refresh();
    },
  });
};
