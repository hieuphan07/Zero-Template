import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type MenuTabProps = ComponentDefaultProps & {
  name: string;
  path: string;
  isCollapsed?: boolean;
  children?: MenuTabProps[];
  color?: Color;
};
