import type { NextApiRequest, NextApiResponse } from 'next';
import cors from 'server/config/cors';
import LoginService from 'server/modules/users/services/LoginService';
import AppError from 'server/shared/errors/AppError';

export default class LoginController {
  public async create(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    if (request.method !== 'POST')
      throw new AppError(`Cannot ${request.method}`, 404);

    cors(['Post'])(request, response);

    const { code } = request.body;

    const loginService = new LoginService();

    const authResponse = await loginService.execute({ code });

    return response.status(201).json(authResponse);
  }
}
