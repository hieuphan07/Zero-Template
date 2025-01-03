import { ReactNode } from "react";

export type ListProps<T> = {
  items?: T[];
  typeString: string;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  filterForm?: ReactNode;
  inputForm?: ReactNode;
  updateForm?: ReactNode;
  deleteForm?: ReactNode;
};
