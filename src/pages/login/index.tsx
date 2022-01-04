import React from 'react';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from 'next';

import Login from 'templates/Login';
import { loginUrl } from 'config/loginUrl';

const LoginPage: NextPage = ({
  loginUrl: url
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Login loginUrl={url} />;
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      loginUrl
    }
  };
};
