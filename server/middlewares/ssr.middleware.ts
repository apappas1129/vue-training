import { RequestHandler } from 'express';
import { renderPage } from 'vite-plugin-ssr/server';

const ssr: RequestHandler = async (req, res, next) => {
  console.log('ssr middleware', req.ability);
  const pageContextInit = {
    urlOriginal: req.originalUrl,
    user: req.user,
    ability: req.ability,
  };
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
