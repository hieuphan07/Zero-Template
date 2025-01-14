import { ReactNode } from "react";
import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type ZeroLinkProps = ComponentDefaultProps & {
  href: string;
  children: ReactNode;
  color?: Color;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  title?: string;
  action?: (e: React.MouseEvent) => void;
};
