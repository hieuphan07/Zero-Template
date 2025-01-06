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
    label: "Username",
    sortable: true,
    hidden: false,
  },
  email: {
    label: "Email",
    sortable: true,
    hidden: false,
  },
  lastLogin: {
    label: "Last Login",
    sortable: true,
    hidden: false,
  },
  phoneNumber: {
    label: "Phone Number",
    sortable: true,
    hidden: false,
  },
};
