import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const NavigationInput = () => {
  return (
    <div className="relative">
      <Input className="pl-12 py-2 border-primary-color w-[445px]" />
      <Search
        size={24}
        className="absolute top-1.5 left-4 text-primary-color"
      />
      <p className="text-primary-color absolute top-1.5 right-4">Search</p>
    </div>
  );
};

export default NavigationInput;
