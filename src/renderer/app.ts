import { createPinia } from 'pinia';
import { App, createSSRApp, h, reactive, markRaw } from 'vue';
import { setPageContext } from './usePageContext';
import { PageContext } from './types';
import { GuestLayout, InstructorLayout, StudentLayout } from '#root/layouts/index';

export { createApp };

interface AppPageElement extends App<Element> {
  changePage: (pageContext: PageContext) => void;
}

function createApp(pageContext: PageContext) {
  let rootComponentContext: PageContext;
  const app = createSSRApp({
    data: () => ({
      Page: markRaw(pageContext.Page),
      pageProps: markRaw(pageContext.pageProps || {}),
      Layout: markRaw(pageContext.exports.Layout || selectLayout(pageContext)),
    }),
    render() {
      const renderLayoutSlot = () => h(this.Page, this.pageProps || {});
      return h(this.Layout, {}, { default: renderLayoutSlot });
    },
    created() {
      rootComponentContext = this;
    },
  }) as AppPageElement;

  const store = createPinia();
  // TODO: 3 OPTIONS
  // [1] Check if passToClient has serialized CASL ability class instance successfully (not becoming [Object object])
  // [2] Check if we can utilize composables from here on
  // to unpack abilities?
  // [3] Otherwise, revamp how dynamic layout works
  // to make it so that there is only one single application component entry point
  // where you can unpack pageContext.user.ability then store it.
  app.use(store);

  // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
  Object.assign(app, {
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

function selectLayout(pageContext: PageContext) {
  switch (pageContext.user?.role) {
    case 'instructor':
      return InstructorLayout;
    case 'student':
      return StudentLayout;
    default:
      return GuestLayout;
  }
}
