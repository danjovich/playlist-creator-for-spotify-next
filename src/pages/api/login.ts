import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import SpotifyWebApi from 'spotify-web-api-node';
import initMiddleware from 'server/init-middleware';
import credentials from 'config/credentials';

const cors = initMiddleware(
  Cors({
    methods: 'POST'
  })
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(404).json({});

  await cors(req, res);

  const spotifyApi = new SpotifyWebApi(credentials);

  const { code } = req.body;

  if (!code) return res.status(400).json({});

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);

    return res.json({ accessToken: data.body.access_token });
  } catch (err) {
    return res.status(401).json({});
  }
};

export default handler;
