// Template only, change later using the actual user type
import { TableHeaders } from "../../../../shared/types/common-type/shared-types";
import { DefaultItemType } from "@/shared/types/common-type/default-item-type";

export interface User extends DefaultItemType {
  username: string;
  email: string;
  phoneNumber?: string;
  lastLogin: Date;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  roles?: string[];
}

export const UserTableHeaders: TableHeaders = {
  username: {
    label: "user-management:fields.username",
    sortable: true,
    searchable: true,
    hidden: false,
  },
  email: {
    label: "user-management:fields.email",
    sortable: true,
    searchable: true,
    hidden: false,
  },
  phoneNumber: {
    label: "user-management:fields.phoneNumber",
    sortable: true,
    searchable: true,
    hidden: false,
  },
  lastLogin: {
    label: "user-management:fields.lastLogin",
    sortable: true,
    hidden: false,
  },
  createdAt: {
    label: "user-management:fields.createdAt",
    sortable: true,
    hidden: false,
  },
  updatedAt: {
    label: "user-management:fields.updatedAt",
    sortable: true,
    hidden: false,
  },
};
