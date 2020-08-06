import { Form, Input, Button, message, Typography } from 'antd';
import React,{useState} from 'react';
import ApplicationServiсes from '../../../Services'
import { withRouter } from 'react-router-dom';
import './style.scss';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserInfo } from '../../../Interface';
interface Auth {
  username?: string;
  password?: string;
}



const AuthForm = (props: any) => {
  const applicationServiсes = new ApplicationServiсes();
  const { Title } = Typography;
  const [loading, setLoading] = useState(false)

  const onFinish = (values: Auth) => {
    setLoading(true)
    applicationServiсes.getTokenAuth(values).then((res) => {
      if (res.hasOwnProperty('non_field_errors')) {
        message.error('Не верный логин или пароль')
        setLoading(false)
      }
      if (res.hasOwnProperty('token')) {
        localStorage.setItem('token', res.token)
        message.success('Вы успешно зарегестрированы')
        setLoading(false)
        props.history.push('/main');
        window.location.reload()
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
            { pattern: /^[\w.@+-]+$/g, message: 'имя содержит недопустимый знак' }
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