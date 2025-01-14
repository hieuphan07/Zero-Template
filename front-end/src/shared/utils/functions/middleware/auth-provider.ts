import { AxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";
import { autherizeService } from "@/app/auth/services/auth-services";
import { JwtPayload } from "@/app/auth/types/auth-type";

export const authProvider = {
  isAuthenticated: async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;
    const token = authProvider.getToken();
    if (!token) return false;

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
            return true;
          } catch {
            authProvider.clearTokens();
            return false;
          }
        } else {
          authProvider.clearTokens();
          return false;
        }
      }
      return true;
    } catch {
      authProvider.clearTokens();
      return false;
    }
  },

  checkAuth: async (): Promise<void> => {
    if (typeof window === "undefined") return;

    const token = authProvider.getToken();
    if (!token) {
      redirect("/auth");
      return;
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
            authProvider.clearTokens();
          }
        } else {
          authProvider.clearTokens();
        }
      }
    } catch {
      authProvider.clearTokens();
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

  clearTokens: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      redirect("/auth");
    }
  },
};
