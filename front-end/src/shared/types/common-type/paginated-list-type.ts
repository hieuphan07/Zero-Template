export type PaginatedListType<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
};
