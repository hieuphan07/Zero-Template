import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type DropdownProps = ComponentDefaultProps & {
  apiEndpoint: string;
  backgroundColor?: Color;
  contextColor?: Color;
  clickOpen?: boolean;
  placeholder?: string;
  // eslint-disable-next-line
  action?: (item: any) => void;
};
