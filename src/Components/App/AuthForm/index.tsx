import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import ApplicationServiсes from '../../../Services'


  const AuthForm = () => {

 const applicationServiсes = new ApplicationServiсes();


    const onFinish = (values:any) => {
      console.log('Success:', values);
      applicationServiсes.getTokenAuth(values)
    };
  
    const onFinishFailed = (errorInfo:any) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Имя"
          name="username"
          rules={[{   
            required: true, message: 'Please input your username!' },
            {min:1,message: 'Please input your length!'},
            {pattern:/^(?=.*[A-Z])(?=.*\d).{8,}$/g,message: 'Please input your length!'   }
        ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item >
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    );
  };
  


  export default AuthForm