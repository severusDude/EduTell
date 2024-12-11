"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItemProps } from "@/types/NavigationTypes";

const NavigationItem = ({ itemNavbar, session }: NavigationItemProps) => {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden gap-6 lg:flex">
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
      {itemNavbar.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={`${
            pathname === item.href ? "bg-primary-color text-white" : ""
          } w-full rounded-md py-2 hover:bg-primary-color/40 transition-all ease-in-out lg:hidden`}
        >
          <p>{item.name}</p>
        </Link>
      ))}
      {session ? (
        <div className="flex flex-col gap-2">
          <Link
            href={`/dashboard/${session}`}
            className={`${
              pathname === `/dashboard/${session}`
                ? "bg-primary-color text-white"
                : ""
            } w-full rounded-md py-2 hover:bg-primary-color/40 transition-all ease-in-out lg:hidden`}
          >
            Dashboard
          </Link>
          {/* <Link
            href={`/dashboard/${session}/profile`}
            className={`${
              pathname === `/dashboard/${session}/profile`
                ? "bg-primary-color text-white"
                : ""
            } w-full rounded-md py-2 hover:bg-primary-color/40 transition-all ease-in-out lg:hidden`}
          >
            Profile
          </Link> */}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Link
            href={`/login`}
            className={`${
              pathname === "login" ? "bg-primary-color text-white" : ""
            } w-full rounded-md py-2 hover:bg-primary-color/40 transition-all ease-in-out lg:hidden`}
          >
            Login
          </Link>
          <Link
            href={`/register`}
            className={`${
              pathname === "register" ? "bg-primary-color text-white" : ""
            } w-full rounded-md py-2 hover:bg-primary-color/40 transition-all ease-in-out lg:hidden`}
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
};

export default NavigationItem;
