"use client";

import ButtonBack from "@/components/ButtonBack";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
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
import InputChapterCourse from "./InputChapterCourse";
import { slugify } from "@/utils/createSlug";
import InputImageCourse from "./InputImageCourse";

const CreateCourse = ({ token, slug }: { token: string; slug: string }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [difficult, setDifficult] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [time, setTime] = useState<number>(0);

  const router = useRouter();

  const {
    mutate: handleCreateCourse,
    data: newCourse,
    isPending,
  } = useMutation({
    mutationKey: ["create-course"],
    onSuccess: (data) => {
      toast.success("Course Berhasil Dibuat");
      router.push(
        `/teacher/dashboard/${slug}/edit-course/${slugify(
          data.data.data.title
        )}`
      );
    },
    mutationFn: async () => {
      console.log("file image ", file);
  
      // Membuat FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category_id", Number(category));
      formData.append("price", price);
      formData.append("difficulty", difficult);
      formData.append("duration", time);
      formData.append("image", file); // Menambahkan file gambar
      formData.append("is_published", true);
  
      // Mengirim data FormData ke server
      return await axios.post(`${BASE_URL}/courses`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Menambahkan header Content-Type
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <ButtonBack />
        <Button
          onClick={() => handleCreateCourse()}
          className={`transition-all ease-in-out bg-primary-color hover:bg-primary-color/80 ${
            isPending ? "bg-primary-color/70" : ""
          }`}
          disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin" />}
          Simpan
        </Button>
      </div>
      <h1 className="text-2xl font-semibold">Kelola Kursus</h1>
      <div className="grid grid-cols-1 gap-4 mt-2 lg:grid-cols-2">
        <div className="space-y-2 lg:space-y-4">
          {/* title */}
          <InputTitleCourse setTitle={setTitle} title={title} />

          {/* category course */}
          <InputCategoryCourse category={category} setCategory={setCategory} />

          {/* price course */}
          <InputPriceCourse price={price} setPrice={setPrice} />

          {/* difficult course */}
          <InputDifficultCourse
            difficult={difficult}
            setDifficult={setDifficult}
          />

          {/* duration course */}
          <InputTimeCourse time={time} setTime={setTime} />
        </div>
        <div className="space-y-4">
          {/* image */}

          <InputImageCourse file={file} setFile={setFile} />

          {/* chapter course */}
          {/* <InputChapterCourse chapter={chapter} /> */}
        </div>
      </div>
      <div className="mt-4">
        {/* description */}
        <InputDescriptionCourse
          description={description}
          setDescription={setDescription}
        />
      </div>
    </div>
  );
};

export default CreateCourse;
