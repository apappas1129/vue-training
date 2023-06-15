export { render }
export { onBeforeRender }
export { passToClient }

import { renderToNodeStream } from '@vue/server-renderer'
import { escapeInject } from 'vite-plugin-ssr/server'
import { createApp } from './app'
import type { PageContextServer } from './types'

const passToClient = ['initialStoreState', 'pageProps', 'routeParams']

async function render(pageContext: PageContextServer) {
  const { stream } = pageContext

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="app">${stream}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true
    }
  }
}

async function onBeforeRender(pageContext: PageContextServer) {
  const { app, store } = createApp(pageContext)

  let err: unknown
  // Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
  app.config.errorHandler = (err_) => {
    err = err_
  }

  const stream = renderToNodeStream(app)

  const initialStoreState = store.state.value

  if (err) throw err

  return {
    pageContext: {
      initialStoreState,
      stream
    }
  }
}
