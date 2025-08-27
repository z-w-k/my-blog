import { apiClient } from "@/utils/apiClient";

export interface BlogItem {
  author: string;
  category: string;
  content: string;
  createTime: string;
  id: number;
  isRecommend: boolean;
  tags: string[];
  title: string;
  updateTime: string;
}

type Response<T> = {
  data: T;
}

interface BlogListResponse {
  blogList: BlogItem[];
}
export const blogApi = {
  getPublicBlogList: async () => {
    return apiClient.get<Response<BlogListResponse>>('/getPublicBlogList')
  }
}