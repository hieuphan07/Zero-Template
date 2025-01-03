export type Color = "primary" | "secondary" | "warning" | "success" | "danger" | "info" | "light" | "dark" | "default";

export type SortProperty = {
  key: string;
  direction: "asc" | "desc" | "default";
};

export type TableHeaders = {
  [key: string]: TableHeader;
};

export type TableHeader = {
  label: string;
  sortable?: boolean;
  hidden?: boolean;
};
