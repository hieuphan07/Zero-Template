import { UserTableHeaders } from "@/app/admin/user/types/user-type";
import { TableHeaders } from "../types/common-type/shared-types";
import { userService } from "@/app/admin/user/services/user-service";

export const TypeTransfer: Record<
  string,
  {
    headers: TableHeaders;
    // eslint-disable-next-line
    repository: any;
    // eslint-disable-next-line
    getListAPI: any;
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
  }
> = {
  User: {
    headers: UserTableHeaders,
    repository: userService,
    getListAPI: userService.getUsers,
    getAPI: userService.getUser,
    createAPI: userService.createUser,
    updateAPI: userService.updateUser,
    deleteAPI: userService.deleteUser,
    listPath: "/admin/user",
    detailPath: "/admin/user/",
  },
};
