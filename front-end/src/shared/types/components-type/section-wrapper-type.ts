import { ReactNode } from "react";
import { Color } from "../common-type/shared-types";

export type SectionWrapperProps = {
  children: ReactNode;
  title?: string;
  titleColor?: Color;
  className?: string;
  maxWidthPercentage?: number;
  padding?: boolean;
};
