// import React, { useContext } from 'react';
// import { Avatar, Card, Button, Modal, Tag } from 'antd';
// import {
//   MailOutlined,
//   PhoneOutlined,
//   DeleteOutlined,
//   ShopOutlined,
// } from '@ant-design/icons';
// import api from "../../api/axios";
// import JWTContext from '../../context/JWTContext';

// const MyProfile = () => {
//   const { state, logout } = useContext(JWTContext);
//   const { user } = state;

//   const handleDeleteAccount = () => {
//     Modal.confirm({
//       title: 'Are you sure you want to delete your account?',
//       content: 'This action is irreversible. Please confirm.',
//       okText: 'Yes',
//       okType: 'danger',
//       cancelText: 'No',
//       onOk: () => {
//         api.delete(`/auth/deleteUser/${user.id}`)
//           .then(response => {
//             if (response.data.success) {
//               alert('Your account has been successfully deleted.');
//               logout();
//             } else {
//               alert('Failed to delete account: ' + response.data.message);
//             }
//           })
//           .catch(error => {
//             console.error('There was an error deleting the account!', error);
//             alert('An error occurred while trying to delete your account.');
//           });
//       },
//     });
//   };

//   return (
//     <div className="max-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-emerald-50 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto space-y-4">
//         {/* Main Profile Card */}
//         <Card
//           style={{
//             borderRadius: '16px',
//             border: '2px solid #95de64',
//             background: 'rgba(255, 255, 255, 0.95)',
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//           }}
//           bodyStyle={{ padding: '24px' }}
//         >
//           <div style={{ textAlign: 'center', marginBottom: '24px' }}>
//             <Avatar
//               size={90}
//               src={user.profilePic}
//               alt={user.name}
//               style={{
//                 border: '4px solid #95de64',
//                 boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//                 transition: 'transform 0.3s ease',
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = 'scale(1.1)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = 'scale(1)';
//               }}
//             >
//               {user.name.charAt(0)}
//             </Avatar>

//             <h2 style={{
//               fontSize: '28px',
//               fontWeight: 'bold',
//               color: '#389e0d',
//               margin: '16px 0 8px',
//             }}>
//               <ShopOutlined style={{ marginRight: '12px' }} />
//               {user.name}
//             </h2>

//             <Tag color="green" style={{
//               padding: '4px 12px',
//               fontSize: '14px',
//             }}>
//               {user.user_type}
//             </Tag>
//           </div>

//           {/* Contact Information */}
//           <div style={{
//             background: '#fff',
//             borderRadius: '12px',
//             padding: '20px',
//             marginBottom: '24px',
//             boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//           }}>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: '16px',
//               padding: '12px',
//               background: '#f6ffed',
//               borderRadius: '8px',
//               marginBottom: '12px',
//             }}>
//               <MailOutlined style={{ color: '#389e0d', fontSize: '20px' }} />
//               <span style={{ color: '#389e0d', fontSize: '16px' }}>
//                 {user.email}
//               </span>
//               <Tag color="green">Verified</Tag>
//             </div>

//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: '16px',
//               padding: '12px',
//               background: '#f6ffed',
//               borderRadius: '8px',
//             }}>
//               <PhoneOutlined style={{ color: '#389e0d', fontSize: '20px' }} />
//               <span style={{ color: '#389e0d', fontSize: '16px' }}>
//                 {user.mobile}
//               </span>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div style={{
//             display: 'flex',
//             gap: '12px',
//             justifyContent: 'center',
//             marginBottom: '16px',
//           }}>
//             <Button
//               type="primary"
//               danger
//               icon={<DeleteOutlined />}
//               onClick={handleDeleteAccount}
//               style={{
//                 height: '40px',
//                 width: '150px',
//                 padding: '0 24px',
//                 borderRadius: '8px',
//                 fontSize: '16px',
//                 transition: 'all 0.3s ease',
//               }}
//               onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
//               onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
//             >
//               Delete Account
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;


import React, { useContext, useState } from 'react';
import { Avatar, Card, Button, Modal, Typography, Space, Tooltip } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  DeleteOutlined,
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons';
import api from '../../api/axios';
import JWTContext from '../../context/JWTContext';

const { Text, Title } = Typography;

const MyProfile = () => {
  const { state, logout } = useContext(JWTContext);
  const { user } = state;
  const [hover, setHover] = useState(false);

  const handleDeleteAccount = () => {
    Modal.confirm({
      title: 'Confirm Account Deletion',
      content: 'This action is permanent. Are you sure you want to proceed?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        api
          .delete(`/auth/deleteUser/${user.id}`)
          .then((response) => {
            if (response.data.success) {
              Modal.success({
                title: 'Account Deleted',
                content: 'Your account has been successfully deleted.',
              });
              logout();
            } else {
              Modal.error({
                title: 'Error',
                content: `Failed to delete account: ${response.data.message}`,
              });
            }
          })
          .catch(() => {
            Modal.error({
              title: 'Error',
              content: 'An error occurred while deleting your account.',
            });
          });
      },
    });
  };

  return (
    <div className="bg-lime-50 max-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        {/* Profile Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #84C225, #FCD34D)',
            borderRadius: '16px',
            position: 'relative',
            height: '120px',
          }}
          className="mb-6"
        >
          <Avatar
            size={128}
            src={user.profilePic}
            icon={!user.profilePic && <UserOutlined />}
            style={{
              border: '4px solid white',
              position: 'absolute',
              bottom: '-35px',
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>

        {/* Profile Card */}
        <Card
          className="rounded-lg shadow-md border-0"
          style={{
            padding: '20px',
            marginTop: '35px',
            background: '#ffffff',
          }}
        >
          <div className="text-center mb-4">
            <Title level={3} className="mb-1" style={{ color: '#4CAF50' }}>
              {user.name}
            </Title>
            <Text type="secondary" className="block mb-2" style={{ fontSize: '20px' , color: '#F59E0B' }}>
              {user.user_type}
            </Text>
          </div>

          {/* Contact Information */}
          <Space
            direction="vertical"
            size="large"
            style={{ width: '100%', textAlign: 'center' }}
          >
            <Tooltip title="Email Address">
              <div className="flex items-center justify-center gap-4">
                <MailOutlined style={{ fontSize: '20px', color: '#4CAF50' }} />
                <Text style={{ fontSize: '20px'}}>{user.email}</Text>
              </div>
            </Tooltip>

            <Tooltip title="Phone Number">
              <div className="flex items-center justify-center gap-4">
                <PhoneOutlined style={{ fontSize: '20px', color: '#4CAF50' }} />
                <Text style={{ fontSize: '20px'}}>{user.mobile}</Text>
              </div>
            </Tooltip>
          </Space>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center gap-4">
          <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        size="large"
        onClick={handleDeleteAccount}
        style={{
          borderRadius: "8px",
          padding: "0 32px",
          background: hover ? "#E64A19" : "#FF5722",
          color: "white",
          transform: hover ? "scale(1.02)" : "scale(1)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Delete Account
      </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;