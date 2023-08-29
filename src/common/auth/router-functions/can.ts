import { PageContext } from '#root/renderer/types';
import { createMongoAbility } from '@casl/ability';
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
export default function can(action: `${Action}`, entity: `${Subject}`, redirectTo: string) {
  // BUG: custom fields on pageContextInit not available here if using clientRouting.
  return (pageContext: PageContext) => {
    if (!pageContext.ability) return { pageContext: { redirectTo } };

    const unpackedRules = unpackRules(pageContext.ability);
    const ability = createMongoAbility(unpackedRules as any);
    if (!ability.can(action, entity)) return { pageContext: { redirectTo } };
    return { pageContext: {} };
  };
}
