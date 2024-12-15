import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constant/url";
import { CategoryType } from "@/types/course";

type InputCategoryCourseProps = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const InputCategoryCourse = ({
  category,
  setCategory,
}: InputCategoryCourseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  console.log("ini category", category);

  const { data: categoryData } = useQuery({
    queryKey: ["category-course"],
    queryFn: async () => (await axios.get(`${BASE_URL}/categories`)).data,
  });

  console.log("CATEOGRY ", categoryData);

  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Kategori Kursus</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant={"link"}>
          {isOpen ? "Save" : "Edit Kategori"}
        </Button>
      </div>
      {isOpen ? (
        <SelectCategory
          setCategory={setCategory}
          categoryData={categoryData?.data}
        />
      ) : (
        <p className="text-base text-text-primary">
          {category
            ? categoryData?.data.find(
                (data: CategoryType) => data.id == category
              )?.name || "Nama kategori tidak ditemukan"
            : "Masukan Kategori Kursus"}
        </p>
      )}
    </div>
  );
};

export default InputCategoryCourse;

const SelectCategory = ({
  setCategory,
  categoryData,
}: {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  categoryData: CategoryType[];
}) => {
  return (
    <Select
      onValueChange={(value) => {
        console.log("isi category", value);
        setCategory(value);
      }}
    >
      <SelectTrigger className="border-[0.3px] border-text-primary">
        <SelectValue placeholder="Pilih Kategori" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Kategori</SelectLabel>
          {categoryData?.map((item: CategoryType, index: number) => (
            <SelectItem key={index} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
