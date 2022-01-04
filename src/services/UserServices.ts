import axios from 'axios';

export default class UserServices {
  public static async getSpotifyTokenFromCode(code: string) {
    const response = await axios.post(`/api/login`, { code });

    const { accessToken } = response.data;

    return accessToken;
  }
}
