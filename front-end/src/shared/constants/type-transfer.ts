import { UserDetailFields, UserTableHeaders } from "@/app/admin/user/types/user-type";
import { DetailFields, TableHeaders, TransferType } from "../types/common-type/shared-types";
import { TUser } from "@/app/admin/user/types/user-type";
import { userService } from "@/app/admin/user/services/user-service";
import { PaginationParamsType } from "../types/common-type/pagination-params-type";

// Function to create each entry dynamically
const createUserTypeTransferEntry = (
  headers: TableHeaders,
  detailFields: DetailFields,
  // eslint-disable-next-line
  repository: any,
  listPath: string,
  detailPath: string,
): TransferType => {
  return {
    headers,
    detailFields,
    repository,
    getListAPI: (params: PaginationParamsType) => repository.getUsers(params), // Dynamically bind the API method
    getAPI: (id: string) => repository.getUser(id),
    createAPI: (user: TUser) => repository.createUser(user),
    updateAPI: (id: string, user: Partial<TUser>) => repository.updateUser(id, user),
    deleteAPI: (id: string) => repository.deleteUser(id),
    listPath,
    detailPath,
  };
};

export const TypeTransfer: Record<string, TransferType> = {
  User: createUserTypeTransferEntry(UserTableHeaders, UserDetailFields, userService, "/admin/user", "/admin/user/"),
};
