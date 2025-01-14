import { ReactNode } from "react";
import { ComponentDefaultProps } from "./component-default-type";
import { ApplicationPath } from "../common-type/shared-types";

export type SideMenuProps = ComponentDefaultProps & {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
};

export type MenuItem = ComponentDefaultProps &
  ApplicationPath & {
    icon?: ReactNode;
    children?: MenuItem[];
  };
