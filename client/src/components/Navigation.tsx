"use client";

import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";
import { Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

const itemNavbar = [
  {
    name: "Beranda",
    href: "/",
  },
  {
    name: "Course",
    href: "/courses",
  },
  {
    name: "Tentang Kami",
    href: "/tentang-kami",
  },
];

const Navigation = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="flex items-center justify-between gap-2">
      <div>
        <h1 className="text-primary-color text-[20px] font-semibold">
          Edutell
        </h1>
      </div>
      <div className="flex gap-6">
        {itemNavbar.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`text-[16px] transition-all ease-in-out ${
              pathname === item.href
                ? "text-primary-color hover:text-primary-color/80"
                : "text-text-primary hover:text-primary-color/80"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="relative">
        <Input className="pl-12 py-2 border-primary-color w-[445px]" />
        <Search
          size={24}
          className="absolute top-1.5 left-4 text-primary-color"
        />
        <p className="text-primary-color absolute top-1.5 right-4">Search</p>
      </div>

      <div className="flex items-center gap-2">
        <User
          size={28}
          className="transition-all ease-in-out text-text-primary hover:text-text-primary/80"
        />
        <div className="flex text-text-primary">
          <Link
            href={"/login"}
            className="hover:text-primary-color transition-all ease-in-out text-[16px]"
          >
            Login
          </Link>
          <p className="text-[16px] text-text-primary">/</p>
          <Link
            href={"/register"}
            className="hover:text-primary-color transition-all ease-in-out text-[16px]"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
