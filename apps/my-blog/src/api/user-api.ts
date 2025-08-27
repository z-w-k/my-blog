import { apiClient } from "@/utils/apiClient";

export interface User {
  id: number;
  name: string;
  email: string;
}


// 在组件中使用
export const userService = {
  // 获取用户列表
  getUsers: async (): Promise<User[]> => {
    return apiClient.get<User[]>('/users');
  },

  // 创建用户
  createUser: async (userData: CreateUserDto): Promise<User> => {
    return apiClient.post<User>('/users', userData);
  },

  // 更新用户
  updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
    return apiClient.put<User>(`/users/${id}`, userData);
  },

  // 删除用户
  deleteUser: async (id: number): Promise<void> => {
    return apiClient.delete(`/users/${id}`);
  },
};