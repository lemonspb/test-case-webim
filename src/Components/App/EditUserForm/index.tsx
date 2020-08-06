import { Form, Input, Button, message, Typography, Switch } from 'antd';
import React, { useState, useEffect } from 'react';
import ApplicationServiсes from '../../../Services'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserInfo } from '../../../Interface';


interface  EditUserForm extends RouteComponentProps<any> {
  userData: UserInfo;
  getListUsers: Function,
  openModal: Function
}




const EditUserForm = (props:EditUserForm) => {
  console.log(props)
  const [form] = Form.useForm();
  const { id = 0 } = props.userData
  const applicationServiсes = new ApplicationServiсes();
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    form.resetFields();
  }, [props.userData])

  const onFinish = (values: UserInfo) => {
    setLoading(true)
    applicationServiсes.editUser(values, id).then((val) => {
      setLoading(false)
    })
  };

  return (
    <div className='edit-user-form'>
      <Form
        form={form}
        initialValues={{ ...props.userData }}
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
            { pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/g, message: 'Пароль должен быть не короче 8 символов, содержать хотя бы одну заглавную букву и цифру' }
          ]}
        >
          <Input
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="first_name"
          rules={[
            { max: 30, message: 'не более 30 символов' }
          ]}
        >

          <Input
            placeholder="First name"
          />
        </Form.Item>
        <Form.Item
          name="last_name"
          rules={[
            { max: 150, message: 'не более 150 символов' }
          ]}
        >
          <Input
            placeholder="Last name"
          />
        </Form.Item>
        <Form.Item name="is_active" label="Active" >
          <Switch />
        </Form.Item>
        <Form.Item
          className="submit-block"
        >
          <Button
            loading={loading}
            type="primary" htmlType="submit" className="login-form-button">
            Редактировать
      </Button>
        </Form.Item>
      </Form>
    </div>


  );
};



export default withRouter(EditUserForm)