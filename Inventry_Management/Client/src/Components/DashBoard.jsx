import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Avatar, Button, Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const DashBoard = () => {
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
   // setVisible(false);
  };

  return (
    <Card className='profile-card'>
      <div className="flex vertical gap-small align-center">
        <Avatar size={150} icon={<UserOutlined />} className='avatar' />
        <Typography.Title level={2} strong className='username'>
          {userData.name}
        </Typography.Title>
        <Typography.Text type='secondary' strong>
          Email: {userData.email}
        </Typography.Text>
        <Button size='large' className='profile-btn' type='primary' onClick={handleLogout}>Logout</Button>
        {/* <Button size='large' className='profile-btn' type='default' onClick={() => setVisible(false)}>Close</Button> */}
      </div>
    </Card>
  );
}

export default DashBoard;
