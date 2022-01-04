import React from 'react';
import TopBar from 'components/TopBar';
import LinkButton from 'components/LinkButton';
import * as S from './styles';

interface Props {
  loginUrl: string;
}

const Login: React.FC<Props> = ({ loginUrl }) => {
  return (
    <S.Container>
      <TopBar
        rightButton={
          <LinkButton href={loginUrl}>Login with Spotify</LinkButton>
        }
      />
    </S.Container>
  );
};

export default Login;
