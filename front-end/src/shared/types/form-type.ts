import { ReactNode } from "react";
import { Color } from "./shared-types";

export type FormProps = {
  children: ReactNode;
  formButton?: ReactNode;
  formName?: string;
  formText?: string;
  formTextClassName?: string;
  isPopup: boolean;
  popUpButtonText?: string;
  popUpButtonMainColor?: Color;
  popUpButtonContextColor?: Color;
  className?: string;
  belowButtons?: ReactNode[];
  belowButtonsClassName?: string;
};
