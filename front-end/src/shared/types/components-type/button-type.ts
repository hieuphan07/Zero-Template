import { ReactNode } from "react";
import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type ButtonProps = ComponentDefaultProps & {
  action: () => void;
  text: string;
  type?: "submit" | "button" | "reset";
  mainColor: Color;
  contextColor?: Color;
  border?: boolean;
  isTransparent?: boolean;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  manualHover?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
  rippleEffect?: boolean;
};

export type ButtonWithDropDownProps = ButtonProps & {
  dropdownContent: React.ReactNode;
  dropdownClassName?: string;
  dropdownAlignment?: "left" | "right";
};
