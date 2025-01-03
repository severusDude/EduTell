"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthRegister } from "@/hooks/useAuthRegister";
import { slugify } from "@/utils/createSlug";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [c_password, setC_password] = useState<string>("");

  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>("");
  const [errorNoRegister, setErrorNoRegister] = useState<string>("");

  const {
    mutate: handleRegister,
    error,
    isPending,
  } = useAuthRegister(
    {
      c_password,
      username,
      password,
      email,
      slug: slugify(username),
    },
    {
      setUsername,
      setC_password,
      setEmail,
      setPassword,
    }
  );

  useEffect(() => {
    if (error) {
      if (error instanceof AxiosError) {
        const emailError = error.response?.data.errors?.email?.[0] || "";
        const passwordError = error.response?.data.errors?.password?.[0] || "";
        const usernameError = error.response?.data.errors?.name?.[0] || "";
        const confirmPasswordError =
        error.response?.data.errors?.c_password?.[0] || "";

        setErrorEmail(emailError);
        setErrorPassword(passwordError);
        setErrorUsername(usernameError);
        setErrorConfirmPassword(confirmPasswordError);
        setErrorNoRegister("");
      } else {
        console.log(error);
        setErrorNoRegister("Gagal Melakukan registrasi");
        setErrorConfirmPassword("");
        setErrorEmail("");
        setErrorPassword("");
        setErrorUsername("");
      }
    } else {
      setErrorConfirmPassword("");
      setErrorEmail("");
      setErrorPassword("");
      setErrorUsername("");
      setErrorNoRegister("");
    }
  }, [error]);

  return (
    <main className="flex lg:flex-row flex-col items-center justify-center lg:justify-between min-h-screen w-[95%] lg:w-[80%] mx-auto gap-8">
      <div className="w-full lg:w-1/2">
        <div className="mb-2">
          <h1 className="text-4xl font-semibold lg:text-5xl text-primary-color">
            EduTell
          </h1>
          <h4 className="text-xl font-semibold lg:text-3xl text-text-primary">
            Bergabunglah Bersama Kami!
          </h4>
        </div>
        <div className="space-y-2">
          <div>
            <Label id="name">Username</Label>
            <Input
              name="name"
              value={username}
              placeholder="Masukan Nama Lengkap Anda"
              onChange={(e) => setUsername(e.target.value)}
            />
            {errorUsername && (
              <span className="text-xs text-red-600">{errorUsername}</span>
            )}
          </div>
          <div>
            <Label id="email">Email</Label>
            <Input
              name="email"
              value={email}
              placeholder="Masukan Alamat Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorEmail && (
              <span className="text-xs text-red-600">{errorEmail}</span>
            )}
          </div>
          <div>
            <Label id="password">Password</Label>
            <Input
              value={password}
              name="password"
              type="password"
              placeholder="Masukan Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorPassword && (
              <span className="text-xs text-red-600">{errorPassword}</span>
            )}
          </div>

          <div>
            <Label id="c_password">Confirm Password</Label>
            <Input
              value={c_password}
              name="c_password"
              type="password"
              placeholder="Masukan Password"
              onChange={(e) => setC_password(e.target.value)}
            />
            {errorConfirmPassword && (
              <span className="text-xs text-red-600">
                {errorConfirmPassword}
              </span>
            )}

            {errorNoRegister && (
              <span className="text-xs text-red-600">{errorNoRegister}</span>
            )}
          </div>

          <div>
            <Button
              onClick={() => handleRegister()}
              className={`w-full bg-primary-color flex items-center gap-1 hover:bg-primary-color/80 ${
                isPending && "bg-primary-color/70"
              } `}
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Register
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
        </div>
        <div className="mt-6 text-center">
          <p>
            Sudah Punya Akun ?{" "}
            <Link
              href={"/login"}
              className="underline text-primary-color hover:text-primary-color/80"
            >
              Masuk Disini
            </Link>{" "}
          </p>
        </div>
      </div>
      <div className="hidden rounded-md lg:block lg:w-1/2 bg-primary-color">
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
};

export default RegisterPage;
