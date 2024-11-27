import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Result
        status="404"
        title="404"
        subTitle="Désolé, la page que vous cherchez n'existe pas."
        extra={
          <Button type="primary">
            <Link to="/login">Retour à l'accueil</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
