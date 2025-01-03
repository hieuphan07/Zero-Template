import { ReactNode } from "react";
import { Color } from "../common-type/shared-types";

export type ZeroLinkProps = {
  href: string;
  children: ReactNode;
  color?: Color;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  title?: string;
  action?: (e: React.MouseEvent) => void;
};
