import { UserCreate } from "@/app/admin/user/types/user-type";
import { ComponentDefaultProps } from "./component-default-type";

export type CreateUserFormProps = ComponentDefaultProps & {
  user: UserCreate;
  errors: Record<string, string>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  validateForm?: () => boolean;
};
