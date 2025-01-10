import { IRequestBuilder, RequestBuilder } from "@/shared/utils/functions/api/request-builder";
import { httpClient } from "@/shared/utils/functions/api";

interface ILoginService {
  login(username: string, password: string): Promise<unknown>;
}

export class LoginService implements ILoginService {
  private requestBuilder: IRequestBuilder;
  private static instance: LoginService;

  constructor(requestBuilder: IRequestBuilder) {
    this.requestBuilder = requestBuilder;
  }

  public static getInstance(requestBuilder: IRequestBuilder): LoginService {
    if (!LoginService.instance) {
      LoginService.instance = new LoginService(requestBuilder);
    }
    return LoginService.instance;
  }

  public async login(username: string, password: string): Promise<unknown> {
    const response = await httpClient.post({
      url: this.requestBuilder.buildUrl("login"),
      body: { username, password },
    });
    return response.payload;
  }
}

const requestBuilder = new RequestBuilder();
requestBuilder.setResourcePath("auth");
export const loginService = LoginService.getInstance(requestBuilder);
