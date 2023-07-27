import { PageContextServer } from '#root/renderer/types';
import { ofetch } from 'ofetch';

export { onBeforeRender };

async function onBeforeRender(pageContext: PageContextServer) {
  const baseUrl = import.meta.env.VITE_WEB_API_URL;

  // Question, do we still have the session cookie passed around here?
  const subject = await ofetch(baseUrl + 'subjects/' + pageContext.routeParams.id).catch(err => {
    console.log('error fetching subject/' + pageContext.routeParams.id, err);
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
