import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Pagination } from 'antd';
import PersonalIcon from './assets/icons/PersonalIcon';
import useSystemStore from './stores/system-store';
import type { BlogItem } from './api/blog-api';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  
  const {useApifoxData,apiUrl,baseUrl,envName} = useSystemStore()

  console.log(useApifoxData,apiUrl,baseUrl,envName)
  const [blogList,setBlogList] = useState([])

  useEffect(()=>{
    if(useApifoxData){
      setBlogList([])
    }
  },[useApifoxData])


  const BlogListComponent = ()=>(
    blogList.map((item:BlogItem)=>(
      <div key={item.id}>
        <h1>{item.title}</h1>
        <p>{item.content}</p>
      </div>
    ))
  )

  return (
    <Layout className='w-full h-full'>
      <Header style={{ display: 'flex', alignItems: 'center' }} className=' justify-between'>
        <div className="demo-logo text-white" >logo</div>
        <PersonalIcon width='2rem' height='2rem' fill='#fff' />
      </Header>
      <Content style={{ padding: '0 48px' }} className='flex flex-col '>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <div className='flex-1'>
          <BlogListComponent />
        </div>
        <Pagination defaultCurrent={6} total={500} align='center' />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;