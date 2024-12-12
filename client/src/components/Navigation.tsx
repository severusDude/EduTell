import { getSlug } from "@/lib/session";
import NavigationDekstop from "./NavigationDekstop";
import NavigationMobile from "./NavigationMobile";

const itemNavbar = [
  {
    name: "Beranda",
    href: "/",
  },
  {
    name: "Course",
    href: "/course",
  },
  {
    name: "Tentang Kami",
    href: "/tentang-kami",
  },
];

const NavigationWrapper = ({ slug }: { slug?: string }) => {
  return (
    <>
      <div className="sticky top-0 z-20">
        <NavigationDekstop itemNavbar={itemNavbar} slug={slug} />
        <NavigationMobile itemNavbar={itemNavbar} slug={slug} />
      </div>
    </>
  );
};

export default NavigationWrapper;
