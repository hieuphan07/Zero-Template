import { Color } from "../common-type/shared-types";

export type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
  inputMainColor: Color;
  inputContextColor?: Color;
  buttonText?: boolean;
  buttonMainColor: Color;
  buttonContextColor?: Color;
  attachToEachOther?: boolean;
  focusBorder?: boolean;
  focusBorderColor?: Color;
};
