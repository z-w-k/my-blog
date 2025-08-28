import { apiClientIns } from "@/utils/apiClient";

export interface BlogItem {
  blogId: number;
  authorName: string;
  category: string;
  isRecommend: boolean;
  tags: string[];
  title: string;
  authorAvatar: string;
  description: string;
  headerImage: string;
  authorId: number;
  updateTime: string;
  createTime: string;
}

export interface BlogDetail extends BlogItem {
  content: string;
}



interface BlogListReq {
  pageNum?: number;
  pageSize?: number;
  search?: string;
}
interface BlogListResponse {
  blogList: BlogItem[];
  total: number;
  pageNum: number;
  pageSize: number;
}

export interface CreateBlogReq {
  authorName: string;
  content: string;
  description: string;
  title: string;
}
export const blogApi = {
  getBlogList: apiClientIns.createGetApi<void, BlogListReq, BlogListResponse>('/blog/list'),
  getBlogDetail: apiClientIns.createGetApi<void, { blogId: number }, BlogDetail>('/blog/detail'),
  createBlog: apiClientIns.createPostApi<void, CreateBlogReq, { blogId: number}>('/blog/create'),
  deleteBlog: apiClientIns.createDeleteApi<{ blogId: number }, void>('/blog/delete/:blogId'),
}
