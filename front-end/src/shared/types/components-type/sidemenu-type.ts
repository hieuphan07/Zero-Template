export type SideMenuProps = {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
};

export type MenuItem = {
  name: string;
  path: string;
  children?: MenuItem[];
};
