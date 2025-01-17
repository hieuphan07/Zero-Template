import { IRequestBuilder, RequestBuilder } from "@/shared/utils/functions/api/request-builder";
import { TUser } from "../types/user-type";
import { httpClient } from "@/shared/utils/functions/api";
import { PaginationParamsType } from "@/shared/types/common-type/pagination-params-type";
import { PaginatedListType } from "@/shared/types/common-type/paginated-list-type";
import { ApiSuccessResponse } from "@/shared/types/common-type/api-type";
import { autherizeService } from "@/app/auth/services/auth-services";

interface IUserService {
  // change later
  // eslint-disable-next-line
  getUsers(params?: any): Promise<PaginatedListType<TUser>>;
  getUser(id: string): Promise<TUser>;
  createUser(user: TUser): Promise<ApiSuccessResponse<TUser>>;
  updateUser(id: string, user: TUser): Promise<ApiSuccessResponse<TUser>>;
  getUsers(params: PaginationParamsType): Promise<PaginatedListType<TUser>>;
  getUser(id: string): Promise<TUser>;
  createUser(user: TUser): Promise<ApiSuccessResponse<TUser>>;
  updateUser(id: string, user: TUser): Promise<ApiSuccessResponse<TUser>>;
  deleteUser(id: string): Promise<void>;
}

export class UserService implements IUserService {
  private readonly requestBuilder: IRequestBuilder;
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
  public async getUsers(params: PaginationParamsType): Promise<PaginatedListType<TUser>> {
    const payload = (await httpClient.get<PaginatedListType<TUser>>({
      url: this.requestBuilder.buildUrl(),
      config: { params },
    })) as unknown as PaginatedListType<TUser>;
    return payload;
  }

  public async getUser(id: string): Promise<TUser> {
    const payload = (await httpClient.get<TUser>({
      url: this.requestBuilder.buildUrl(id),
    })) as unknown as TUser;
    return payload;
  }

  public async createUser(user: TUser): Promise<ApiSuccessResponse<TUser>> {
    return httpClient.post<TUser, TUser>({
      url: this.requestBuilder.buildUrl(),
      body: user,
    });
  }

  public async updateUser(id: string, user: TUser): Promise<ApiSuccessResponse<TUser>> {
    return httpClient.put<TUser, TUser>({
      url: this.requestBuilder.buildUrl(id),
      body: user,
    });
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      const currentUser = await autherizeService.getCurrentUser();
      await httpClient.delete({
        url: this.requestBuilder.buildUrl(id),
      });

      if (currentUser.id === id) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth";
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

const requestBuilder = new RequestBuilder();
requestBuilder.setResourcePath("admin/users");
export const userService = UserService.getInstance(requestBuilder);
