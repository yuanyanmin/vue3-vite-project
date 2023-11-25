import { ResultEnum } from '@/emums/httpEnum';
import { useGlobalStore } from '@/stores/modules/global';
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from '../cache/token';
import type { ResultData } from './interface';


export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean
}

// 配置
const config = {
	// 默认地址请求地址，可在 .env.*** 文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（10s）
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true
};

const globalStore = useGlobalStore()
const { setLoadingStatus } = globalStore

class RequestHttp {
  service: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        config.noLoading || setLoadingStatus(true)
        config.headers["Authorization"] = getToken()
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        // * 在请求结束后，并关闭请求 loading
				setLoadingStatus(false);
        return data
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  // 常用的请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }

  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object )
  }

  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object )
  }

  delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }

  download<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, {..._object, responseType: 'blob'} )
  }

}

export default new RequestHttp(config)