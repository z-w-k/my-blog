import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, Space } from 'antd';
import { type CreateBlogReq } from '@/api/blog-api';

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

export interface BlogEditProps {
  onFinish: (values: CreateBlogReq) => void;
  blogData?: CreateBlogReq;
}
const App: React.FC<BlogEditProps> = (props) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={props.onFinish} fields={props.blogData ? Object.keys(props.blogData).map(key => ({ name: key,value: props.blogData![key as keyof CreateBlogReq] })) : []} >
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