import session from 'express-session';

const sessionConfig = {
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secure: true, // Set 'secure' to true if using HTTPS
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    },
  };

// Create the session middleware
const expressCookieSession = session(sessionConfig);

export default expressCookieSession;