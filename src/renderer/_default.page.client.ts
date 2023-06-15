export { render }
export const clientRouting = true

import { createApp } from './app'
import type { PageContextClient } from './types'

// TODO: proper typing, document how this works
let app: any;
function render(pageContext: PageContextClient) {
  if (!app) {
    const instance = createApp(pageContext)
    app = instance.app
    instance.store.state.value = pageContext.initialStoreState
    app.mount('#app')
  } else {
    app.changePage(pageContext)
  }
}
