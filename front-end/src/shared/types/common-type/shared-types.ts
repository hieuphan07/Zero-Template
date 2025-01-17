import { PaginationParamsType } from "./pagination-params-type";
import { ApiSuccessResponse } from "./api-type";

export type Color = "primary" | "secondary" | "warning" | "success" | "danger" | "info" | "light" | "dark" | "default";

export type NotificationPosition = "center" | "top-right" | "top-left" | "bottom-right" | "bottom-left";

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
  searchable?: boolean;
  hidden?: boolean;
};

export type DetailFields = {
  [key: string]: DetailField;
};

export type DetailField = {
  label: string;
  changable?: boolean;
};

export type ApplicationPath = {
  path: string;
  name: string;
  params?: { [key: string]: string };
};

export type TransferType = {
  headers: TableHeaders;
  detailFields: DetailFields;
  // eslint-disable-next-line
  repository: any;
  // eslint-disable-next-line
  getListAPI: (params: PaginationParamsType) => Promise<any>;
  // eslint-disable-next-line
  getAPI: (id: string) => Promise<any>;
  // eslint-disable-next-line
  createAPI: (params: any) => Promise<ApiSuccessResponse<any>>;
  // eslint-disable-next-line
  updateAPI: (id: string, params: any) => Promise<ApiSuccessResponse<any>>;
  // eslint-disable-next-line
  deleteAPI: (id: string) => Promise<any>;
  listPath: string;
  detailPath: string;
};

export type AuthResponse = {
  path: string;
  message: string;
};
