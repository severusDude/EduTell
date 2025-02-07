"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavigationItem from "./NavigationItem";

import gsap from "gsap"

type NavigationMobileProps = {
  itemNavbar: {
    name: string;
    href: string;
  }[];
  slug?: string;
  role?: string;
};

const NavigationMobile = ({
  itemNavbar,
  slug: session,
  role,
}: NavigationMobileProps) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("transparent-background");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("transparent-background");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("transparent-background");
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
      className="fixed inset-x-0 top-0 z-50 lg:hidden"
    >
      <nav className="flex items-center justify-between px-4 py-4">
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
                <SheetDescription></SheetDescription>
                <NavigationItem
                  itemNavbar={itemNavbar}
                  session={session}
                  slug={session}
                  role={role}
                />
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default NavigationMobile;
