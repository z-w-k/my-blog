import { blogApi, type BlogItem } from "@/api/blog-api"
import { useAsyncEffect } from "@/hooks/effect"
import { useState } from "react"
import B_Card from "../B_Card"
import useSystemStore from "@/stores/system-store"
import { Pagination } from "antd"


export default function BlogList() {
  const { useApifoxData, apiUrl, baseUrl, envName } = useSystemStore()
  console.log(useApifoxData, apiUrl, baseUrl, envName)
  const [blogList, setBlogList] = useState<BlogItem[]>([])

  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search] = useState('')
  const [total, setTotal] = useState(0)

  useAsyncEffect(async () => {
    if (useApifoxData) {
      const res = await blogApi.getBlogList({
        query: {
          pageNum,
          pageSize,
          search
        }
      })
      console.log('res', res)
      setBlogList(res.data.blogList)
      setTotal(res.data.total)
      setPageNum(res.data.pageNum)
      setPageSize(res.data.pageSize)
    }
  }, [])
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        {blogList.map((item: BlogItem) => (
          <B_Card key={item.blogId} {...item} />
        ))}
      </div>
      <div className="flex justify-center">
        {pageNum}/{total}<br/>
        {pageSize}
      </div>
      <Pagination defaultCurrent={pageNum} total={total} align='center' />
    </div>
  )
} 