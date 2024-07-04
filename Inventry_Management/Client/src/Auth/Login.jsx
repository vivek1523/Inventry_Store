import React from 'react'
import { Card,Flex, Typography, Form, Input, Button, Alert, Spin } from 'antd'
import { Link } from 'react-router-dom';
import loginImage from '../assets/InventryLogin2.jpg'
import useLogin from '../Hooks/useLogin';
import { useAuth } from '../Contexts/AuthContext';
import GoogleIcon from '../Images/icons8-google-48.png'

const Login = () => {

  const { error,loading, loginUser} = useLogin();
  const { googleSignIn } = useAuth();

  const handleLogin= async(values)=>{
    await loginUser(values);
  }
  return (
    <Card className='form-container'>
        <Flex gap="large" align='center'>
        <Flex flex={1}>
            <img src={loginImage} className='auth-image'/>
        </Flex>
           {/* form */}
        <Flex vertical flex={1}>
            <Typography.Title level={3} strong className='title'>
              Sign In
            </Typography.Title>
            <Typography.Text type='secondary' strong className='slogan'>
                Unlock Your Store!
            </Typography.Text>
            <Form layout='vertical' onFinish={handleLogin} autoComplete="off">

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


               {
                error && (
                  <Alert description={error} type='error' showIcon closable className='alert'/>
                )
               }

               <Form.Item>
                 <Button 
                 type={`${loading ? '' : 'primary'}`}
                  htmlType='submit' size='large' className='btn'>
                    {loading ? <Spin/> : 'Sign In'}

                  </Button>
               </Form.Item>

               <Form.Item>
                <Link to="/">
                <Button size='large' className='btn'>
                  Create an Account
                </Button>
                </Link>
               </Form.Item>
                
               {/* <Form.Item style={{paddingLeft:"130px"}}>
                  <Button onClick={googleSignIn}><img src={GoogleIcon} style={{height:"30px"}} alt='/'/>Sign in with Google</Button>
               </Form.Item> */}
               {/* <div>
                 <button onClick={googleSignIn}>Sign in with Google</button>
               </div> */}
            </Form>
        </Flex>
        </Flex>
        
    </Card>
  )
}

export default Login