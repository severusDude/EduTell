"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import NavigationItem from "./NavigationItem";
import { Button } from "./ui/button";
import { NavigationDekstopProps } from "@/types/NavigationTypes";
import { useWindowScroll } from "react-use";
import gsap from "gsap"

const NavigationDekstop = ({
  itemNavbar,
  slug,
  role,
}: NavigationDekstopProps) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("bg-slate-700");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("bg-slate-700");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("bg-slate-700");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 z-50 transition-all duration-500 shadow-lg"
    >
      <nav className="lg:px-[64px] lg:py-[28px] items-center justify-between hidden gap-6 lg:flex">
        <div>
          <Link
            href={"/"}
            className="relative px-4 py-2 text-xl font-bold text-primary-color"
          >
            Edutell
          </Link>
        </div>
        <NavigationItem itemNavbar={itemNavbar} session={slug} slug={slug} />
        {/* <NavigationInput /> */}

        {slug ? (
          <NavigationRoleItemDekstop role={role ? role : ""} slug={slug} />
        ) : (
          <div className="flex gap-4 text-slate-400">
            <Button variant={"default"} className="text-white bg-primary-color hover:bg-primary-color/80">
              <Link
                href={"/login"}
                className="transition-all ease-in-out text-[16px]"
              >
                Login
              </Link>
            </Button>

            <Button variant={"outline"}>
              <Link
                href={"/register"}
                className="transition-all ease-in-out text-[16px]"
              >
                Register
              </Link>
            </Button>
          </div>
        )}
      </nav>
    </div>
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
