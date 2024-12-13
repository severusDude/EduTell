export type NavigationDekstopProps = {
  itemNavbar: {
    name: string;
    href: string;
  }[];
  slug?: string
};

export interface NavigationItemProps extends NavigationDekstopProps{
  session?: string | null;
}