import React,{ useState }from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import request from '../../request'
import qs from 'qs'
import './login.css'

interface FromFields {
  password: string
}
const Login: React.FC = () => {
  const [ isload, setisload ] = useState(false)

  const onFinish = (values: FromFields) => {

    request.post('/api/login', qs.stringify({
      password: values.password
    }),{
      headers: {
        "Content-Type":"application/x-www-form-urlencoded"
      }
    })
    .then(res=> {
      // console.log(res)
      const data: responseResult.login = res.data
      if(data) {
        setisload(true)

      }else {
        message.error("登录失败")
      }
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
   
  };

  return isload ? <Redirect to="/" /> : (
    <div className="login-page">
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>

  

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};
export default Login