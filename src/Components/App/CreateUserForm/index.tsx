import { Form, Input, Button, message, Typography, Modal } from 'antd';
import React from 'react';
import ApplicationServiсes from '../../../Services'
import {withRouter} from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface IAuth {
  username?: string;
  password?: string;
}


  const CreateUserForm = (props:any) => {
 const applicationServiсes = new ApplicationServiсes();
 const { Title } = Typography;


    const onFinish = (values:IAuth) =>{
      applicationServiсes.getTokenAuth(values).then((res)=>{
        if( res.hasOwnProperty('non_field_errors')){
          message.error('Не верный логин или пароль')
        }
        if(res.hasOwnProperty('token')){
          localStorage.setItem('token', res.token)
          message.success('Вы успешно зарегестрированы')
          props.history.push('/main');
          window.location.reload()
        }
      })
    };
  
 
    return (
      <div className='create-user-form'>
    <Form
    name="normal_login"
    className="login-form"
    initialValues={{ remember: true }}
    onFinish={onFinish}
  >
    <Form.Item
      name="username"
      rules={[
        { required: true, message: 'Пожалуйста введите имя!' },
    ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        { required: true, message: 'Пожалуйста введите пароль' },
        {pattern:/^(?=.*[A-Z])(?=.*\d).{8,}$/g,message: 'Пароль должен быть не короче 8 символов, содержать хотя бы одну заглавную букву и цифру'}
    ]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        { required: true, message: 'Пожалуйста введите пароль' },
        {pattern:/^(?=.*[A-Z])(?=.*\d).{8,}$/g,message: 'Пароль должен быть не короче 8 символов, содержать хотя бы одну заглавную букву и цифру'}
    ]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        { required: true, message: 'Пожалуйста введите пароль' },
        {pattern:/^(?=.*[A-Z])(?=.*\d).{8,}$/g,message: 'Пароль должен быть не короче 8 символов, содержать хотя бы одну заглавную букву и цифру'}
    ]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item
    className="submit-block"
    >
      <Button type="primary" htmlType="submit" className="login-form-button">
        Создать
      </Button>
    </Form.Item>
  </Form>
  </div>
  
  
);
  };
  


  export default withRouter(CreateUserForm)