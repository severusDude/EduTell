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
      <NavigationDekstop itemNavbar={itemNavbar} />
      <NavigationMobile itemNavbar={itemNavbar} />
    </>
  );
};

export default Navigation;
