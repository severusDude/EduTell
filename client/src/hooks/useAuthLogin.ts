import { loginAction } from "@/app/(auth)/(route)/login/actions/loginAction";
import { ValidationAuthShcema } from "@/validation/auth.validate";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useRouter } from "next/navigation";
import { loginActionType } from "@/types/authTypes";

export interface jwtPayload extends JwtPayload {
  slug: string;
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
    onError: () => {
      toast.error("Gagal Melakukan Login");
    },
    onSuccess: (data) => {
      document.cookie = `accessToken=${data.data.token}; path=/; max-age=3600; secure`;
      const decode = jwtDecode<jwtPayload>(data.data.token);
      toast.success("Berhasil Melakukan Login");
      router.refresh()
      router.push(`/dashboard/${decode.slug}`);
    },
  });
};
