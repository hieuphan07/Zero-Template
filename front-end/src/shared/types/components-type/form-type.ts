import { ReactNode } from "react";
import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type FormProps = ComponentDefaultProps & {
  children: ReactNode;
  onSubmit: () => void;
  onSubmitNoReload?: boolean;
  onSubmitClosePopUp?: boolean;
  formButton?: ReactNode;
  formName?: string;
  formTitle?: string;
  formTextClassName?: string;
  isPopup: boolean;
  popUpButtonText?: string;
  popUpButtonMainColor?: Color;
  popUpButtonContextColor?: Color;
  manualBelowButtons?: boolean;
  childrenClassName?: string;
  belowButtons?: ReactNode[];
  belowButtonsClassName?: string;
  resetForm?: () => void;
};
