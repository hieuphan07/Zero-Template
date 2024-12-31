import { Color } from "./shared-types";

export type CheckboxProps = {
  name: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  textClassName?: string;
  mainColor?: Color;
  boxColor?: Color;
  onChange?: (checked: boolean) => void;
};
