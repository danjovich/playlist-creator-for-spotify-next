import type { NextApiRequest, NextApiResponse } from 'next';
import AppError from 'server/shared/errors/AppError';

const server = async (
  request: NextApiRequest,
  response: NextApiResponse,
  controllerMethod: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  try {
    return await controllerMethod(request, response);
  } catch (err) {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      });
    }
    return response.status(500);
  }
};

export default server;
