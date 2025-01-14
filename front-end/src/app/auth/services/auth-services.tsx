import { IRequestBuilder, RequestBuilder } from "@/shared/utils/functions/api/request-builder";
import { httpClient } from "@/shared/utils/functions/api";
import { LoginRequest, RefreshResponse, RegisterFormData, RegisterResponse } from "@/app/auth/types/auth-type";
import { ApiSuccessResponse } from "@/shared/types/common-type/api-type";

interface IAutherizeService {
  login(loginRequest: LoginRequest): Promise<unknown>;
  register(data: RegisterFormData): Promise<ApiSuccessResponse<RegisterResponse>>;
  refreshToken(refreshToken: string): Promise<RefreshResponse>;
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

  public async login(loginRequest: LoginRequest): Promise<unknown> {
    const response = await httpClient.post({
      url: `${this.requestBuilder.buildUrl("login")}?rememberMe=${loginRequest.rememberMe}`,
      body: { username: loginRequest.username, password: loginRequest.password },
    });
    return response.payload;
  }

  public async register(data: RegisterFormData): Promise<ApiSuccessResponse<RegisterResponse>> {
    return httpClient.post<RegisterResponse, RegisterFormData>({
      url: this.requestBuilder.buildUrl("register"),
      body: data,
    });
  }

  public async refreshToken(refreshToken: string): Promise<RefreshResponse> {
    const response = await httpClient.post<RefreshResponse, { refreshToken: string }>({
      url: this.requestBuilder.buildUrl("refresh-access-token"),
      body: { refreshToken },
    });
    console.log(response.payload);
    return response.payload;
  }
}

const requestBuilder = new RequestBuilder();
requestBuilder.setResourcePath("auth");
export const autherizeService = AutherizeService.getInstance(requestBuilder);
