import { Form, Input, Button, message, Typography, Switch } from 'antd';
import React from 'react';
import ApplicationServiсes from '../../../Services'
import {withRouter} from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';




  const CreateUserForm = (props:any) => {
 const applicationServiсes = new ApplicationServiсes();
 const { Title } = Typography;


    const onFinish = (values:any) =>{

      if(values.is_active === undefined)  values.is_active = false
      applicationServiсes.createNewUser(values).then((res)=>{
        applicationServiсes.getListUsers()  

      })
    };
  
 
    return (
      <div className='create-user-form'>
    <Form
    initialValues={{ remember: false }}
    onFinish={onFinish}
  >
    <Form.Item
      name="username"
      rules={[
        { required: true, message: 'Пожалуйста введите имя!' },
    ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Никнейм" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        { required: true, message: 'Пожалуйста введите пароль' },
        {pattern:/^(?=.*[A-Z])(?=.*\d).{8,}$/g,message: 'Пароль должен быть не короче 8 символов, содержать хотя бы одну заглавную букву и цифру'}
    ]}
    >
      <Input
        type="password"
        placeholder="Пароль"
      />
    </Form.Item>
    <Form.Item
      name="first_name"
      rules={[
        {max:30,message: 'не более 30 символов'}
    ]}
    >

      <Input
        placeholder="first name"
      />
    </Form.Item>
    <Form.Item
      name="last_name"
      rules={[
        {max: 30 ,message: 'не более 150 символов'}
    ]}
    >
      <Input
        placeholder="Фамилия"
      />
    </Form.Item>
    <Form.Item name="is_active" label="Активен" >
        <Switch />
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