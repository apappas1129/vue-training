import { RequestHandler } from 'express';

/**
 * See https://vite-plugin-ssr.com/auth
 * Authentication middlewares (e.g. Passport.js or Grant) provide information
 * about the logged-in user on the `req` object.
 * Or when using a third-party authentication provider (e.g. Auth0):
 * const user = await authProviderApi.getUser(req.headers)
 */

/** An auth request handler that expects a session cookie written by `express-session`. */
const auth: RequestHandler = (req, res, next) => {
  if (!req.session?.user) return next();

  req.user = req.session.user;

  // TODO: acquire ability here
  // might need to pack here if renderPage cant serialize ability in pageContext
  // https://casl.js.org/v6/en/api/casl-ability-extra#pack-rules

  next();
};

export default auth;
