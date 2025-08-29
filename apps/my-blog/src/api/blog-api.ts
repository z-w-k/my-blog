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
  content: string;
  description: string;
  title: string;
}

interface resOfBlogModify {
  blogId: number;
}

export const blogApi = {
  getBlogList: apiClientIns.createGetApi<void, BlogListReq, BlogListResponse>('/blog/list'),
  getBlogDetail: apiClientIns.createGetApi<void, { blogId: number }, BlogDetail>('/blog/detail'),
  createBlog: apiClientIns.createPostApi<void, CreateBlogReq, resOfBlogModify>('/blog/create'),
  deleteBlog: apiClientIns.createDeleteApi<{ blogId: number }, void>('/blog/delete/:blogId'),
  updateBlog: apiClientIns.createPutApi<{ blogId: number }, CreateBlogReq, resOfBlogModify>('/blog/update/:blogId'),
}
