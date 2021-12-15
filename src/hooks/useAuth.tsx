import React, { createContext, useContext, useEffect, useState } from 'react';
import router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import getSpotifyAccessTokenFromCode from 'utils/getSpotifyAccessTokenFromCode';

interface AuthContextData {
  accessToken: string;
  logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    const { 'my-spotify:accessToken': cookieAccessToken } = parseCookies();

    if (cookieAccessToken) {
      setAccessToken(cookieAccessToken);

      router.push('/dashboard');
    } else if (code) {
      getSpotifyAccessTokenFromCode(code, setAccessToken);
    } else router.push('/');
  }, [accessToken]);

  const logout = () => {
    destroyCookie(undefined, 'my-spotify:accessToken');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ accessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
