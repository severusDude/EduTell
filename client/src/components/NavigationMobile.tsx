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
import NavigationItem from "./NavigationItem";

type NavigationMobileProps = {
  itemNavbar: {
    name: string;
    href: string;
  }[];
  slug?: string;
};

const NavigationMobile = ({
  itemNavbar,
  slug: session,
}: NavigationMobileProps) => {
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
              <NavigationItem
                itemNavbar={itemNavbar}
                session={session}
                slug={session}
              />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavigationMobile;
