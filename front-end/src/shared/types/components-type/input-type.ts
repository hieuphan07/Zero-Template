import { ChangeEvent, KeyboardEvent, FocusEvent } from "react";
import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type InputProps = ComponentDefaultProps & {
  type?: string;
  backgroundColor?: Color;
  contextColor?: Color;
  defaultValue?: string | number;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  delayOnChange?: number;
  onChangeBeforeDelay?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};
