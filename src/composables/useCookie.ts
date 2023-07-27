import { FetchOptions } from 'ofetch';
import { PageContext } from '#root/renderer/types';

// Browsers only automatically attach cookie headers for the same-origin requests.
// We do it manually for API since the mocked API and SSR server have shared session storage.
// Probably don't need to do this if the session cookie origin is set from a different domain.
// (See notes on ssr.middleware.ts about the issue with current servers on same domain different ports)
export function useCookie(pageContext: PageContext) {
  // Reference: https://github.com/unjs/ofetch/issues/
  const attachCookie: FetchOptions['onRequest'] = context => {
    if (!pageContext.headers?.cookie) return;

    context.options.headers = new Headers(context.options.headers);

    // After a long painful debugging, I realized that below is useless and that all we need is
    // to add `credentials: 'include'` on the ofetch FetchOption and then it will automatically carry over
    // all cookies from the (I'm assuming) same domain (i.e. "localhost"). Keeping below for now for future reference.
    context.options.headers.set('cookie', pageContext.headers.cookie); // BUG: This doesn't even work without the setting below!
    // and add will continue to use this composable and explicitly pass session cookie
    // through `useCookie` so that `useFetch` does not pass cookies by default.
    context.options.credentials = 'include'; // <-- This is all we needed! :v
    // NOTE: that even without `context.options.headers.set('cookie'...`, The `credentials = 'include'` above already does it automatically
    // I'm curious how it should be implemented if we have our API from a separate domain, but I recon it's still automatically added
    // since our login request which will write the cookie ont he browser will have the corresponding domain of the API. I think the confusion
    // just came from having both servers run under the same domain on different ports.

    console.log(context.options.headers.get('content-type'));
  };

  return { onRequest: attachCookie };
}
