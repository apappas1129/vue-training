import can from '#root/common/auth/router-functions/can-async';
import { FetchOptions, ofetch } from 'ofetch';
import { PageContext } from '#root/renderer/types';

export { onBeforeRender };

async function onBeforeRender(pageContext: PageContext) {
  const data = async () => {
    const url = import.meta.env.VITE_WEB_API_URL + 'modules/' + pageContext.routeParams!.id;
    const options: FetchOptions = {};
    if (pageContext.headers?.cookie) {
      options.headers = { cookie: pageContext.headers.cookie };
      options.credentials = 'include';
    }
    return ofetch(url, options);
  };

  const authorize = can('update', 'module', data, {
    redirectTo: '/modules',
    successPageProps: module => ({ module }),
  });
  const result = await authorize(pageContext);
  console.log('Authorization onBeforeRender result', result);
  return result;
}
