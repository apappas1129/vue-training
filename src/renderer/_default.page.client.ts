export { render };
export { onHydrationEnd };
export { onPageTransitionStart };
export { onPageTransitionEnd };

// enable Client-side Routing
// WARNING: Before doing so, read https://vite-plugin-ssr.com/clientRouting */
// export const clientRouting = true;
// BUG: unresolved bugs on routing functions for ClientRouting (e.g. pageContext custom fields nit available on onBeforeRender, guard, etc.)
// using default SSR for now.

// Import Tailwind directives
import './index.css';

import { createApp } from './app';
import type { PageContextClient } from './types';

let app: ReturnType<typeof createApp>['app'];
function render(pageContext: PageContextClient) {
  const { redirectTo } = pageContext;
  if (redirectTo) {
    window.location.href = redirectTo;
    return;
  }

  if (!app) {
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
