// Template only, change later using the actual user type
import { TableHeaders } from "../../../../shared/types/common-type/shared-types";
import { DefaultItemType } from "@/shared/types/common-type/default-item-type";

export interface User extends DefaultItemType {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateCreated: Date;
  lastLogin?: Date;
  isActive: boolean;
  department?: string;
  phoneNumber?: string;
  profileImageUrl?: string;
}

export const UserTableHeaders: TableHeaders = {
  firstName: {
    label: "First Name",
    sortable: true,
    hidden: false,
  },
  lastName: {
    label: "Last Name",
    sortable: true,
    hidden: false,
  },
  email: {
    label: "Email",
    sortable: true,
    hidden: false,
  },
  role: {
    label: "Role",
    sortable: true,
    hidden: false,
  },
  dateCreated: {
    label: "Date Created",
    sortable: true,
    hidden: false,
  },
  lastLogin: {
    label: "Last Login",
    sortable: true,
    hidden: false,
  },
  isActive: {
    label: "Status",
    sortable: true,
    hidden: false,
  },
  department: {
    label: "Department",
    sortable: true,
    hidden: false,
  },
  phoneNumber: {
    label: "Phone Number",
    sortable: true,
    hidden: false,
  },
  profileImageUrl: {
    label: "Profile Image",
    sortable: false,
    hidden: false,
  },
};
