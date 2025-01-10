import { IRequestBuilder, RequestBuilder } from "@/shared/utils/functions/api/request-builder";
import { httpClient } from "@/shared/utils/functions/api";
import { RegisterFormData, RegisterResponse } from "@/app/auth/types/auth-type";
import { ApiSuccessResponse } from "@/shared/types/common-type/api-type";

interface IAutherizeService {
  login(username: string, password: string): Promise<unknown>;
  register(data: RegisterFormData): Promise<ApiSuccessResponse<RegisterResponse>>;
}

export class AutherizeService implements IAutherizeService {
  private requestBuilder: IRequestBuilder;
  private static instance: AutherizeService;

  constructor(requestBuilder: IRequestBuilder) {
    this.requestBuilder = requestBuilder;
  }

  public static getInstance(requestBuilder: IRequestBuilder): AutherizeService {
    if (!AutherizeService.instance) {
      AutherizeService.instance = new AutherizeService(requestBuilder);
    }
    return AutherizeService.instance;
  }

  public async login(username: string, password: string): Promise<unknown> {
    const response = await httpClient.post({
      url: this.requestBuilder.buildUrl("login"),
      body: { username, password },
    });
    return response.payload;
  }

  public async register(data: RegisterFormData): Promise<ApiSuccessResponse<RegisterResponse>> {
    return httpClient.post<RegisterResponse, RegisterFormData>({
      url: this.requestBuilder.buildUrl("register"),
      body: data,
    });
  }
}

const requestBuilder = new RequestBuilder();
requestBuilder.setResourcePath("auth");
export const autherizeService = AutherizeService.getInstance(requestBuilder);
