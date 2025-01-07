import { TFunction } from "next-i18next";
import { ComponentDefaultProps } from "./component-default-type";

export type LabelProps = ComponentDefaultProps & {
  text: string;
  t?: TFunction;
  inheritedClass?: boolean;
  htmlFor?: string;
  translate?: boolean;
};
