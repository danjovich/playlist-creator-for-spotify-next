import React from 'react';
import { loginUrl } from 'config/loginUrl';

import * as S from './styles';

const Login: React.FC = () => {
  return (
    <S.Container>
      <S.SpotifyLogo
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify Logo"
      />
      <S.LoginButton href={loginUrl}>Login with Spotify</S.LoginButton>
    </S.Container>
  );
};

export default Login;
