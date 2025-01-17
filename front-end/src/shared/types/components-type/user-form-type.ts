import { TUser } from "@/app/admin/user/types/user-type";

export type UserFormProps = {
  user?: Partial<TUser>;
  errors?: Record<string, string>;
  hidePassword?: boolean;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
