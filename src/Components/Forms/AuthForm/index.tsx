import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Form, Input, Button, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import ApplicationServiсes from '../../../Services'
import './style.scss';

interface Auth {
  username?: string;
  password?: string;
}


const AuthForm = (props: RouteComponentProps<any>) => {

  const applicationServiсes = new ApplicationServiсes();
  const { Title } = Typography;
  const [loading, setLoading] = useState(false)

  const onFinish = (values: Auth) => {
    setLoading(true)
    applicationServiсes.getTokenAuth(values).then((res) => {
      if (res.status === 'error') {
        res.resResult.then((result: any) => {
          if (result.hasOwnProperty('non_field_errors')) {
            message.error('Не верный логин или пароль')
            setLoading(false)
          }
          else {
            message.error('Что-то пошло не так')
            setLoading(false)
          }
        })
      }
      if (res.status === 'ok') {
        res.resResult.then((result: any) => {
          if (result.hasOwnProperty('token')) {
            localStorage.setItem('token', result.token)
            message.success('Вы успешно зарегестрированы')
            setLoading(false)
            props.history.push('/main');
            window.location.reload()
          }
        })
      };
    })
  }

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
            { pattern: /^[\w.@+-]+$/g, message: 'Имя содержит недопустимый символ' }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста введите пароль' },
            { min: 8, message: 'Пароль должен содержать не менее 8 символов' },
            { pattern: /^(?=.*[A-Z])(?=.*\d)/g, message: 'Пароль должен содержать хотя бы одну заглавную букву и цифру' }
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
          <Button
            loading={loading}
            type="primary" htmlType="submit" className="login-form-button">
            Войти
      </Button>
        </Form.Item>
      </Form>
    </div>
  );
};



export default withRouter(AuthForm)