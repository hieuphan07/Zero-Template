import { ReactNode } from "react";
import { ComponentDefaultProps } from "./component-default-type";

export type ListProps<T> = ComponentDefaultProps & {
  items?: T[];
  typeString: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  listHoverSpeicalEffect?: boolean;
  // Filter
  filterForm?: ReactNode;
  filterFormTitle?: string;
  filterFormClassName?: string;
  // eslint-disable-next-line
  filterValidation?: (filterData: any) => boolean;
  // Insert
  insertForm?: ReactNode;
  insertFormTitle?: string;
  insertFormClassName?: string;
  // eslint-disable-next-line
  insertValidation?: (createData: any) => boolean;
  insertResetForm?: () => void;
  // Update
  updateForm?: (id: string, listRefetch: () => void) => ReactNode;
  updateFormTitle?: string;
  updateFormClassName?: string;
  // eslint-disable-next-line
  updateValidation?: (updateData: any) => boolean;
  // Delete
  deleteForm?: (id: string, listRefetch: () => void) => ReactNode;
  deleteFormTitle?: string;
  deleteFormClassName?: string;
  // eslint-disable-next-line
  deleteValidation?: (deleteData: any) => boolean;
};
