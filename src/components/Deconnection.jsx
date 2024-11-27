import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const BtnDeconnect = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Button
      type="primary"
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      style={{
        position: 'fixed',
        top: 35,
        right: 35,
        zIndex: 1000,
        backgroundColor: 'red',
        borderColor: 'red',
        color: 'white',
      }}
    >
    </Button>
  );
};

export default BtnDeconnect;