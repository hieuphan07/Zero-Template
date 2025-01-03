import { ReactNode } from "react";
import { Color } from "../common-type/shared-types";

export type ButtonProps = {
  action: () => void;
  text: string;
  mainColor: Color;
  contextColor?: Color;
  border?: boolean;
  isTransparent?: boolean;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  className?: string;
  manualHover?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
  rippleEffect?: boolean;
};
