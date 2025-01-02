import { Color } from "../common-type/shared-types";

export type MenuTabProps = {
  name: string;
  path: string;
  isCollapsed?: boolean;
  children?: MenuTabProps[];
  color?: Color;
  className?: string;
};
