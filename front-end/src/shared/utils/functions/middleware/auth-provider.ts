import { AxiosRequestConfig } from "axios";
import { autherizeService } from "@/app/auth/services/auth-services";
import { JwtPayload } from "@/app/auth/types/auth-type";
import { AuthResponse } from "@/shared/types/common-type/shared-types";

export const authProvider = {
  checkAuth: async (): Promise<AuthResponse> => {
    if (typeof window === "undefined") return { path: "/auth", message: "common:message.login-required" };

    const token = authProvider.getToken();
    if (!token) {
      return { path: "/auth", message: "common:message.login-required" };
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;
      if (payload.exp * 1000 < Date.now()) {
        const refreshToken = authProvider.getRefreshToken();
        if (refreshToken) {
          try {
            const response = await autherizeService.refreshToken(refreshToken);
            authProvider.setToken(response.accessToken);
            if (response.refreshToken) {
              authProvider.setRefreshToken(response.refreshToken);
            }
          } catch {
            return authProvider.clearTokens();
          }
        } else {
          return authProvider.clearTokens();
        }
      }
      return { path: "/", message: "common:message.already-login" };
    } catch {
      return authProvider.clearTokens();
    }
  },

  getAuthConfig: async (): Promise<AxiosRequestConfig> => {
    await authProvider.checkAuth();
    const token = typeof window === "undefined" ? "" : (authProvider.getToken() ?? "");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },

  setToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
    }
  },

  setRefreshToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("refreshToken", token);
    }
  },

  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  },

  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refreshToken");
  },

  clearTokens: (): AuthResponse => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return { path: "/auth", message: "common:message.session-expired" };
    }
    return { path: "", message: "" };
  },
};
