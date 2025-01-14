import { ApiFailureResponse } from "@/shared/types/common-type/api-type";
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdaptAxiosRequestConfig = AxiosRequestConfig & InternalAxiosRequestConfig<any>;

export const onRequest = (config: AdaptAxiosRequestConfig): AdaptAxiosRequestConfig => {
  const accessToken = typeof window === "undefined" ? null : localStorage?.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken || ""}`;
  }
  return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const onResponseError = (error: AxiosError<ApiFailureResponse>) => {
  const errorData: ApiFailureResponse | undefined = error?.response?.data;

  if (errorData && errorData.errorType === "ACCESS_TOKEN_EXPIRED") {
    // !Todo: Get new access token from refresh token
  } else if (errorData && errorData.errorType === "REFRESH_TOKEN_EXPIRED") {
    console.log(`REFRESH_TOKEN_EXPIRED`);
    // !Todo: Logout
  } else if (errorData && errorData.message) {
    // !Todo:Notification Error
    if (Array.isArray(errorData.message) && errorData?.message?.length > 0) {
      console.log(errorData.message[0]);
    } else {
      console.log(errorData.message);
    }
  } else {
    console.log(error?.message);
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
