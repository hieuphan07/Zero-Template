// Template only, change later using the actual user type
import { TableHeaders } from "../../../../shared/types/common-type/shared-types";
import { DefaultItemType } from "@/shared/types/common-type/default-item-type";

export interface User extends DefaultItemType {
  username: string;
  email: string;
  phoneNumber: string;
  lastLogin: Date;
}

export const UserTableHeaders: TableHeaders = {
  username: {
    label: "user-management:username",
    sortable: true,
    hidden: false,
  },
  email: {
    label: "user-management:email",
    sortable: true,
    hidden: false,
  },
  phoneNumber: {
    label: "user-management:phoneNumber",
    sortable: true,
    hidden: false,
  },
  lastLogin: {
    label: "user-management:lastLogin",
    sortable: true,
    hidden: false,
  },
};
