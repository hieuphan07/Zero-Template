import { AxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";

export const authProvider = {
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("accessToken");
    return !!token;
  },

  checkAuth: (): void => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("accessToken");
    if (!token) {
      redirect("/login");
    }
  },

  getAuthConfig: (): AxiosRequestConfig => {
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

  clearToken: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      redirect("/login");
    }
  },
};
