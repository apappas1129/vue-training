import { PageContext } from '#root/renderer/types';
import { createMongoAbility, subject as subjectHelper } from '@casl/ability';
import { unpackRules } from '@casl/ability/extra';
import { Action, Subject } from '#casl/types';

/** Use as vite-plugin-ssr `onBeforeRender`.
 *
 ***NOTE:**
 *
 * > Usually, we define `onBeforeRender()` in `.page.server.js` but, if we use Client Routing, then we also have the option
 * to define `onBeforeRender()` in `.page.js` instead.
 * When defined in `.page.server.js` the `onBeforeRender()` hook is only loaded & executed in Node.js, whereas if we define
 * it in `.page.js` then `onBeforeRender()` is also loaded & executed **in the browser: for the first page the user visits
 * `onBeforeRender()` is called in Node.js while for any subsequent page navigation `onBeforeRender()` is called in the browser**.
 */
export default function canAsync<T = Record<PropertyKey, any>>(
  action: `${Action}`,
  entity: `${Subject}`,
  asyncFunction: () => Promise<T>,
  {
    redirectTo,
    successPageProps,
  }: { redirectTo: string; successPageProps: (asyncFuncResult: T) => { [key in string]: any } },
) {
  return async (pageContext: PageContext) => {
    if (!pageContext.ability) return { pageContext: { redirectTo } };

    try {
      const data = (await asyncFunction()) as Record<PropertyKey, any>;
      console.log('onBeforeRender fetched data:', data);
      const unpackedRules = unpackRules(pageContext.ability);
      const ability = createMongoAbility(unpackedRules as any);
      if (!ability.can(action, subjectHelper(entity, data))) return { pageContext: { redirectTo } };

      return {
        pageContext: {
          pageProps: successPageProps(data),
        },
      };
    } catch (err) {
      console.log('Error fetching data onBeforeRender:', err);
      return { pageContext: { redirectTo } };
    }
  };
}
