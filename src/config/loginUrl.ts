import credentials from './credentials';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const { redirectUri, clientId } = credentials;

const scopes = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'playlist-modify-private',
  'playlist-modify-public'
];

export const loginUrl =
  redirectUri && clientId
    ? `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
        '%20'
      )}`
    : '';
