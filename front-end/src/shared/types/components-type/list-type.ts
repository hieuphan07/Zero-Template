import { ReactNode } from "react";
import { ComponentDefaultProps } from "./component-default-type";

export type ListProps<T> = ComponentDefaultProps & {
  items?: T[];
  typeString: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  filterForm?: ReactNode;
  // eslint-disable-next-line
  filterValidation?: (filterData: any) => boolean;
  insertForm?: ReactNode;
  // eslint-disable-next-line
  insertValidation?: (createData: any) => boolean;
  updateForm?: ReactNode;
  // eslint-disable-next-line
  updateValidation?: (updateData: any) => boolean;
  deleteForm?: ReactNode;
  // eslint-disable-next-line
  deleteValidation?: (deleteData: any) => boolean;
};
