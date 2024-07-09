import React from 'react';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';
import { Popover, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../Contexts/AuthContext';
import DashBoard from './DashBoard';

const Navbar = () => {
  const { isAuthenticated, userData } = useAuth();

  const content = (
    <DashBoard />
  );

  return (
    <nav className="navbar navbar-expand-lg bg-dark border border-bottom-1">
      <div className="container">
        <a className="navbar-brand text-white" href="#">Inventory Management System</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <Link className="nav-item nav-link active text-white" to="/dashboard">
              Home
            </Link>
            <Link className="nav-item nav-link active text-white" to="/dashboard/products">
              Products
            </Link>
            <Link className="nav-item nav-link active text-white" to="/dashboard/addproducts">
              Add Products
            </Link>
            {isAuthenticated && userData && (
              <div className="d-flex align-items-center ms-auto">
                <Popover 
                  content={content} 
                  trigger="click"
                  placement="bottomRight"
                >
                  <Button 
                    style={{ backgroundColor: "transparent",color:"white", paddingRight: "20px", border: "none" }} 
                    icon={<Avatar src={userData.photoURL} icon={!userData.photoURL && <UserOutlined />} />}>
                    {userData.name || 'User'}
                  </Button>
                </Popover>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
