import { Color } from "../common-type/shared-types";
import { ComponentDefaultProps } from "./component-default-type";

export type SearchBarProps = ComponentDefaultProps & {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  inputMainColor: Color;
  inputContextColor?: Color;
  buttonText?: boolean;
  buttonMainColor: Color;
  buttonContextColor?: Color;
  attachToEachOther?: boolean;
  focusBorder?: boolean;
  focusBorderColor?: Color;
  delayOnChangeAutoSearch?: number;
};
