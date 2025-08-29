import React from 'react';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { blogApi, type BlogItem } from '@/api/blog-api';
import { Link, useNavigate } from 'react-router';

const { Meta } = Card;

const App: React.FC<BlogItem> = (props) => {
  const navigate = useNavigate()
  return (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    hoverable
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" onClick={() => {
        navigate(`/blog/update/${props.blogId}`)
      }} />,
      <EllipsisOutlined key="ellipsis" />,
      <DeleteOutlined key="delete" onClick={async () => {
        await blogApi.deleteBlog({ 'params': { 'blogId': props.blogId } })
      }} />,
      
    ]}
    title={props.title}
    extra={<Link to={`blog/${props.blogId}`}>查看</Link>}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title={props.authorName}
      description={props.description}
    />
  </Card>
)};

export default App;