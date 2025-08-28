import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useAsyncEffect } from '@/hooks/effect';
import { blogApi, type BlogDetail } from '@/api/blog-api';
import { useParams } from 'react-router';

const App: React.FC = () => {

  const params = useParams()
  console.log('setup params', params)
  const [detail, setDetail] = useState<BlogDetail>()
  useAsyncEffect(async () => {
    console.log('mounted params', params)
    const res = await blogApi.getBlogDetail({ 'query': { 'id': Number(params.id) } })
    setDetail(res.data)
  }, [])

  return (
    <Row className='h-full'>
      <Col span={6} push={0} className=''>
        <div className=''>目录</div>
      </Col>
      <Col span={18} pull={0} className=''>
        <div className='text-2xl font-bold'>{detail?.title}</div>
        <div className='text-sm text-gray-500'>{detail?.createTime}</div>
        <div className='text-sm text-gray-500'>{detail?.authorName}</div>
        <div className='text-sm text-gray-500'>{detail?.category}</div>
        <div className='text-sm text-gray-500'>{detail?.tags}</div>
        <div className='text-sm text-gray-500'>{detail?.content}</div>
      </Col>
    </Row>
  )
};

export default App;