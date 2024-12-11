import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";
import { Search, User } from "lucide-react";
import NavigationItem from "./NavigationItem";
import { getSlug } from "@/lib/session";
import { Button } from "./ui/button";
import { NavigationDekstopProps } from "@/types/NavigationTypes";

const NavigationDekstop = async ({ itemNavbar }: NavigationDekstopProps) => {
  const session = await getSlug();

  if (!session) {
    console.log(session);
  }

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
      <NavigationItem itemNavbar={itemNavbar} session={session} />
      <div className="relative">
        <Input className="pl-12 py-2 border-primary-color w-[445px]" />
        <Search
          size={24}
          className="absolute top-1.5 left-4 text-primary-color"
        />
        <p className="text-primary-color absolute top-1.5 right-4">Search</p>
      </div>

      {session ? (
        <div className="space-x-4">
          {/* <Link
            href={`/dashboard/${session}/profile`}
            className={`text-[16px] transition-all ease-in-out`}
          >
            <Button className="transition-all ease-in-out bg-primary-color hover:bg-primary-color/80">
              Profile
            </Button>
          </Link> */}
          <Link
            href={`/dashboard/${session}`}
            className={`text-[16px] transition-all ease-in-out`}
          >
            <Button variant={"outline"}>Dashboard</Button>
          </Link>
        </div>
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
