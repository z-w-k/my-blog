import { useNavigate, useParams } from "react-router";
import BlogEdit from "../blog-edit/BlogEdit";
import { useCallback, useState } from "react";
import { blogApi, type CreateBlogReq } from "@/api/blog-api";
import { message } from "antd";
import { useAsyncEffect } from "@/hooks/effect";

export default function BlogUpdate() {
  const navigate = useNavigate()
  const params = useParams()
  const onFinish = useCallback(async (values: CreateBlogReq) => {
    const res = await blogApi.updateBlog({ 'params': { 'blogId': Number(params.id) }, 'body': values })
    message.success('更新成功')
    navigate(`/blog/${res.data.blogId}`)
  }, [])
  const [blogData, setBlogData] = useState<CreateBlogReq | undefined>(undefined)
  useAsyncEffect(async () => {
    const res = await blogApi.getBlogDetail({ 'query': { 'blogId': Number(params.id) } })
    setBlogData(res.data)
    console.log('res.data', res.data);
    
  }, [])

  return <div>
    <BlogEdit onFinish={onFinish} blogData={blogData} />
  </div>
}