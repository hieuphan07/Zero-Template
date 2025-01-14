import { ChangeEvent } from "react";
import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type RadioButtonProps = ComponentDefaultProps & {
  name: string;
  value: string;
  label?: string;
  checked?: boolean;
  contextColor?: Color;
  textColor?: Color;
  disabled?: boolean;
  textClassName?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
