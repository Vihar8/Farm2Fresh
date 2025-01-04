import React, { useContext } from 'react';
import { Avatar, Card, Button, Modal, Tag } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  LogoutOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  HeartOutlined,
  FireOutlined,
} from '@ant-design/icons';
import api from "../../api/axios";
import JWTContext from '../../context/JWTContext';

const MyProfile = () => {
  const { state, logout } = useContext(JWTContext);
  const { user } = state;

  const handleDeleteAccount = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete your account?',
      content: 'This action is irreversible. Please confirm.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
              // Make a DELETE request to the delete user API
              api.delete(`/auth/deleteUser/${user.id}`) // Adjust the endpoint as needed
              .then(response => {
                if (response.data.success) {
                  alert('Your account has been successfully deleted.');
                  logout(); // Call logout function after successful deletion
                } else {
                  alert('Failed to delete account: ' + response.data.message);
                }
              })
              .catch(error => {
                console.error('There was an error deleting the account!', error);
                alert('An error occurred while trying to delete your account.');
              });
          },
        });
      };
    
//   const handleLogout = () => {
//     logout();
//   };

  return (
    <div className="max-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-emerald-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Main Profile Card */}
        <Card
          style={{
            borderRadius: '16px',
            border: '2px solid #95de64',
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}
          bodyStyle={{ padding: '24px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Avatar
              size={90}
              src={user.profilePic}
              alt={user.name}
              style={{
                border: '4px solid #95de64',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {user.name.charAt(0)}
            </Avatar>

            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#389e0d', 
              margin: '16px 0 8px' 
            }}>
              <ShopOutlined style={{ marginRight: '12px' }} />
              {user.name}
            </h2>

            <Tag color="green" style={{ padding: '4px 12px', fontSize: '14px' }}>
              {user.user_type}
            </Tag>
          </div>

        
          {/* Contact Information */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              padding: '12px',
              background: '#f6ffed',
              borderRadius: '8px',
              marginBottom: '12px'
            }}>
              <MailOutlined style={{ color: '#389e0d', fontSize: '20px' }} />
              <span style={{ color: '#389e0d', fontSize: '16px' }}>{user.email}</span>
              <Tag color="green">Verified</Tag>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              padding: '12px',
              background: '#f6ffed',
              borderRadius: '8px'
            }}>
              <PhoneOutlined style={{ color: '#389e0d', fontSize: '20px' }} />
              <span style={{ color: '#389e0d', fontSize: '16px' }}>{user.mobile}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            justifyContent: 'center'
          }}>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeleteAccount}
              style={{ 
                height: '35px',
                width: '130px',
                padding: '0 24px',
                borderRadius: '8px'
              }}
            >
              Delete Account
            </Button>
            {/* <Button
              type="default"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ 
                height: '40px',
                padding: '0 24px',
                borderRadius: '8px',
                borderColor: '#d9d9d9'
              }}
            >
              Logout
            </Button> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;