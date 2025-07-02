import Axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { env } from '@/config/env';
import IClientHTTP from "./interfaces/IClientHTTP"
import { useNotifications } from '@/components/ui/molecules/notifications';
import { paths } from '@/config/paths';

export class ClientHTTP implements IClientHTTP {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.axiosInstance = Axios.create({
      baseURL: env.API_URL,
    });

    this.axiosInstance.interceptors.request.use(this.authRequestInterceptor);
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        const message = error.response?.data?.message || error.message;
        useNotifications.getState().addNotification({
          type: 'error',
          title: 'Error',
          message,
        });

        if (error.response?.status === 401) {
          const searchParams = new URLSearchParams();
          const redirectTo =
            searchParams.get('redirectTo') || window.location.pathname;
          window.location.href = paths.auth.login.getHref(redirectTo);
        }

        return Promise.reject(error);
      },
    );
  }

  private authRequestInterceptor(config: InternalAxiosRequestConfig) {
    if (config.headers) {
      config.headers.Accept = 'application/json';
    }

    config.withCredentials = true;
    return config;
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config)
  }

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config)
  }

  put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config)
  }

  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config)
  }

  delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config)
  }
}

const api = new ClientHTTP(env.API_URL);

export default api;
