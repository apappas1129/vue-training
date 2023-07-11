export default function mockLogout(app) {
  app.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Clear the session cookie on the client side
      // "connect.sid" is the default cookie name set by express-session.
      res.clearCookie('connect.sid', { httpOnly: true });
      res.status(200).send('Logged out successfully');
    });
  });

  return app;
}
