import React from 'react';
import type { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Dashboard from 'templates/Dashboard';

const DashboardPage: React.FC = () => {
  return <Dashboard />;
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'playlist-creator-for-spotify:accessToken': token } =
    parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
