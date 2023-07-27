import { PageContextServer } from '#root/renderer/types';
import { FetchOptions, ofetch } from 'ofetch';

// Still have an issue here, will come back to this after everything else is for an MVP deliverable is done
export { onBeforeRender };

async function onBeforeRender(pageContext: PageContextServer) {
  const baseUrl = import.meta.env.VITE_WEB_API_URL;

  console.log('headers on *.page.ts page context', pageContext.headers);
  // TODO: REDIRECT
  // Question, do we still have the session cookie passed around here?

  const options: FetchOptions = {};
  if (pageContext.headers?.cookie) options.headers = { cookie: pageContext.headers.cookie };
  const subject = await ofetch(baseUrl + 'subjects/' + pageContext.routeParams.id, options).catch(err => {
    // TODO: REDIRECT
    return Promise.resolve(null);
  });

  return {
    pageContext: {
      pageProps: {
        subject,
      },
    },
  };
}
