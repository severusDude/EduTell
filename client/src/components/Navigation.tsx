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

const NavigationWrapper = ({ slug, role }: { slug?: string, role?: string }) => {
  return (
    <>
      <div className="sticky top-0 z-20">
        <NavigationDekstop role={role} itemNavbar={itemNavbar} slug={slug} />
        <NavigationMobile role={role} itemNavbar={itemNavbar} slug={slug} />
      </div>
    </>
  );
};

export default NavigationWrapper;
