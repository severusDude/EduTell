import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";
import { Search, User } from "lucide-react";
import NavigationItem from "./NavigationItem";
import { Button } from "./ui/button";
import { NavigationDekstopProps } from "@/types/NavigationTypes";

const NavigationDekstop = ({
  itemNavbar,
  slug,
  role,
}: NavigationDekstopProps) => {
  return (
    <nav className="lg:px-[64px] lg:py-[34px] z-20 items-center justify-between hidden gap-2 lg:flex transparent-background">
      <div>
        <Link
          href={"/"}
          className="text-primary-color text-[20px] font-semibold"
        >
          Edutell
        </Link>
      </div>
      <NavigationItem itemNavbar={itemNavbar} session={slug} slug={slug} />
      <div className="relative">
        <Input className="pl-12 py-2 border-primary-color w-[445px]" />
        <Search
          size={24}
          className="absolute top-1.5 left-4 text-primary-color"
        />
        <p className="text-primary-color absolute top-1.5 right-4">Search</p>
      </div>

      {slug ? (
        <NavigationRoleItemDekstop role={role ? role : ""} slug={slug} />
      ) : (
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
      )}
    </nav>
  );
};

export default NavigationDekstop;

const NavigationRoleItemDekstop = ({
  slug,
  role,
}: {
  slug: string;
  role: string;
}) => {
  return role === "teacher" ? (
    <div className="space-x-4">
      <Link
        href={`/teacher/dashboard/${slug}`}
        className={`text-[16px] transition-all ease-in-out`}
      >
        <Button variant={"outline"}>Dashboard</Button>
      </Link>
    </div>
  ) : (
    <div className="space-x-4">
      <Link
        href={`/dashboard/${slug}`}
        className={`text-[16px] transition-all ease-in-out`}
      >
        <Button variant={"outline"}>Dashboard</Button>
      </Link>
    </div>
  );
};
