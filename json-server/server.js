import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import jsonServer from 'json-server';

import mockLogin from './mocked-auth/login.handler.js';
import mockLogout from './mocked-auth/logout.handler.js';
import me from './mocked-auth/me.handler.js';
import { expressCookieSession } from './mocked-auth/session.middleware.js';

dotenv.config();

const server = jsonServer.create();
server.use(expressCookieSession);
const router = jsonServer.router('./json-server/db.json');
const middlewares = jsonServer.defaults();

// Enable All CORS Requests
const corsOptions = {
  origin: `http://localhost:${process.env.VITE_SSR_PORT}`,
  methods: ['POST', 'PUT', 'PATCH', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true,
};
// console.log('CORS Configuration\n', corsOptions);
server.use(cors(corsOptions));

// #region json-server configuration
middlewares.push((req, res, next) => {
  console.log('※ json-server middleware: req.session\n', req.session);
  if (req.originalUrl.indexOf('_limit') === -1) req.query = { ...req.query, _limit: 10 }; // default limit
  next();
});

router.render = (req, res) => {
  // Return Objects. Otherwise, if response data is a collection, format according to specs.
  if (!Array.isArray(res.locals.data)) return res.json(res.locals.data);

  // #region extract query params
  // HACK: req.query._page and req.query._limit is undefined in this scope.
  // Both when the original URL already has the params, and when it's already added via middleware above.
  // See reported issue at https://github.com/typicode/json-server/issues/1264
  // Workaround: get params from original request URL.
  let page = 1;
  let limit = 10;

  if (req.originalUrl.includes('?')) {
    const params = new URLSearchParams(req.originalUrl.split('?').pop());
    page = Number(params.get('_page')) || 1;
    limit = Number(params.get('_limit')) || 10;
  }
  // #endregion extract query params

  // As per API Requirements (See https://docs.google.com/document/d/1L0hdRgWpCUyc0EigpzBTy65xjDudIaS3opKrboPwCaQ/edit#heading=h.qszqkn8rjbq3)
  res.json({
    data: res.locals.data,
    totalCount: res.get('X-Total-Count'),
    page,
    limit,
  });

  if (!req.query._limit) req.query._limit = 8;
};
// #endregion json-server configuration

// #region mocked auth API endpoints
server.use(bodyParser.json());
mockLogin(server, router); // POST /login
mockLogout(server);
me(server);
// #endregion mocked auth API endpoints

// TODO: add middleware to authorize requests to json-server endpoints

server.use(middlewares);
server.use(router);

const port = process.env.JSON_SERVER_PORT || 4000;

server.listen(port, () => {
  console.log('\x1b[32m%s\x1b[0m', `JSON Server is running at http://localhost:${port}/`);
});
