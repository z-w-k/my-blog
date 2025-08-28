// types.ts
interface Response<T = unknown> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  [key: string]: unknown;
}

export interface Interceptor<T> {
  onFulfilled?: (value: T) => T | Promise<T>;
  onRejected?: (error: unknown) => unknown;
}

// apiClient.ts
class ApiClient {
  private static instance: ApiClient;
  private baseURL: string;
  private requestInterceptors: Array<Interceptor<RequestInit>> = [];
  private responseInterceptors: Array<Interceptor<Response>> = [];

  private constructor() {
    this.baseURL = import.meta.env.VITE_USE_APIFOX_DATA ? import.meta.env.VITE_APIFOX_API_URL : import.meta.env.VITE_API_URL;
  }

  // 单例获取方法
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // 设置基础 URL
  public setBaseURL(url: string): void {
    this.baseURL = url;
  }

  // 添加请求拦截器
  public addRequestInterceptor(interceptor: Interceptor<RequestInit>): number {
    return this.requestInterceptors.push(interceptor);
  }

  // 添加响应拦截器
  public addResponseInterceptor(interceptor: Interceptor<Response>): number {
    return this.responseInterceptors.push(interceptor);
  }

  // 移除请求拦截器
  public removeRequestInterceptor(id: number): void {
    this.requestInterceptors.splice(id - 1, 1);
  }

  // 移除响应拦截器
  public removeResponseInterceptor(id: number): void {
    this.responseInterceptors.splice(id - 1, 1);
  }

  // 执行拦截器链
  private async executeInterceptors<T>(
    interceptors: Array<Interceptor<T>>,
    value: T
  ): Promise<T> {
    let result = value;
    for (const interceptor of interceptors) {
      if (interceptor.onFulfilled) {
        result = await interceptor.onFulfilled(result);
      }
    }
    return result;
  }

  // 核心请求方法
  private async coreRequest<TParams, TQuery, TBody, TResponse>(config: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    params?: TParams;
    query?: TQuery;
    body?: TBody;
    options?: RequestConfig;
  }): Promise<Response<TResponse>> {
    try {
      // 处理路径参数
      let finalUrl = this.baseURL + config.url;
      if (config.params) {
        const entries = Object.entries(config.params as Record<string, string>)

        const reduceRes = entries.reduce(
          (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
          finalUrl
        )
        finalUrl = reduceRes;
      }

      // 处理查询参数
      if (config.query) {
        const queryParams = new URLSearchParams(config.query as Record<string, string>).toString();
        finalUrl = `${finalUrl}${finalUrl.includes('?') ? '&' : '?'}${queryParams}`;
      }

      // 准备请求配置
      let requestConfig: RequestInit = {
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
          ...config.options?.headers,
        },
      };

      // 添加请求体（非 GET 请求）
      if (config.method !== 'GET' && config.body) {
        requestConfig = {
          ...requestConfig,
          body: JSON.stringify(config.body),
        };
      }

      // 执行请求拦截器
      requestConfig = await this.executeInterceptors(this.requestInterceptors, requestConfig);

      // 设置超时
      const timeout = config.options?.timeout || 10000;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      requestConfig.signal = controller.signal;

      // 发送请求
      const response = await fetch(finalUrl, requestConfig);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // 解析响应
      let responseData: Response<TResponse> = await response.json();

      // 执行响应拦截器
      responseData = await this.executeInterceptors<Response<TResponse>>(this.responseInterceptors as Array<Interceptor<Response<TResponse>>>, responseData);

      return responseData;

    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // GET 工厂方法
  public createGetApi<TParams = void, TQuery = void, TResponse = unknown>(url: string) {
    return (options?: {
      params?: TParams;
      query?: TQuery;
      config?: RequestConfig;
    }): Promise<Response<TResponse>> => {
      return this.coreRequest<TParams, TQuery, void, TResponse>({
        method: 'GET',
        url,
        params: options?.params,
        query: options?.query,
        options: options?.config,
      });
    };
  }

  // POST 工厂方法
  public createPostApi<TParams = void, TBody = void, TResponse = unknown>(url: string) {
    return (options?: {
      params?: TParams;
      body?: TBody;
      config?: RequestConfig;
    }): Promise<Response<TResponse>> => {
      return this.coreRequest<TParams, void, TBody, TResponse>({
        method: 'POST',
        url,
        params: options?.params,
        body: options?.body,
        options: options?.config,
      });
    };
  }

  // PUT 工厂方法
  public createPutApi<TParams = void, TBody = void, TResponse = unknown>(url: string) {
    return (options?: {
      params?: TParams;
      body?: TBody;
      config?: RequestConfig;
    }): Promise<Response<TResponse>> => {
      return this.coreRequest<TParams, void, TBody, TResponse>({
        method: 'PUT',
        url,
        params: options?.params,
        body: options?.body,
        options: options?.config,
      });
    };
  }

  // DELETE 工厂方法
  public createDeleteApi<TParams = void, TResponse = unknown>(url: string) {
    return (options?: {
      params?: TParams;
      config?: RequestConfig;
    }): Promise<Response<TResponse>> => {
      return this.coreRequest<TParams, void, void, TResponse>({
        method: 'DELETE',
        url,
        params: options?.params,
        options: options?.config,
      });
    };
  }
}

// 导出单例
export const apiClientIns = ApiClient.getInstance();

export default ApiClient;