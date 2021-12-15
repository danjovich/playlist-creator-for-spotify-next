import axios from 'axios';
import router from 'next/router';
import { setCookie } from 'nookies';

const getSpotifyAccessTokenFromCode = (
  code: string,
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
) => {
  axios
    .post('http://localhost:3000/api/login', {
      code
    })
    .then((response) => {
      setAccessToken(response.data.accessToken);

      setCookie(undefined, 'my-spotify:accessToken', code, {
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      });

      router.push('/dashboard');
    })
    .catch(() => {
      router.push('/');
    });
};

export default getSpotifyAccessTokenFromCode;
