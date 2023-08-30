import { App, createSSRApp, h, reactive, markRaw } from 'vue';
import AppComponent from './App.vue';

import { createMongoAbility } from '@casl/ability';
import { unpackRules } from '@casl/ability/extra';
import { abilitiesPlugin as casl } from '@casl/vue';

import { createPinia } from 'pinia';
import Notifications from 'notiwind';

import { setPageContext } from './usePageContext';
import { PageContext } from './types';

import { GuestLayout, InstructorLayout, StudentLayout } from '#root/layouts/index';
import _ from 'lodash';

export { createApp };

interface AppPageElement extends App<Element> {
  changePage: (pageContext: PageContext) => void;
}

function createApp(pageContext: PageContext) {
  let rootComponentContext: PageContext;
  const store = createPinia();

  const app = createSSRApp({
    data: () => ({
      Page: _.isObject(pageContext.Page) ? markRaw(pageContext.Page) : pageContext.Page,
      pageProps: markRaw(pageContext.pageProps || {}),
      // Layout: markRaw(pageContext.exports.Layout || selectLayout(pageContext)),
    }),
    render() {
      // const renderLayoutSlot = () => h(this.Page, this.pageProps || {});
      // return h(this.Layout, {}, { default: renderLayoutSlot });
      return h(
        AppComponent,
        {},
        {
          default: () => {
            return h(this.Page, this.pageProps);
          },
        },
      );
    },
    created() {
      rootComponentContext = this;
    },
  }) as AppPageElement;

  app.use(store);
  console.log('USE NOTIFS', Notifications);
  app.use(Notifications);

  if (pageContext.ability) {
    try {
      const unpackedRules = unpackRules(pageContext.ability);
      const ability = createMongoAbility(unpackedRules as any);
      app.use(casl, ability, {
        useGlobalProperties: true,
      });
    } catch (e) {
      console.error('Failed to unpack ability. Error:\n', e);
    }
  }

  // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      Object.assign(pageContextReactive, pageContext);
      rootComponentContext.Page = markRaw(pageContext.Page);
      rootComponentContext.pageProps = markRaw(pageContext.pageProps || {});
    },
  });

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `_default.page.client.js`).
  // We therefore use a reactive pageContext.
  const pageContextReactive = reactive(pageContext);

  setPageContext(app, pageContextReactive);

  return { app, store };
}

// Same as `Object.assign()` but with type inference
function objectAssign<Obj extends object, ObjAddendum>(
  obj: Obj,
  objAddendum: ObjAddendum,
): asserts obj is Obj & ObjAddendum {
  Object.assign(obj, objAddendum);
}

// function selectLayout(pageContext: PageContext) {
//   switch (pageContext.user?.role) {
//     case 'instructor':
//       return InstructorLayout;
//     case 'student':
//       return StudentLayout;
//     default:
//       return GuestLayout;
//   }
// }
