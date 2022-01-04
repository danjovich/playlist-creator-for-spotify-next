import React, { createContext, useContext, useEffect, useState } from 'react';
import router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import UserServices from 'services/UserServices';

interface AuthContextData {
  accessToken: string;
  logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    const { 'spotify-playlist-creator:accessToken': cookieAccessToken } =
      parseCookies();

    if (cookieAccessToken) {
      setAccessToken(cookieAccessToken);

      router.push('/dashboard');
    } else if (code) {
      UserServices.getSpotifyTokenFromCode(code)
        .then((newAccessToken) => {
          setAccessToken(newAccessToken);
          setCookie(
            undefined,
            'spotify-playlist-creator:accessToken',
            newAccessToken,
            {
              maxAge: 60 * 60, // 1 hour
              path: '/'
            }
          );
        })
        .catch(() => {
          router.push('/');
        });
    } else router.push('/');
  }, [accessToken]);

  const logout = () => {
    destroyCookie(undefined, 'spotify-playlist-creator:accessToken');
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
