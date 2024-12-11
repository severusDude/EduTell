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

const Navigation = () => {
  return (
    <>
      <div className="sticky top-0 z-20">
        <NavigationDekstop itemNavbar={itemNavbar} />
        <NavigationMobile itemNavbar={itemNavbar} />
      </div>
    </>
  );
};

export default Navigation;
