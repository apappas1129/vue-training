import { RequestHandler } from 'express';
import { renderPage } from 'vite-plugin-ssr/server';
import { PageContextServer } from '#root/renderer/types';

const ssr: RequestHandler = async (req, res, next) => {
  /** NOTE: Although the actual login and session cookie is done on the Web API, and the domain set on
   * the development express-session config is `localhost`, the address only treated as same-origin
   * by the browser seems to be specific with the port of the web application server. Kind of confusing
   * but this is what I have observed ATTOW. The session cookie is not automatically attached by the browser
   * on the requests to the Web API. Hence, manually passing the cookie on the pageContext below and manually
   * inserting the headers on my API requests on the Vue side. */
  console.log('\x1b[32m%s\x1b[0m', '※ SSR Entrypoint Express-session middleware');
  console.log('\t[Request Headers Cookie]\n\t', req.headers.cookie);
  console.log('\t[REDIS SESSION USER]\n\t', req.session?.user);

  const pageContextInit: Partial<PageContextServer> = {
    urlOriginal: req.originalUrl,
    user: req.user,
    ability: req.ability,
  };

  if (req.headers?.cookie) pageContextInit.headers = { cookie: req.headers.cookie };

  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;
  if (!httpResponse) return next();
  const { getBody, statusCode, contentType, earlyHints } = httpResponse;
  if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map(e => e.earlyHintLink) });
  res
    .status(statusCode)
    .type(contentType)
    .send(await getBody());
};

export default ssr;
