import { RequestHandler } from 'express';
import { renderPage } from 'vite-plugin-ssr/server';
import { PageContextServer } from '#root/renderer/types';

const ssr: RequestHandler = async (req, res, next) => {
  console.log('\x1b[32m%s\x1b[0m', '※ SSR Entrypoint Express-session middleware');
  console.log('\t[Request Headers Cookie]\n\t', req.headers.cookie);
  console.log('\t[REDIS SESSION USER]\n\t', req.session?.user);

  const pageContextInit: Partial<PageContextServer> = {
    urlOriginal: req.originalUrl,
    user: req.user,
    ability: req.ability,
  };

  // This is no longer needed if only for manually attaching cookie headers to API requests.
  // Keeping below for future reference that this can be done as well. But adding `credentials = 'include'`
  // to the ofetch FetchOptions automatically carries over the session cookies for the same-origin domain of the request
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
