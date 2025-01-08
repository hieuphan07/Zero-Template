import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type CheckboxProps = ComponentDefaultProps & {
  name: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  textClassName?: string;
  mainColor?: Color;
  boxColor?: Color;
  onChange?: (checked: boolean | React.ChangeEvent<HTMLInputElement>) => void;
};
