import { ChangeEvent, KeyboardEvent } from "react";
import { Color } from "../common-type/shared-types";

export type InputProps = {
  type?: string;
  name: string;
  backgroundColor?: Color;
  contextColor?: Color;
  defaultValue?: string | number;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  delayOnChange?: number;
  onChangeBeforeDelay?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};
