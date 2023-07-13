// Note that this file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import compression from 'compression';
import { root } from './root.js';

import { expressCookieSession } from '../json-server/mocked-auth/session.middleware.js';
import auth from './middlewares/auth.middleware.js';
import ssr from './middlewares/ssr.middleware.js';

const isProduction = process.env.NODE_ENV === 'production';

startServer();

async function startServer() {
  const app = express();

  // Refer to https://expressjs.com/en/guide/using-middleware.html#middleware.application

  app.use(compression());

  if (isProduction) {
    const sirv = (await import('sirv')).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = await import('vite');
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);

    // using redis
    app.use(expressCookieSession);
  }

  app.get('*', auth, ssr);

  const port = process.env.VITE_SSR_PORT || 3200;
  app.listen(port);
  console.log('\x1b[33m%s\x1b[0m', `⚡ Vite Server is running at http://localhost:${port}/`);
  console.log(`Server running at http://localhost:${port}`);
}
