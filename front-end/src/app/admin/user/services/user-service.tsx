import { IRequestBuilder, RequestBuilder } from "@/shared/utils/functions/api/request-builder";
import { User } from "../types/user-type";
import { httpClient } from "@/shared/utils/functions/api";
import { PaginationParamsType } from "@/shared/types/common-type/pagination-params-type";
import { PaginatedListType } from "@/shared/types/common-type/paginated-list-type";
import { UserCreate } from "../types/user-type";
import { ApiSuccessResponse } from "@/shared/types/common-type/api-type";

interface IUserService {
  // change later
  // eslint-disable-next-line
  getUsers(params?: any): Promise<PaginatedListType<User>>;
  getUser(id: string): Promise<User>;
  createUser(user: UserCreate): Promise<ApiSuccessResponse<User>>;
  updateUser(id: string, user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}

export class UserService implements IUserService {
  private requestBuilder: IRequestBuilder;
  private static instance: UserService;

  constructor(requestBuilder: IRequestBuilder) {
    this.requestBuilder = requestBuilder;
  }

  public static getInstance(requestBuilder: IRequestBuilder): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService(requestBuilder);
    }
    return UserService.instance;
  }

  // Below is template, change and remove eslint-disable later
  public async getUsers(params: PaginationParamsType): Promise<PaginatedListType<User>> {
    const payload = (await httpClient.get<PaginatedListType<User>>({
      url: this.requestBuilder.buildUrl(),
      config: { params },
    })) as unknown as PaginatedListType<User>;
    console.log(payload);
    return payload;
  }

  // eslint-disable-next-line
  public async getUser(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  public async createUser(user: UserCreate): Promise<ApiSuccessResponse<User>> {
    return httpClient.post<User, UserCreate>({
      url: this.requestBuilder.buildUrl(),
      body: user,
    });
  }

  // eslint-disable-next-line
  public async updateUser(id: string, user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line
  public async deleteUser(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

const requestBuilder = new RequestBuilder();
requestBuilder.setResourcePath("admin/users");
export const userService = UserService.getInstance(requestBuilder);
