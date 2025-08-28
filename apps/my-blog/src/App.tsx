import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import PersonalIcon from './assets/icons/PersonalIcon';

import { Link, Outlet } from 'react-router';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout className='w-full h-full'>
      <Header style={{ display: 'flex', alignItems: 'center' }} className=' justify-between'>
        <Link to='/' className="demo-logo text-white" >logo</Link>
        <Link to='/blog/create' className='text-white cursor-pointer'>create blog</Link>
        <PersonalIcon width='2rem' height='2rem' fill='#fff' />
        
      </Header>
      <Content style={{ padding: '0 48px' }} className='flex flex-col '>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <div className='flex-1 p-4 bg-white'>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;