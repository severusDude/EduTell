import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/utils";
import React, { useState } from "react";

type InputPriceCourseProps = {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
};

const InputPriceCourse = ({ price, setPrice }: InputPriceCourseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="p-4 border-[0.3px] rounded-md bg-primary-color/20 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Price Kursus</h2>
        <Button variant={"link"} onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? "Save" : "Edit Price"}
        </Button>
      </div>
      {isOpen ? (
        <Input
          onChange={(e) => setPrice(e.target.valueAsNumber)}
          type="number"
          className="border-[0.3px] border-text-primary"
        />
      ) : (
        <p className="text-base text-text-primary">
          {price ? formatRupiah(price) : "Masukan Harga Kursus"}
        </p>
      )}
    </div>
  );
};

export default InputPriceCourse;
