"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu
              size={44}
              className="p-1 transition-all ease-in-out border rounded-md hover:ring-2 hover:ring-primary-color"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="translate-x-[-20px] w-48">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            <DropdownMenuSeparator />
            {itemNavbar.map((item, index) => (
              <DropdownMenuItem
                key={index}
                className={`${
                  pathname === item.href ? "bg-primary-color text-white" : ""
                }`}
              >
                <Link href={item.href}>{item.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavigationMobile;
