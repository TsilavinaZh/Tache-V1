// import React, { useState } from 'react';
// import { Form, Input, Button, Checkbox, Layout, Typography, Row, Col, message } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import LogoOnifra from '../../onifra.png';
// import ContactPopup from './contact';

// const { Title } = Typography;
// const { Content } = Layout;

// const LoginPage = () => {
//   const [loading, setLoading] = useState(false);

//   const accounts = {
//     admin: { username: 'Localhost', password: 'admin', role: 'admin' },
//     Lanto: { username: 'Administration001', password: 'admin', role: 'user', url: '/Lanto' },
//     Marina: { username: 'Administration002', password: 'admin', role: 'user', url: '/Marinah' },
//     Hanta: { username: 'Administration003', password: 'admin', role: 'user', url: '/Hanta' },
//   };

//   const adminUrl = "/admin";

//   const navigate = (newPath) => {
//     window.history.pushState({}, "", newPath); 
//     window.location.reload(); 
//   };

//   const onFinish = (values) => {
//     setLoading(true);
//     setTimeout(() => {
//       const account = Object.values(accounts).find(
//         (acc) => acc.username === values.username && acc.password === values.password
//       );

//       if (account) {
//         message.success(`Connexion réussie en tant que ${account.username}!`);
//         if (account.role === 'admin') {
//           navigate(adminUrl); // Redirect the admin to the admin URL
//         } else {
//           navigate(account.url); // Redirect users to their specific page
//         }
//       } else {
//         message.error('Nom d\'utilisateur ou mot de passe incorrect');
//       }
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <Layout style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
//       <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <Row justify="center" style={{ width: '100%' }}>
//           <Col xs={24} sm={12} md={8} lg={6}>
//             <div
//               style={{
//                 background: '#fff',
//                 padding: '30px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//               }}
//             >
//               <center>
//                 <img src={LogoOnifra} alt="" style={{ height: '100px' }} />
//               </center>
//               <Title level={2} style={{ textAlign: 'center' }}>
//                 Connexion
//               </Title>
//               <Form
//                 name="login"
//                 initialValues={{ remember: true }}
//                 onFinish={onFinish}
//                 style={{ maxWidth: 300 }}
//               >
//                 <Form.Item
//                   name="username"
//                   rules={[{ required: true, message: 'Veuillez entrer votre nom d\'utilisateur!' }]}
//                 >
//                   <Input
//                     prefix={<UserOutlined />}
//                     placeholder="Nom d'utilisateur"
//                     autoComplete="username"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   name="password"
//                   rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined />}
//                     placeholder="Mot de passe"
//                     autoComplete="current-password"
//                   />
//                 </Form.Item>

//                 <Form.Item name="remember" valuePropName="checked">
//                   <Checkbox>Se souvenir de moi</Checkbox>
//                 </Form.Item>

//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     block
//                     loading={loading}
//                   >
//                     Se connecter
//                   </Button>
//                 </Form.Item>
//               </Form>
//               <ContactPopup />
//             </div>
//           </Col>
//         </Row>
//       </Content>
//     </Layout>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Layout, Typography, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ContactPopup from './contact'; 
import LogoOnifra from '../../onifra.png'; 

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const accounts = {
    admin: { username: 'Localhost', password: 'admin', role: 'admin' },
    Lanto: { username: 'Administration001', password: 'admin', role: 'user', url: '/Lanto' },
    Marina: { username: 'Administration002', password: 'admin', role: 'user', url: '/Marinah' },
    Hanta: { username: 'Administration003', password: 'admin', role: 'user', url: '/Hanta' },
  };

  const adminUrl = '/Admin';

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      const account = Object.values(accounts).find(
        (acc) => acc.username === values.username && acc.password === values.password
      );

      if (account) {
        message.success(`Connexion réussie en tant que ${account.username}!`);
        navigate(account.role === 'admin' ? adminUrl : account.url);
      } else {
        message.error("Nom d'utilisateur ou mot de passe incorrect");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Row justify="center" style={{ width: '100%' }}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div
              style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <center>
                <img src={LogoOnifra} alt="Logo Onifra" style={{ height: '100px' }} />
              </center>
              <Title level={2} style={{ textAlign: 'center' }}>
                Connexion
              </Title>
              <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Veuillez entrer votre nom d\'utilisateur!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Nom d'utilisateur" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Mot de passe" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Se souvenir de moi</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block loading={loading}>
                    Se connecter
                  </Button>
                </Form.Item>
              </Form>
              <ContactPopup />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
