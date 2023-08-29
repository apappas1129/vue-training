import { RequestHandler } from 'express';
import { packRules } from '@casl/ability/extra';
import { defineAbilityFor } from '#casl/defineAbilityFor';

/**
 * See https://vite-plugin-ssr.com/auth
 * Authentication middlewares (e.g. Passport.js or Grant) provide information
 * about the logged-in user on the `req` object.
 * Or when using a third-party authentication provider (e.g. Auth0):
 * const user = await authProviderApi.getUser(req.headers)
 */

/** An auth request handler that expects a session cookie written by `express-session`. */
const auth: RequestHandler = async (req, res, next) => {
  const user = req.session?.user;
  if (!user) return next();
  req.user = user;

  try {
    const ability = defineAbilityFor(user);
    req.ability = packRules(ability.rules);
  } catch (error) {
    console.log('Failed to build CASL ability! Error:\n', error);
  }

  next();
};

export default auth;
