"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthLogin } from "@/hooks/useAuthLogin";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ZodError } from "zod";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorNoLogin, setErrorNoLogin] = useState<string>("");

  const {
    mutate: handleLogin,
    isPending,
    error,
  } = useAuthLogin({ email, password }, { setEmail, setPassword });

  useEffect(() => {
    if (error) {
      if (error instanceof AxiosError) {
        const emailError = error.response?.data.errors?.email?.[0] || "";
        const passwordError = error.response?.data.errors?.password?.[0] || "";

        setErrorEmail(emailError);
        setErrorPassword(passwordError);
        setErrorNoLogin("")
      } else {
        setErrorNoLogin("Email atau Password Salah");
      }
    } else {
      setErrorEmail("");
      setErrorPassword("");
      setErrorNoLogin("");
    }
  }, [error]);

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
