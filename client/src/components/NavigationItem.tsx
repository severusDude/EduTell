"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItemProps } from "@/types/NavigationTypes";

const NavigationItem = ({
  itemNavbar,
  session: slug,
  role,
}: NavigationItemProps) => {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden gap-6 ml-12 mr-auto lg:flex">
        {itemNavbar.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`relative group text-[16px] transition-all ease-in-out font-semibold text-base ${
              pathname === item.href
                ? "text-primary-color hover:text-primary-color/80"
                : "text-slate-400 hover:text-primary-color/80"
            }`}
          >
            {item.name}
            {/* Underline Animasi */}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary-color scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
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
      {slug ? (
        <NavigationRoleItem
          pathname={pathname}
          role={role ? role : ""}
          slug={slug}
        />
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

const NavigationRoleItem = ({
  role,
  slug,
  pathname,
}: {
  role?: string;
  slug: string;
  pathname: string;
}) => {
  return role === "teacher" ? (
    <div className="flex flex-col gap-2">
      <Link
        href={`/teacher/dashboard/${slug}`}
        className={`${
          pathname === `/teacher/dashboard/${slug}`
            ? "bg-primary-color text-white"
            : ""
        } w-full rounded-md py-2 hover:bg-primary-color/40 transition-all ease-in-out lg:hidden`}
      >
        Dashboard
      </Link>
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      <Link
        href={`/dashboard/${slug}`}
        className={`${
          pathname === `/dashboard/${slug}` ? "bg-primary-color text-white" : ""
        } w-full rounded-md py-2 hover:bg-primary-color/40 transition-all ease-in-out lg:hidden`}
      >
        Dashboard
      </Link>
    </div>
  );
};
