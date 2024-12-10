"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthRegister } from "@/hooks/useAuthRegister";
import { slugify } from "@/utils/createSlug";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [c_password, setC_password] = useState<string>("");

  const { mutate: handleRegister, error } = useAuthRegister(
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

  return (
    <main className="flex lg:flex-row flex-col items-center justify-center lg:justify-between min-h-screen w-[95%] lg:w-[80%] mx-auto gap-8">
      <div className="w-full lg:w-1/2">
        <div className="mb-6">
          <h1 className="text-4xl font-semibold lg:text-5xl text-primary-color">
            EduTell
          </h1>
          <h4 className="text-xl font-semibold lg:text-3xl text-text-primary">
            Bergabunglah Bersama Kami!
          </h4>
        </div>
        <div className="space-y-2 lg:space-y-4">
          <div>
            <Label id="name">Username</Label>
            <Input
              name="name"
              value={username}
              placeholder="Masukan Nama Lengkap Anda"
              onChange={(e) => setUsername(e.target.value)}
            />
            {error && (
              <span className="text-xs text-red-600">
                {JSON.parse(error?.message!).username &&
                  JSON.parse(error?.message!).username}
              </span>
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
            {error && (
              <span className="text-xs text-red-600">
                {JSON.parse(error?.message!).email &&
                  JSON.parse(error?.message!).email}
              </span>
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
            {error && (
              <span className="text-xs text-red-600">
                {JSON.parse(error?.message!).password &&
                  JSON.parse(error?.message!).password}
              </span>
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
            {error && (
              <span className="text-xs text-red-600">
                {JSON.parse(error?.message!).c_password &&
                  JSON.parse(error?.message!).c_password}
              </span>
            )}
          </div>

          <div>
            <Button
              onClick={() => handleRegister()}
              className="w-full bg-primary-color hover:bg-primary-color/80"
            >
              Register
            </Button>

            <div className="flex items-center justify-between gap-4 my-4 lg:gap-0">
              <div className="w-full h-px bg-gray-300 lg:w-full"></div>
              <div className="px-0 text-xs text-gray-500 max-w-fit min-w-fit lg:px-8">
                Atau Lanjutkan Dengan
              </div>
              <div className="w-full h-px bg-gray-300 lg:w-full"></div>
            </div>

            <Button className="w-full bg-primary-color hover:bg-primary-color/80">
              Google
            </Button>
          </div>

          <div className="text-center">
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
