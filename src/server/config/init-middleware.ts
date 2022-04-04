import type { NextApiRequest, NextApiResponse } from 'next';

const initMiddleware = (
  middleware: (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (err?: unknown) => unknown
  ) => void
) => {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

export default initMiddleware;
