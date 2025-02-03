"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface jwtPayload extends JwtPayload {
  slug: string;
  name: string;
  role: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorNoLogin, setErrorNoLogin] = useState<string>("");

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationKey: ["login-mutation"],
    mutationFn: async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        return response;
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.status) {
            case 422:
              const emailError = error.response?.data.errors?.email?.[0] || "";
              const passwordError =
                error.response?.data.errors?.password?.[0] || "";
              setErrorEmail(emailError);
              setErrorPassword(passwordError);
              setErrorNoLogin("");
              break;
            case 401:
              setErrorPassword(
                "We couldn't find an account with that email and password combination."
              );
              setErrorEmail("");
              setErrorNoLogin("");
              break;
            default:
              setErrorEmail("");
              setErrorNoLogin("");
              setErrorPassword("");
          }
        } else {
          throw new Error("Server internal error");
        }
      }
    },
    onError: () => {
      toast.error("Gagal melakukan Login");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      document.cookie = `accessToken=${
        data?.data.token ? data.data.token : ""
      }; path=/; max-age=3600; secure`;
      const decode = jwtDecode<jwtPayload>(data?.data.token && data.data.token);

      console.log(decode);

      toast.success("Berhasil Melakukan Login");
      if (decode.role === "teacher") {
        router.push(`/teacher/dashboard/${decode.slug}`);
      }

      if (decode.role === "student") {
        router.push(`/dashboard/${decode.slug}`);
      }

      router.refresh()
    },
  });

  return (
    <main className="flex items-center lg:flex-row flex-col justify-center lg:justify-between min-h-screen w-[95%] lg:w-[80%] mx-auto gap-8">
      <div className="w-full lg:w-1/2">
        <div className="mb-6">
          <h1 className="text-4xl font-semibold lg:text-5xl text-primary-color">
            EduTell
          </h1>
          <h4 className="text-xl font-semibold lg:text-3xl text-text-primary">
            Selamat Datang Kembali!
          </h4>
        </div>
        <div className="space-y-6">
          <div>
            <Label id="email">Email</Label>
            <Input
              name="email"
              placeholder="Masukan Alamat Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>
              {errorEmail && (
                <span className="text-xs text-red-600">{errorEmail}</span>
              )}
            </p>
          </div>
          <div>
            <Label id="password">Password</Label>
            <Input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukan Password"
            />
            <p>
              {errorPassword && (
                <span className="text-xs text-red-600">{errorPassword}</span>
              )}
            </p>
            <p>
              {errorNoLogin && (
                <span className="text-xs text-red-600">{errorNoLogin}</span>
              )}
            </p>
          </div>
          <div>
            <Button
              onClick={() => handleLogin()}
              className={`w-full bg-primary-color flex items-center gap-1 hover:bg-primary-color/80 ${
                isPending && "bg-primary-color/70"
              } `}
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Login
            </Button>

            {/* <div className="flex items-center justify-between gap-4 my-4 lg:gap-0">
              <div className="w-full h-px bg-gray-300 lg:w-full"></div>
              <div className="px-0 text-xs text-gray-500 max-w-fit min-w-fit lg:px-8">
                Atau Lanjutkan Dengan
              </div>
              <div className="w-full h-px bg-gray-300 lg:w-full"></div>
            </div>

            <Button className="w-full bg-primary-color hover:bg-primary-color/80">
              Google
            </Button> */}
          </div>

          <div className="text-center">
            <p>
              Belum Punya Akun ?{" "}
              <Link
                href={"/register"}
                className="underline text-primary-color hover:text-primary-color/80"
              >
                Daftar Disini
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="hidden w-1/2 rounded-md lg:block bg-primary-color">
        <Image
          src={"/image/login-place.png"}
          alt="Login"
          width={600}
          height={400}
          className="ml-auto"
        />
      </div>
    </main>
  );
}
