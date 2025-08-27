class ApiClient {
  private static instance: ApiClient;
  private baseURL: string;
  private defaultOptions: RequestInit;

  private constructor() {
    this.baseURL = import.meta.env.VITE_USE_APIFOX_DATA ? import.meta.env.VITE_APIFOX_API_URL : import.meta.env.VITE_API_URL;
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  // 获取单例实例
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const mergedOptions: RequestInit = {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, mergedOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return response.json() as Promise<T>;
      }
      return response.text() as unknown as Promise<T>;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  public get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  public delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // 设置认证token
  public setAuthToken(token: string): void {
    this.defaultOptions.headers = {
      ...this.defaultOptions.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  // 清除认证token
  public clearAuthToken(): void {
    // const { Authorization, ...headers } = this.defaultOptions.headers;
    // this.defaultOptions.headers = headers;
  }
}

// 导出单例实例
export const apiClient = ApiClient.getInstance();