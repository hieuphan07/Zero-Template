import { ReactNode } from "react";
import { Color } from "../common-type/shared-types";

export type MainLayoutProps = {
  children: ReactNode;
  title?: string;
  titleColor?: Color;
  maxWidthPercentage?: number;
};
