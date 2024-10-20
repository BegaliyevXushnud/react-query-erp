import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,} from 'antd';
import Erplogo from "../../../assets/erplogo2.jpg";

import type { SignUp } from '../types';
import { useSignUpMutation as useSignUp } from '../hooks/mutation';
import { useState } from 'react';

const signUp = () => {
  const [form] = Form.useForm();
  const { mutate, isPending } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values: SignUp) => {
    const phone = values.phone_number.split("").filter(item => item !== " ").join("");
    const payload = { ...values, phone_number: phone };
    console.log(payload);
    mutate(payload);
  };

  const validatePhoneNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.length === 12;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='flex w-full max-w-[2440px] h-[100vh] bg-white shadow-lg'>
        <div className='hidden w-1/2 h-full lg:block'>
          <img src={Erplogo} alt="erplogo" className='object-cover w-full h-full' />
        </div>
        <div className='flex flex-col items-center justify-center w-full px-4 lg:w-1/2 sm:px-6 lg:px-8'>
          <div className='w-full max-w-[460px]'>
            <h1 className='font-semibold text-[40px] mb-8'>Register</h1>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item
                name="first_name"
                className='font-[28px]'
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input
                  prefix={<UserOutlined className='text-[17px] text-[grey]' />}
                  placeholder="First Name"
                  className='w-full h-[50px]'
                  type="text"
                />
              </Form.Item>

              <Form.Item
                name="last_name"
                className='font-[28px]'
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input
                  prefix={<UserOutlined className='text-[17px] text-[grey]' />}
                  placeholder="Last Name"
                  className='w-full h-[50px]'
                  type="text"
                />
              </Form.Item>

              <Form.Item
                name="phone_number"
                className='font-[28px]'
                rules={[
                  { required: true, message: 'Please input your phone number!' },
                  () => ({
                    validator(_, value) {
                      return validatePhoneNumber(value) ? Promise.resolve() : Promise.reject('Invalid phone number!');
                    },
                  }),
                ]}
              >
                <Input
                  prefix={<UserOutlined className='text-[17px] text-[grey]' />}
                  placeholder="+998 90 021 06 06"
                  className='w-full h-[50px]'
                  type="tel"
                />
              </Form.Item>

              <Form.Item
                name="email"
                className='font-[28px]'
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input
                  prefix={<UserOutlined className='text-[17px] text-[grey]' />}
                  placeholder="admin07@gmail.com"
                  className='w-full h-[50px]'
                  type="email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                className='font-[28px]'
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input
                  prefix={<LockOutlined className='text-[17px] text-[grey]' />}
                  placeholder="Password"
                  className='w-full h-[50px]'
                  type={showPassword ? 'text' : 'password'}
                  suffix={
                    <Button onClick={togglePasswordVisibility}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  }
                />
              </Form.Item>

              <Form.Item className='text-[#000000c4]'>
              <Button
                 block
                  type="primary"
                 htmlType="submit"
                  className='bg-[#d45b07] text-white p-8 text-[17px]'
                  loading={isPending}
                >
  Register
</Button>

                <div className="p-2 mt-2 text-center">
                  Do you have an account?
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signUp;
