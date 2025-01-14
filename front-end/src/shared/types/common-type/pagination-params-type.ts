export type PaginationParamsType = Partial<{
  page: number;
  limit: number;
  sortBy: string;
  sortDirection: "ASC" | "DESC";
  searchBy: string;
  searchValue: string;
}>;
