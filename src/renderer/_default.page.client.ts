export { render };
export { onHydrationEnd };
export { onPageTransitionStart };
export { onPageTransitionEnd };

// enable Client-side Routing
// WARNING: Before doing so, read https://vite-plugin-ssr.com/clientRouting */
export const clientRouting = true;
// BUG: unresolved bugs on routing functions for ClientRouting (e.g. pageContext custom fields not available on onBeforeRender and guard)
// using default SSR for now.

// Import Tailwind directives
import './index.css';

import { createApp } from './app';
import type { PageContextServer } from './types';
import type {
  // When using Client Routing https://vite-plugin-ssr.com/clientRouting
  // PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient
  // When using Server Routing
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
} from 'vite-plugin-ssr/types';

let app: ReturnType<typeof createApp>['app'];
function render(pageContext: PageContextBuiltInClient & PageContextServer) {
  const { redirectTo } = pageContext;
  if (redirectTo) {
    window.location.href = redirectTo;
    return;
  }

  console.log('Application:', app);
  // NOTE: As far as I can observe, the app instance only persists on ClientRouting mode.
  //       In ServerRouting mode, app is always undefined and recreated every navigation, which makes a new pinia store.
  //       I am not sure yet if this is normal and that there is no way around this but to use localStorage to rehydrate current store upon navigation
  //       with the last state before navigation.
  if (!app) {
    console.log('Creating fresh app instance');
    const instance = createApp(pageContext);
    app = instance.app;
    instance.store.state.value = pageContext.initialStoreState;
    app.mount('#app');
  } else {
    app.changePage(pageContext);
  }
}

// Reference: https://github.com/brillout/vite-plugin-ssr/blob/main/examples/vue-full/renderer/_default.page.client.ts

// #region TODO: apply
function onHydrationEnd() {
  console.log('Hydration finished; page is now interactive.');
}
function onPageTransitionStart() {
  console.log('Page transition start');
  document.querySelector('.content')?.classList.add('page-transition');
}
function onPageTransitionEnd() {
  console.log('Page transition end');
  document.querySelector('.content')?.classList.remove('page-transition');
}
// #endregion TODO: apply
