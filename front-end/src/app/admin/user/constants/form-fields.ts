import { TUser } from "../types/user-type";

export const getUserFormFields = (user?: Partial<TUser>, hidePassword?: boolean) => [
  {
    id: "id",
    type: "hidden",
    label: "user-management:fields.id",
    placeholder: "1",
    defaultValue: user?.id,
    hidden: !user?.id,
  },
  {
    id: "username",
    type: "text",
    label: "user-management:fields.username",
    placeholder: "JohnDoe",
    required: false,
    value: user?.username,
  },
  {
    id: "email",
    type: "text",
    label: "user-management:fields.email",
    placeholder: "john.doe@gmail.com",
    required: false,
    value: user?.email,
  },
  {
    id: "password",
    type: "password",
    label: "user-management:fields.password",
    placeholder: "********",
    required: false,
    value: user?.password,
    hidden: hidePassword,
  },
  {
    id: "phoneNumber",
    type: "number",
    label: "user-management:fields.phone-number",
    placeholder: "+84903999888",
    required: false,
    value: user?.phoneNumber,
  },
];
