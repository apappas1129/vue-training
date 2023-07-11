import { RequestHandler } from 'express';
import { ofetch } from 'ofetch';

/**
 * See https://vite-plugin-ssr.com/auth
 * Authentication middlewares (e.g. Passport.js or Grant) provide information
 * about the logged-in user on the `req` object.
 * Or when using a third-party authentication provider (e.g. Auth0):
 * const user = await authProviderApi.getUser(req.headers)
 */

/** An auth request handler that expects a session cookie written by `express-session`. */
const auth: RequestHandler = async (req, res, next) => {
  console.log('\x1b[32m%s\x1b[0m', '※ Entrypoint Express-session middleware\n');
  console.log(req.headers.cookie);

  console.log('[REDIS SESSION]\n', req.session);
  const user = req.session?.user;
  if (!user) return next();
  req.user = user;

  // TODO: acquire ability here
  // might need to pack here if renderPage cant serialize ability in pageContext
  // https://casl.js.org/v6/en/api/casl-ability-extra#pack-rules

  next();
};

export default auth;
