import { Form, Input, Button, message, Switch } from 'antd';
import React, { useState } from 'react';
import ApplicationServiсes from '../../../Services'
import { withRouter } from 'react-router-dom';
import { UserInfo } from '../../../Interface';



const CreateUserForm = (props: any) => {
  const [form] = Form.useForm();


  const applicationServiсes = new ApplicationServiсes();
  const [loading, setLoading] = useState(false)
  const initialValues: UserInfo = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
  }

  const onFinish = (values: UserInfo) => {
    setLoading(true)
    if (values.is_active === undefined) values.is_active = false
    applicationServiсes.createNewUser(values).then((res) => {
      if (res.status === 'error') {
        res.resResult.then((result: any) => {
          for (let value in initialValues) {
            if (result.hasOwnProperty(value)) {
              message.error('Такие данные уже используются')
              setLoading(false)
            }
          }

        })
      }
      if (res.status === 'ok') {
        res.resResult.then((result: any) => {
          message.success('Создан новый пользователь')
          setLoading(false)
          props.openModal();
          values = initialValues
          form.resetFields();
          props.getListUsers();
        })
      }
    })
  }

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
            { pattern: /^[\w.@+-]+$/g, message: 'Имя содержит недопустимый символ' },
            { required: true, message: 'Пожалуйста введите имя!' }
          ]}
        >
          <Input placeholder="Username" />
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
        <Form.Item name="is_active" label="Active">
          <Switch defaultChecked={false}/>
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