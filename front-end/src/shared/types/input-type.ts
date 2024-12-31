import { ChangeEvent, KeyboardEvent } from "react";
import { Color } from "./shared-types";

export type InputProps = {
  type?: string;
  name: string;
  backgroundColor?: Color;
  contextColor?: Color;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};
