"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthLogin } from "@/hooks/useAuthLogin";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    mutate: handleLogin,
    isPending,
    error,
  } = useAuthLogin({ email, password }, { setEmail, setPassword });

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
              {error && (
                <span className="text-xs text-red-600">
                  {JSON.parse(error?.message!).email &&
                    JSON.parse(error?.message!).email}
                </span>
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
              {error && (
                <span className="text-xs text-red-600">
                  {JSON.parse(error?.message!).password &&
                    JSON.parse(error?.message!).password}
                </span>
              )}
            </p>
            <p>
              {error && (
                <span className="text-sm text-red-600">
                  {error?.message &&
                    !JSON.parse(error?.message!).email &&
                    error?.message}
                </span>
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
