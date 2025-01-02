import { ChangeEvent } from "react";
import { Color } from "../common-type/shared-types";

export type RadioButtonProps = {
  name: string;
  value: string;
  label?: string;
  checked?: boolean;
  contextColor?: Color;
  textColor?: Color;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
