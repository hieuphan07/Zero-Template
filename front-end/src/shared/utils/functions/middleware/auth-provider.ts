import { AxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";
import { autherizeService } from "@/app/auth/services/auth-services";
import { JwtPayload } from "@/app/auth/types/auth-type";

export const authProvider = {
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("accessToken");
    if (!token) return false;

    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;
      if (payload.exp * 1000 < Date.now()) {
        // Token is expired, try to refresh
        return !!localStorage.getItem("refreshToken");
      }
      return true;
    } catch {
      return false;
    }
  },

  checkAuth: async (): Promise<void> => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      redirect("/auth");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;
      if (payload.exp * 1000 < Date.now()) {
        // Token is expired, try to refresh
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const response = await autherizeService.refreshToken(refreshToken);
            // Update tokens
            // eslint-disable-next-line
            localStorage.setItem("accessToken", (response as any).accessToken);
            // eslint-disable-next-line
            if ((response as any).refreshToken) {
              // eslint-disable-next-line
              localStorage.setItem("refreshToken", (response as any).refreshToken);
            }
          } catch {
            // If refresh fails, redirect to login
            authProvider.clearTokens();
          }
        } else {
          // No refresh token, redirect to login
          authProvider.clearTokens();
        }
      }
    } catch {
      // Invalid token format
      authProvider.clearTokens();
    }
  },

  getAuthConfig: async (): Promise<AxiosRequestConfig> => {
    await authProvider.checkAuth(); // Ensure token is valid
    const token = typeof window === "undefined" ? "" : localStorage.getItem("accessToken") || "";
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
