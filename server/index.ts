// Note that this file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562

import express, { RequestHandler } from "express";
import compression from "compression";
import { renderPage } from "vite-plugin-ssr/server";
import { root } from "./root.js";
const isProduction = process.env.NODE_ENV === "production";

startServer();

async function startServer() {
  const app = express();

  // Refer to https://expressjs.com/en/guide/using-middleware.html#middleware.application

  app.use(compression());

  if (isProduction) {
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.get("*", auth, async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      user: req.user,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { getBody, statusCode, contentType, earlyHints } = httpResponse;
    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    res
      .status(statusCode)
      .type(contentType)
      .send(await getBody());
  });

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

const auth: RequestHandler = (req, res, next) => {
  // #region Copied code from documentation: https://vite-plugin-ssr.com/auth

  // Authentication middlewares (e.g. Passport.js or Grant) provide information
  // about the logged-in user on the `req` object.
  // const user = req.user

  // Or when using a third-party authentication provider (e.g. Auth0):
  // const user = await authProviderApi.getUser(req.headers)

  // #endregion
  const user = {
    id: 1,
    firstName:'Alex',
    lastName: 'Pappas',
    role: 'student',
    email: 'apappas@arcanys.com',
  };

  // TODO: acquire ability here
  // might need to pack here if renderPage cant serialize ability in pageContext
  // https://casl.js.org/v6/en/api/casl-ability-extra#pack-rules

  req.user = user;
  next();
};
