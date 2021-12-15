import useAuth from 'hooks/useAuth';
import React from 'react';

const Dashboard: React.FC = () => {
  const { accessToken } = useAuth();

  return <div>{accessToken}</div>;
};

export default Dashboard;
