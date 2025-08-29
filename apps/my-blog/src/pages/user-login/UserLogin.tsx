import { userService, type UserInfo } from "@/api/user-api"
import { Button, Checkbox, Form, Input, message } from "antd"
import { useCallback } from "react"
import { Link, useNavigate } from "react-router"



export default function UserLogin() {
  const navigate = useNavigate()
  const onFinish = useCallback(async (values: Omit<UserInfo, 'email'>) => {
    console.log('values', values)
    const res = await userService.login({ 'body': values })
    console.log(res)
    message.success('登录成功')
    if (res.success) {
      // navigate('/')
    }
  }, [])
  const [form] = Form.useForm()
  return <div className="flex flex-col justify-center items-center h-full gap-4">
    <div className="text-2xl font-bold"> 登录 </div>
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item >
        <div className="flex justify-between">
          <Form.Item name="remember" valuePropName="checked" noStyle  >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item noStyle>
            <Link to="/user/reset">忘记密码</Link>
          </Form.Item>
        </div>

      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">登录</Button>
      </Form.Item>
      <Form.Item>
        <Link to="/user/register">注册</Link>
      </Form.Item>
    </Form>
  </div>
}