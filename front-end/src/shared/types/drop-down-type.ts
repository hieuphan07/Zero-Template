import { Color } from "./shared-types";

export type DropdownProps = {
  apiEndpoint: string;
  backgroundColor?: Color;
  contextColor?: Color;
  clickOpen?: boolean;
  placeholder?: string;
  // eslint-disable-next-line
  action?: (item: any) => void;
  className?: string;
};
