


import express from 'express';
import expressCookieSession from './session.middleware.js';

export default function mockedLogout() {
  const app = express();
  app.use(expressCookieSession);

  app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Clear the session cookie on the client side
      // "connect.sid" is the default cookie name set by express-session.
      res.clearCookie("connect.sid", { httpOnly: true });
      res.status(200).send("Logged out successfully");
    });
  });

  return app;
}