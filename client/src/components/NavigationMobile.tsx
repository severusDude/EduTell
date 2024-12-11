"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

type NavigationMobileProps = {
  itemNavbar: {
    name: string;
    href: string;
  }[];
};

const NavigationMobile = ({ itemNavbar }: NavigationMobileProps) => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 transparent-background lg:hidden ">
      <div>
        <Link href={"/"} className="text-xl font-semibold text-primary-color">
          EduTell
        </Link>
      </div>
      <div>
        <Sheet>
          <SheetTrigger>
            <Menu
              size={44}
              className="p-1 transition-all ease-in-out border rounded-md hover:ring-2 hover:ring-primary-color"
            />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>EduTell</SheetTitle>
              {itemNavbar.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className={`${
                    pathname === item.href ? "bg-primary-color text-white" : ""
                  } w-full rounded-md py-2 hover:bg-primary-color/40 transition-all ease-in-out`}
                >
                  <p>{item.name}</p>
                </Link>
              ))}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavigationMobile;
