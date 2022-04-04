import credentials from 'config/credentials';
import AppError from 'server/shared/errors/AppError';
import SpotifyWebApi from 'spotify-web-api-node';
import AuthorizationResponse from '../infra/entities/AuthorizationResponse';

interface IRequest {
  code: string;
}

export default class LoginService {
  public async execute(requestData: IRequest): Promise<AuthorizationResponse> {
    const spotifyApi = new SpotifyWebApi(credentials);

    const { code } = requestData;

    if (!code)
      throw new AppError('Authentication needs a Spotify-provided code');

    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      return data.body;
    } catch (err) {
      throw new AppError('Authentication failed', 401);
    }
  }
}
