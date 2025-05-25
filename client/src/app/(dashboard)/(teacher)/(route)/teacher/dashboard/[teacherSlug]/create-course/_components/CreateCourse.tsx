"use client";

import ButtonBack from "@/components/ButtonBack";
import { Button } from "@/components/ui/button";
import React from "react";
import InputTitleCourse from "./InputTitleCourse";
import InputCategoryCourse from "./InputCategoryCourse";
import InputDescriptionCourse from "./InputDescriptionCourse";
import InputPriceCourse from "./InputPriceCourse";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constant/url";
import InputDifficultCourse from "./InputDifficultCourse";
import InputTimeCourse from "./InputTimeCourse";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { slugify } from "@/utils/createSlug";
import InputImageCourse from "./InputImageCourse";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema Validasi
const createCourseSchema = z.object({
  title: z
    .string()
    .min(3, "Judul minimal 3 karakter")
    .max(50, "Judul maksimal 50 karakter"),
  category: z.string().min(1, "Kategori harus diisi"),
  price: z.coerce.number().min(1000, "Minimal harga adalah Rp.1000"),
  difficult: z.enum(["Advanced", "Intermediate", "Beginner"]),
  time: z.coerce.number().min(1, "Durasi tidak boleh kosong"),
  description: z.string().optional(),
  file: z.string().optional(),
});

type CreateCourseSchema = z.infer<typeof createCourseSchema>;

const CreateCourse = ({ token, slug }: { token: string; slug: string }) => {
  const router = useRouter();

  const form = useForm<CreateCourseSchema>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
      category: "",
      price: 1000,
      difficult: "Beginner",
      time: 1,
      description: "",
      file: undefined,
    },
  });

  const { handleSubmit, setValue } = form;

  const { mutate: handleCreateCourse, isPending } = useMutation({
    mutationKey: ["create-course"],
    mutationFn: async (formData: CreateCourseSchema) => {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("category_id", formData.category);
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("difficulty", formData.difficult);
      formDataToSend.append("duration", formData.time.toString());
      if (formData.file) {
        formDataToSend.append("image", formData.file);
      }
      formDataToSend.append("is_published", "true");

      await axios.post(`${BASE_URL}/courses`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Kursus berhasil dibuat!");
      router.push(
        `/teacher/dashboard/${slug}/edit-course/${slugify(formData.title)}`
      );
    },
  });

  const handleCreateCourseForm = (values: CreateCourseSchema) => {
    console.log(values);
    // handleCreateCourse(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleCreateCourseForm)}>
        <div className="flex items-center justify-between">
          <ButtonBack />
          <Button
            type="submit"
            className="bg-primary-color hover:bg-primary-color/80"
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin" />}
            Simpan
          </Button>
        </div>
        <h1 className="text-2xl font-semibold">Tambah Kursus</h1>
        <div className="grid grid-cols-1 gap-4 mt-2 lg:grid-cols-2">
          <div>
            <div className="space-y-2 lg:space-y-4">
              <InputTitleCourse name="title" />
              <InputCategoryCourse name="category" />
              <InputPriceCourse name="price" />
              <InputDifficultCourse name="difficult" />
              <InputTimeCourse name="time" />
            </div>
          </div>
          <div className="space-y-4">
            {/* <InputImageCourse name="file" setValue={setValue} /> */}
          </div>
        </div>
        <div className="mt-4">
          <InputDescriptionCourse name="description" />
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateCourse;
