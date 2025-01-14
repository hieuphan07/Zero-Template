import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type DropdownProps = ComponentDefaultProps & {
  options: DropdownOption[];
  inputClassName?: string;
  allowSearch?: boolean;
  backgroundColor?: Color;
  contextColor?: Color;
  placeholder?: string;
  // eslint-disable-next-line
  defaultValue?: any;
  // eslint-disable-next-line
  action?: (item: any) => void;
  maximumRevealItems?: number;
};

export type DropdownOption = {
  label: string;
  // eslint-disable-next-line
  value: any;
};
