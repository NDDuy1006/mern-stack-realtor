/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

export type BaseUrl = 'db' | '';

type AxiosRequestConfigCustom = AxiosRequestConfig & {
  requireAuthentication?: boolean;
  newBaseUrl?: BaseUrl;
};

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfigCustom): Promise<R>;
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfigCustom): Promise<R>;
    delete<T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfigCustom
    ): Promise<R>;
    head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfigCustom): Promise<R>;
    options<T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfigCustom
    ): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfigCustom
    ): Promise<R>;
    put<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfigCustom
    ): Promise<R>;
    patch<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfigCustom
    ): Promise<R>;
  }
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || ''
});

instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    config.baseURL = `${import.meta.env.VITE_API_ENDPOINT}`

    return { ...config }
  }
)

export default instance;