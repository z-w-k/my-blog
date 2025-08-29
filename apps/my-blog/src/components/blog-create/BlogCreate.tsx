import { useCallback } from "react";
import BlogEdit from "../blog-edit/BlogEdit";
import type { CreateBlogReq } from "@/api/blog-api";
import { message } from "antd";
import { useNavigate } from "react-router";
import { blogApi } from "@/api/blog-api";

export default function BlogCreate() {
  const navigate = useNavigate()

  const onFinish = useCallback(async (values: CreateBlogReq) => {
    const res = await blogApi.createBlog({ 'body': values })
    console.log('res', res);
    message.success('创建成功')
    navigate(`/blog/${res.data.blogId}`)
  }, [])
  return <div>
    <BlogEdit onFinish={onFinish}  />
  </div>
}