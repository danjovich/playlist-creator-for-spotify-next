import type { NextApiRequest, NextApiResponse } from 'next';
import LoginController from 'server/modules/users/infra/http/controllers/LoginController';
import server from 'server/shared/infra/http/server';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const loginController = new LoginController();
  server(request, response, loginController.create);
};

export default handler;
