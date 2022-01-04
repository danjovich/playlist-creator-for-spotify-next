import type { GetServerSideProps, NextPage } from 'next';
import LoginPage from './login/index';

const Home: NextPage = () => {
  return <LoginPage />;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/login',
      permanent: true
    }
  };
};
