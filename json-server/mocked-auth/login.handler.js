import bodyParser from 'body-parser';
import express from 'express';
import expressCookieSession from './session.middleware.js';

/**
 * Returns an `Express.Application` with a `RequestHandler` for a mocked `POST /login`.
 *
 * Traditionally, session management in `Express.js` involves storing a session ID in a cookie
 * and maintaining session data typically using a session store (e.g. in-memory store, db, or
 * external session store like Redis). For this project we are using express-session which does
 * the in-memory session management for us.
 */
export default function mockedLogin(router) {
  const app = express();
  app.use(bodyParser.json());
  app.use(expressCookieSession);
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = router.db.get("users");
    const user = users.find({ email, password }).value();
    console.log(
      `SELECT * from 'users' WHERE email = '${email}' AND password = '${password}' :\n`,
      user
    );

    if (user) {
      req.session.user = user;
      res.jsonp({ user });
    } else {
      console.log('USER NOTE FOUND! Returning 401, { error: "Invalid credentials" } ');
      // Clear the session cookie on the client side
      // "connect.sid" is the default cookie name set by express-session.
      res.clearCookie("connect.sid", { httpOnly: true });
      res.status(401).jsonp({ error: "Invalid credentials" });
    }
  });

  return app;
}
