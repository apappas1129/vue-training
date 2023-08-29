import can from '#root/common/auth/router-functions/can-async';
import { FetchOptions, ofetch } from 'ofetch';
import { Action, Subject } from '#casl/types';
import { PageContext } from '#root/renderer/types';

export { onBeforeRender };

// TODO: use Action.update with object fetched for comparison

async function onBeforeRender(pageContext: PageContext) {
  const data = async () => {
    const url = import.meta.env.VITE_WEB_API_URL + 'subjects/' + pageContext.routeParams!.id;
    const options: FetchOptions = {};
    if (pageContext.headers?.cookie) {
      options.headers = { cookie: pageContext.headers.cookie };
      options.credentials = 'include';
    }
    return ofetch(url, options);
  };

  const authorize = can(Action.update, Subject.subject, data, {
    redirectTo: '/subjects',
    successPageProps: subject => ({ subject }),
  });
  const result = await authorize(pageContext);
  console.log('Authorization onBeforeRender result', result);
  return result;
}
