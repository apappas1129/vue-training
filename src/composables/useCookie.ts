import { FetchOptions } from 'ofetch';
import { PageContext } from '#root/renderer/types';

export function useCookie(pageContext: PageContext) {
  // Reference: https://github.com/unjs/ofetch/issues/
  const attachCookie: FetchOptions['onRequest'] = context => {
    if (!pageContext.headers?.cookie) return;

    context.options.headers = new Headers(context.options.headers);

    // After a long painful debugging, I realized that below is useless and that all we need is
    // to add `credentials: 'include'` on the ofetch FetchOption and then it will automatically carry over
    // all cookies from the same domain. Keeping below for now for future reference on ofetch use cases.
    context.options.headers.set('cookie', pageContext.headers.cookie); // BUG: This doesn't even work!
    // and add will continue to use this composable and explicitly pass session cookie
    // through `useCookie` so that `useFetch` does not pass cookies by default.
    context.options.credentials = 'include'; // <-- This is all we needed! :v

    console.log(context.options.headers.get('content-type'));
  };

  return { onRequest: attachCookie };
}
