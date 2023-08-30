import { FetchOptions } from 'ofetch';
import { PageContext } from '#root/renderer/types';

export function useCookie(pageContext: PageContext) {
  // Reference: https://github.com/unjs/ofetch/issues/
  const attachCookie: FetchOptions['onRequest'] = context => {
    if (!pageContext.headers?.cookie) return;

    context.options.headers = new Headers(context.options.headers);

    // Below is attaching cookie value in the Headers (Not needed. Keeping for reference)
    context.options.headers.set('cookie', pageContext.headers.cookie);
    // Attach same-origin Cookies to the request
    context.options.credentials = 'include';
  };

  return { onRequest: attachCookie };
}
