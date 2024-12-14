export type NavigationDekstopProps = {
  itemNavbar: {
    name: string;
    href: string;
  }[];
  slug?: string;
  role?: string;
};

export interface NavigationItemProps extends NavigationDekstopProps {
  session?: string | null;
}
