import React, { useCallback } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, message, Space } from 'antd';
import { blogApi, type CreateBlogReq } from '@/api/blog-api';
import { useNavigate } from 'react-router';

interface SubmitButtonProps {
  form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const onFinish = useCallback(async (values: CreateBlogReq) => {
    const res = await blogApi.createBlog({ 'body': values })
    console.log('res',res);
    message.success('创建成功')
    navigate(`/blog/${res.data.blogId}`)
  }, [])
  return (
    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish} >
      <Form.Item name="authorName" label="作者" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="title" label="标题" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="描述" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="内容" rules={[{ required: true }]}>
        <Input.TextArea rows={10} />
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form}>Submit</SubmitButton>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default App;