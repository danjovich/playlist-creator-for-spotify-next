import Cors from 'cors';
import initMiddleware from './init-middleware';

const cors = (methods: string[]) =>
  initMiddleware(
    Cors({
      methods
    })
  );

export default cors;
