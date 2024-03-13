/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { clearAccessToken, loadAccessToken } from '../utils/storage';

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
    
    if (config.headers?.isRequestAuthentication) {
      const accessToken = loadAccessToken()

      if (accessToken) {
        // check if the token has expired
        const parseAccessTokenGlobal = JSON.parse(
          window.atob(accessToken.split('.')[1].replace('-', '+').replace('_', '/'))
        );
        const tokenExpiration = parseAccessTokenGlobal?.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        if (tokenExpiration <= currentTime) {
          // await renewTokenFunc(config);
          clearAccessToken()
        } else {
          // Token is still valid, add it to the request headers
          Object.assign(config.headers || '', {
            Authorization: `Bearer ${accessToken}`
          });
        }
        // Token is still valid, add it to the request headers
          Object.assign(config.headers || '', {
            Authorization: `Bearer ${accessToken}`
          });
      }
    }
    delete config.headers?.isRequestAuthentication;

    return config
  }
)

export const baseURL = axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT

export default instance;