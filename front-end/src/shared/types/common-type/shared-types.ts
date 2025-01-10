import { PaginationParamsType } from "./pagination-params-type";

export type Color = "primary" | "secondary" | "warning" | "success" | "danger" | "info" | "light" | "dark" | "default";

export type SortProperty = {
  key: string;
  direction: "asc" | "desc" | "default";
};

export type FilterProperty = {
  key: string;
  value: string;
};

export type TableHeaders = {
  [key: string]: TableHeader;
};

export type TableHeader = {
  label: string;
  sortable?: boolean;
  hidden?: boolean;
};

export type ApplicationPath = {
  path: string;
  name: string;
};

export type TransferType = {
  headers: TableHeaders;
  // eslint-disable-next-line
  repository: any;
  // eslint-disable-next-line
  getListAPI: (params: PaginationParamsType) => Promise<any>;
  // eslint-disable-next-line
  getAPI: any;
  // eslint-disable-next-line
  createAPI: any;
  // eslint-disable-next-line
  updateAPI: any;
  // eslint-disable-next-line
  deleteAPI: any;
  listPath: string;
  detailPath: string;
};
