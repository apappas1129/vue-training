import { createPinia } from 'pinia'
import { App, createSSRApp, h, reactive, markRaw } from 'vue'
import { setPageContext } from './usePageContext'
import { PageContext } from './types'

export { createApp }

interface AppPageElemnent extends App<Element> {
  changePage: (pageContext: PageContext) => void;
}

function createApp(pageContext: PageContext) {
  let rootComponentContext: PageContext
  const app = createSSRApp({
    data: () => ({
      Page: markRaw(pageContext.Page),
      pageProps: markRaw(pageContext.pageProps || {}),
    }),
    render() {
      return h(this.Page, this.pageProps)
    },
    created() {
      rootComponentContext = this;
    },
  }) as AppPageElemnent;

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
