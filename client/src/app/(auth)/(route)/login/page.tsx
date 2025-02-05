"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginFormSchema, LoginFormSchema } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface jwtPayload extends JwtPayload {
  slug: string;
  name: string;
  role: string;
}

export default function LoginPage() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationKey: ["login-mutation"],
    mutationFn: async (formData: LoginFormSchema) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
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
            case 401:
              form.setError("password", {
                message:
                  "We couldn't find an account with that email and password combination.",
              });
              break;
          }
        } else {
          throw new Error("Server internal error");
        }
      }
    },
    onError: (error) => {
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

      router.refresh();
    },
  });

  const handleLoginForm = (values: LoginFormSchema) => {
    handleLogin(values);
  };

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
        <form
          onSubmit={form.handleSubmit(handleLoginForm)}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="email" id="email">
              Email
            </Label>
            <Input
              placeholder="Masukan Alamat Email"
              {...form.register("email")}
            />
            <p>
              {form.formState.errors.email?.message && (
                <span className="text-xs text-red-600">
                  {form.formState.errors.email?.message}
                </span>
              )}
            </p>
          </div>
          <div>
            <Label htmlFor="password" id="password">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Masukan Password"
              {...form.register("password")}
            />
            <p>
              {form.formState.errors.password?.message && (
                <span className="text-xs text-red-600">
                  {form.formState.errors.password?.message}
                </span>
              )}
            </p>
          </div>
          <div>
            <Button
              type="submit"
              className={`w-full bg-primary-color flex items-center gap-1 hover:bg-primary-color/80 ${
                isPending && "bg-primary-color/70"
              } `}
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Login
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
        </form>
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
