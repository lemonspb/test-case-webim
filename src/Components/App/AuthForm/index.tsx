import { Form, Input, Button, message, Typography } from 'antd';
import React from 'react';
import ApplicationServiсes from '../../../Services'
import {withRouter} from 'react-router-dom';
import './style.scss';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface IAuth {
  username?: string;
  password?: string;
}


  const AuthForm = (props:any) => {
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

        }
      })
    };
  
 
    return (
      <div className='auth-form'>
      <Title level={2}>Авторизация</Title>
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
        {pattern:/^(?=.*[A-Z])(?=.*\d).{8,}$/g,message: 'Пароль должен быть не короче 8 символов и содержать буквы и цифры и содержать хотя бы одну заглавную букву '}
    ]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Войти
      </Button>
    </Form.Item>
  </Form>
  </div>
);
  };
  


  export default withRouter(AuthForm)