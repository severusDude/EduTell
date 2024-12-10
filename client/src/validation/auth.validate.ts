import { z, ZodType } from "zod";

export class ValidationAuthShcema {
  static readonly LOGINSCHEMA: ZodType = z.object({
    email: z
      .string()
      .email({ message: "Email yang anda inputkan tidak valid" }),
    password: z.string().min(6, { message: "Password Minimal 6 Karakter" }),
  });

  static readonly REGISTERSCHEME: ZodType = z
    .object({
      username: z.string().min(3, { message: "Username Minimal 3 Karakter" }),
      email: z
        .string()
        .email({ message: "Email yang anda inputkan tidak valid" }),
      password: z.string().min(6, { message: "Password Minimal 6 Karakter" }),
      c_password: z.string().min(6, { message: "Password Minimal 6 Karakter" }),
    })
    .refine((data) => data.password === data.c_password, {
      message: "Password dan Confirm Password Tidak Sama",
      path: ["c_password"],
    });
}
