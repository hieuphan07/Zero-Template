import { ReactNode } from "react";
import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type NotificationProps = ComponentDefaultProps & {
  title: string;
  content: ReactNode;
  color?: Color;
  position?: "center" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
  confirmButton?: boolean;
  enableOtherElements?: boolean;
  contentClassName?: string;
  closeOnClick?: boolean;
  appearAt?: string;
};

export type NotificationAdditionalTimeoutTriggerType = {
  time: number;
  check: boolean;
};
