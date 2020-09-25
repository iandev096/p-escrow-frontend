import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { JWTService } from '../jwt';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected readonly axiosInstance: AxiosInstance;
  protected onUnAuthHandler: Function;

  public constructor(baseURL: string, unAuthObserver?: Function) {
    if (unAuthObserver) this.onUnAuthHandler = unAuthObserver;
    
    this.axiosInstance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.axiosInstance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  public setOnUnAuthHandler(handler: Function) {
    this.onUnAuthHandler = handler;
  }

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => {
    if (error?.response?.status == 401) {
      console.log('axios error: ', error.response);
      this.onUnAuthHandler();
    } 

    return Promise.reject(error)
  };
}

export class HttpClientWithJWT extends HttpClient {
  public constructor(baseUrl: string, unAuthObserver?: Function) {
    super(baseUrl, unAuthObserver);
    this._initializeRequestInterceptor(); // Not needed for auth api endpoints
  }

  private _initializeRequestInterceptor = () => {
    this.axiosInstance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    const jwt = JWTService.getJWT();
    config.headers['Authorization'] = `Bearer ${jwt}`;

    return config;
  };
}
