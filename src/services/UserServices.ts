import axios from 'axios';

export default class UserServices {
  public static async getSpotifyTokenFromCode(code: string): Promise<string> {
    const response = await axios.post(`/api/login`, { code });

    const { access_token: accessToken } = response.data;

    return accessToken;
  }
}
