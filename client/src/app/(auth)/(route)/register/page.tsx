"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugify } from "@/utils/createSlug";
import { useMutation } from "@tanstack/react-query";
import axios, { Axios, AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, RegisterFormSchema } from "@/types/authTypes";

const RegisterPage = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const handleRegisterForm = (values: RegisterFormSchema) => {
    handleRegister(values);
  };

  const router = useRouter();

  const { mutate: handleRegister, isPending } = useMutation({
    mutationKey: ["register-mutation"],
    mutationFn: async (formData: RegisterFormSchema) => {
      const slug = slugify(formData.username);
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/register",
          {
            name: formData.username,
            email: formData.email,
            password: formData.password,
            c_password: formData.confirmPassword,
            slug,
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
          throw error;
        }
        throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessageEmailIsExits = error.response?.data.errors.email[0];
        toast.error(errorMessageEmailIsExits);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Berhasil Melakukan Register");
      router.push("/login");
    },
  });

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
        <form
          onSubmit={form.handleSubmit(handleRegisterForm)}
          className="space-y-2"
        >
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              placeholder="Masukan Nama Lengkap Anda"
              {...form.register("username")}
            />
            {form.formState.errors.username?.message && (
              <span className="text-xs text-red-600">
                {form.formState.errors.username?.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Masukan Alamat Email"
              {...form.register("email")}
            />
            {form.formState.errors.email?.message && (
              <span className="text-xs text-red-600">
                {form.formState.errors.email?.message}
              </span>
            )}
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
            {form.formState.errors.password?.message && (
              <span className="text-xs text-red-600">
                {form.formState.errors.password?.message}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" id="confirm-password">
              Confirm Password
            </Label>
            <Input
              placeholder="Masukan Password"
              type="password"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword?.message && (
              <span className="text-xs text-red-600">
                {form.formState.errors.confirmPassword?.message}
              </span>
            )}
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
              Register
            </Button>
          </div>
        </form>
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
