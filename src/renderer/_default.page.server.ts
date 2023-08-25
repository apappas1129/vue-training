export { render };
export { onBeforeRender };
export { passToClient };

import { renderToNodeStream } from '@vue/server-renderer';
import { escapeInject } from 'vite-plugin-ssr/server';
import { createApp } from './app';
import type { PageContextServer } from './types';
import { getPageTitle } from './getPageTitle';

// We tell `vite-plugin-ssr` to make the following data available from `pageContext` in the browser.
const passToClient = [
  'initialStoreState',
  'pageProps',
  'routeParams',
  'urlPathname',
  'user',
  'ability',
  'headers',
  'redirectTo',
];

async function render(pageContext: PageContextServer) {
  const { stream, user } = pageContext;

  // https://github.com/brillout/vite-plugin-ssr/blob/main/examples/vue-full/renderer/getPageTitle.ts
  const title = getPageTitle(pageContext);
  const tabIconUrl = import.meta.env.BASE_URL + 'vite.svg';

  // NOTE: With enableEagerStreaming, HTML template (e.g. `<title>`) is immediately written to the stream
  /* NOTE: See https://github.com/adoxography/tailwind-scrollbar/issues/59, scrollbar properties aren't inherited.
     However the plugin has been patched so that you can at least define colours to inherit and repeat only `.scrollbar` or `scrollbar-thin`
     on child containers. */

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html class="h-full bg-gray-100 ">
      <head>
        <link rel="icon" href="${tabIconUrl}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        </head>
        <body class="h-full scrollbar-track-slate-300 scrollbar-thumb-indigo-400 scrollbar-thumb-rounded-md
        ${
          !user || (pageContext.exports?.layout as any)?.__name === 'guest.layout' ? 'scrollbar-thin' : 'scrollbar-none'
        }">
        <div id="app">${stream}</div>
        <script src="/unpkg.com_@material-tailwind_html@2.0.0_scripts_ripple.js"></script>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // By default, the HTML template we provided in the `render()` hook isn't immediately written to the stream: instead,
      // `vite-plugin-ssr` awaits for your UI framework to start writing to the stream.
      // If we set `pageContext.enableEagerStreaming` to `true` then `vite-plugin-ssr` starts writing the HTML template right away.
      enableEagerStreaming: true,
    },
  };
}

/** Performs pre-rendering operations before rendering the page. */
async function onBeforeRender(pageContext: PageContextServer) {
  const { app, store } = createApp(pageContext);

  let err: unknown;
  // Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
  app.config.errorHandler = err_ => {
    err = err_;
  };

  // Render the app to a Node.js readable stream
  // The `renderToNodeStream` function renders the Vue app to a Node.js readable stream.
  // This allows for streaming the content of the app to the client, making it possible to start rendering the page on the client side while the server is still generating the remaining content.
  // Reference: https://vite-plugin-ssr.com/stream
  const stream = renderToNodeStream(app);

  const initialStoreState = store.state.value;

  if (err) throw err;

  return {
    pageContext: {
      initialStoreState,
      stream,
    },
  };
}
