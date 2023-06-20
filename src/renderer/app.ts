import { createPinia } from 'pinia'
import { App, createSSRApp, h, reactive, markRaw } from 'vue'
import { setPageContext } from './usePageContext'
import { PageContext } from './types'
import { GuestLayout, InstructorLayout, StudentLayout } from '#root/layouts';

export { createApp }

interface AppPageElement extends App<Element> {
  changePage: (pageContext: PageContext) => void;
}

function createApp(pageContext: PageContext) {
  let rootComponentContext: PageContext
  const app = createSSRApp({
    data: () => ({
      Page: markRaw(pageContext.Page),
      pageProps: markRaw(pageContext.pageProps || {}),
      Layout: markRaw(pageContext.exports.Layout || selectLayout(pageContext))
    }),
    render() {
      const renderLayoutSlot = () => h(this.Page, this.pageProps || {});
      // TODO: Role based layout
      return h(this.Layout, {}, { default: renderLayoutSlot });
    },
    created() {
      rootComponentContext = this;
    },
  }) as AppPageElement;

  const store = createPinia()
  app.use(store)

  // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
  Object.assign(app, {
    changePage: (pageContext: PageContext) => {
      Object.assign(pageContextReactive, pageContext)
      rootComponentContext.Page = markRaw(pageContext.Page)
      rootComponentContext.pageProps = markRaw(pageContext.pageProps || {})
    }
  })

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `_default.page.client.js`).
  // We therefore use a reactive pageContext.
  const pageContextReactive = reactive(pageContext)

  setPageContext(app, pageContextReactive)

  return { app, store }
}

function selectLayout(pageContext: PageContext) {
  switch (pageContext.user?.role.name) {
    case 'instructor':
      return InstructorLayout;
    case 'student':
      return StudentLayout;
    default:
      return GuestLayout;
  }
}
