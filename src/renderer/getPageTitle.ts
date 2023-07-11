import { PageContext } from './types';

export { getPageTitle };

/** Refer to [vite-plugin-ssr
Custom Exports/Hooks](https://vite-plugin-ssr.com/exports) to set title via `.page.js` (for static titles)/`.page.server.js`. (for dynamic titles) */
function getPageTitle(pageContext: PageContext): string {
  const title =
    // For static titles (defined in the `export { documentProps }` of the page's `.page.js`)
    (pageContext.exports.documentProps || {}).title ||
    // For dynamic titles (defined in the `export addContextProps()` of the page's `.page.server.js`)
    // e.g. Course details page can use the course title instead of a static title "Course Details".
    (pageContext.documentProps || {}).title ||
    'Demo';
  return title;
}
