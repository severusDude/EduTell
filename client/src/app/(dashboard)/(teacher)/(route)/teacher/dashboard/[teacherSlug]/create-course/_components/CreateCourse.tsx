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

const CreateCourse = ({ token }: { token: string }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [difficult, setDifficult] = useState<string>("");
  const [time, setTime] = useState<number>(0);

  const { mutate: handleCreateCourse, data: newCourse } = useMutation({
    mutationKey: ["create-course"],
    mutationFn: async () => {
      console.log(typeof(description))
      const data = await axios.post(
        `${BASE_URL}/courses`,
        {
          title,
          description,
          category_id: Number(category),
          price,
          difficulty: difficult,
          duration: time,
          image_url: "image",
          is_published: true
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });

  console.log("NEW COURSE ", newCourse);

  return (
    <div>
      <div className="flex items-center justify-between">
        <ButtonBack />
        <Button
          onClick={() => handleCreateCourse()}
          className="transition-all ease-in-out bg-primary-color hover:bg-primary-color/80"
        >
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
          <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Foto Kursus</h2>
              <Button variant={"link"}>Edit Judul</Button>
            </div>
            <p className="text-base text-text-primary">Masukan Foto Kursus</p>
          </div>

          {/* chapter course */}
          <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Chapter Kursus</h2>
              <Button variant={"link"}>Edit Chapter</Button>
            </div>
            <p className="text-base text-text-primary">Masukan Foto Kursus</p>
          </div>
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
