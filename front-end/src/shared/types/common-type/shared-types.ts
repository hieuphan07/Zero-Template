import { UserTableHeaders } from "@/app/admin/user/types/user-type";

export type Color = "primary" | "secondary" | "warning" | "success" | "danger" | "info" | "light" | "dark" | "default";

export type SortDirection = "asc" | "desc";

export type TableHeaders = {
  [key: string]: TableHeader;
};

export type TableHeader = {
  label: string;
  sortable?: boolean;
  hidden?: boolean;
};

export const TypeTransfer: Record<string, { headers: TableHeaders }> = {
  User: {
    headers: UserTableHeaders,
  },
};
