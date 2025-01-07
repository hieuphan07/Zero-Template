import { ReactNode } from "react";
import { ComponentDefaultProps } from "./component-default-type";

export type SideMenuProps = ComponentDefaultProps & {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
};

export type MenuItem = ComponentDefaultProps & {
  icon?: ReactNode;
  name: string;
  path: string;
  children?: MenuItem[];
};
