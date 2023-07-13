import session from 'express-session';

import RedisStore from 'connect-redis';
import { createClient } from 'redis';

import dotenv from 'dotenv';
dotenv.config();

// Initialize client.
const redisClient = createClient({
  host: 'localhost',
  port: process.env.REDIS_SERVER_PORT,
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({ client: redisClient });

const sessionConfig = {
  secret: 'your_secret_key',
  resave: false, // required: force lightweight session keep alive (touch)
  saveUninitialized: false, // recommended: only save session when data exists
  cookie: {
    // secure: true, // Set 'secure' to true if using HTTPS
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    sameSite: 'lax',
    domain: `localhost`, // NOTE: after hours of troubleshooting, please remember to not add port and even http:// here!
  },
  store: redisStore,
};

// Create the session middleware
export const expressCookieSession = session(sessionConfig);
