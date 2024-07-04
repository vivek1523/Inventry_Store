import React from 'react'
import { Card,Flex, Typography, Form, Input, Button, Alert, Spin } from 'antd'
import { Link } from 'react-router-dom';
import registerImage from '../assets/InventrySign.png'
import useSingup from '../Hooks/useSingup';

const Register = () => {

    const { loading, error, registeredUser } = useSingup();

    const handleRegister =(values)=>{
        registeredUser(values);
    }

  return (
    <Card className='form-container'>
        <Flex gap="large" align='center'>
           {/* form */}
        <Flex vertical flex={1}>
            <Typography.Title level={3} strong className='title'>
              Create an Account
            </Typography.Title>
            <Typography.Text type='secondary' strong className='slogan'>
                Join for exclusive Access to Store!
            </Typography.Text>
            <Form layout='vertical' onFinish={handleRegister} autoComplete="off">
               <Form.Item label="Full name" name="name" rules={[
                {
                    required: true,
                    message: "Please input your Full name!"
                }]}>
                  <Input size='large' placeholder="Enter your full name"/>
               </Form.Item>

               <Form.Item label="Email" name="email" rules={[
                {
                    required: true,
                    message: "Please input your Email!"
                },{
                    type:"email",
                    message: "The input is not valid email"
                }]}>
                  <Input size='large' placeholder="Enter your email"/>
               </Form.Item>

               <Form.Item label="Password" name="password" rules={[
                {
                    required: true,
                    message: "Please input your Password!"
                }]}>
                  <Input.Password size='large' placeholder="Enter your password"/>
               </Form.Item>

               <Form.Item label="ConfrimPassword" name="confrimpassword" rules={[
                {
                    required: true,
                    message: "Please input your Confrim Password!"
                }]}>
                  <Input.Password size='large' placeholder="Re-Enter your password"/>
               </Form.Item>

               {
                error && (
                  <Alert description={error} type='error' showIcon closable className='alert'/>
                )
               }

               <Form.Item>
                 <Button 
                 type={`${loading ? '' : 'primary'}`}
                  htmlType='submit' size='large' className='btn'>
                    {loading ? <Spin/> : 'Create Account'}
                  </Button>
               </Form.Item>

               <Form.Item>
                <Link to="/login">
                <Button size='large' className='btn'>Sign In</Button>
                </Link>
               </Form.Item>
            </Form>
        </Flex>
        {/* Image */}
        {/* <Flex flex={1}>
            <img src={registerImage} className='auth-image'/>
        </Flex> */}
        </Flex>
        
    </Card>
  )
}

export default Register