import { ReactNode } from "react";
import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type SectionWrapperProps = ComponentDefaultProps & {
  children: ReactNode;
  title?: string;
  titleColor?: Color;
  maxWidthPercentage?: number;
  padding?: boolean;
};
