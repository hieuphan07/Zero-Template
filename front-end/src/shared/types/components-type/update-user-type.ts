import { TUser } from "@/app/admin/user/types/user-type";
import { ComponentDefaultProps } from "./component-default-type";

export type UpdateUserFormProps = ComponentDefaultProps & {
  user?: TUser;
  errors?: Record<string, string>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
