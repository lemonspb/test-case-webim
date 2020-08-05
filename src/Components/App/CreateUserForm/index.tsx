import { Form, Input, Button, message, Typography, Switch } from 'antd';
import React,{useState} from 'react';
import ApplicationServiсes from '../../../Services'
import {withRouter} from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';




  const CreateUserForm = (props:any) => {
    const [form] = Form.useForm();

 const applicationServiсes = new ApplicationServiсes();
 const [loading, setLoading] = useState(false)
  const initialValues:any = {
    name:'',
    password:'',
    first_name:'',
    last_name:'',
  }

    const onFinish = (values:any) =>{
      setLoading(true)
      console.log(values)
      if(values.is_active === undefined)  values.is_active = false
      applicationServiсes.createNewUser(values).then((res)=>{
        message.success('Создан новый пользователь')
        setLoading(false)
        props.openModal()
        values = initialValues
        form.resetFields();
        props.getListUsers()
      })
    };
  
 
    return (
      <div className='create-user-form'>
    <Form
    form={form}
    initialValues={{ ...initialValues }}
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
        placeholder="Имя"
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
      <Button 
                loading={loading}

      type="primary" htmlType="submit" className="login-form-button">
        Создать
      </Button>
    </Form.Item>
  </Form>
  </div>
  
  
);
  };
  


  export default withRouter(CreateUserForm)