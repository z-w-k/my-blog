import { apiClientIns } from "@/utils/apiClient";

/**
 * UserInfo
 */
export interface UserInfo {
  email: string;
  password: string;
  username: string;
}


// 在组件中使用
export const userService = {
  // 获取用户列表
  // getUsers: apiClientIns.createGetApi<void, void, UserInfo[]>('/users'),

  // 创建用户
  registerUser: apiClientIns.createPostApi<void, UserInfo, void>('/user/register'),

  // 更新用户
  resetUser: apiClientIns.createPutApi<void, Omit<UserInfo, 'email'>, void>('/user/reset'),

  login: apiClientIns.createPostApi<void, Omit<UserInfo, 'email'>, void>('/user/login'),

  // 删除用户
  // deleteUser: apiClientIns.createDeleteApi<{ id: number }, void>('/users/:id'),
};