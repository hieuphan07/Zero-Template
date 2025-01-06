import { ComponentDefaultProps } from "./component-default-type";

export type SideMenuProps = ComponentDefaultProps & {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
};

export type MenuItem = ComponentDefaultProps & {
  name: string;
  path: string;
  children?: MenuItem[];
};
