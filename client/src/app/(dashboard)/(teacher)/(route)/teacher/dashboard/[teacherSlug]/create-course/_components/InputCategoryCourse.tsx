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
import { useFormContext } from "react-hook-form";

const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
};

const InputCategoryCourse = ({ name }: { name: string }) => {
  const { setValue, watch } = useFormContext();
  const selectedCategory = watch(name);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["category-course"],
    queryFn: fetchCategories,
  });

  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Kategori Kursus</h2>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant="link">
          {isOpen ? "Save" : "Edit Kategori"}
        </Button>
      </div>
      {isOpen ? (
        <SelectCategory
          setValue={setValue}
          name={name}
          categoryData={categoryData?.data || []}
          isLoading={isLoading}
          selectedCategory={selectedCategory}
        />
      ) : (
        <p className="text-base text-text-primary">
          {selectedCategory
            ? categoryData?.data.find(
                (data: CategoryType) => String(data.id) == selectedCategory
              )?.name || "Nama kategori tidak ditemukan"
            : "Masukan Kategori Kursus"}
        </p>
      )}
    </div>
  );
};

export default InputCategoryCourse;

const SelectCategory = ({
  setValue,
  name,
  categoryData,
  isLoading,
  selectedCategory,
}: {
  setValue: (name: string, value: string) => void;
  name: string;
  categoryData: CategoryType[];
  isLoading: boolean;
  selectedCategory: string;
}) => {
  if (isLoading) return <p>Loading kategori...</p>;

  return (
    <Select
      value={selectedCategory} // Menampilkan kategori yang telah dipilih
      onValueChange={(value) => setValue(name, value)}
    >
      <SelectTrigger className="border-[0.3px] border-text-primary">
        <SelectValue placeholder="Pilih Kategori" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Kategori</SelectLabel>
          {categoryData.map((item) => (
            <SelectItem key={item.id} value={String(item.id)}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
