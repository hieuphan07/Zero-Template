import { IRequestBuilder, RequestBuilder } from "@/shared/utils/functions/api/request-builder";
import { User } from "../types/user-type";

interface IUserService {
  // change later
  // eslint-disable-next-line
  getUsers(params: any): Promise<User[]>;
  getUser(id: string): Promise<User>;
  createUser(user: User): Promise<User>;
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
  // eslint-disable-next-line
  public async getUsers(params: any): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line
  public async getUser(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line
  public async createUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
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
requestBuilder.setResourcePath("users");
export const userService = UserService.getInstance(requestBuilder);
