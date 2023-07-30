// export default '/*'; // apparently this route guard does not run on the child routes like the documentation claims

import manageEntityGuard from '#root/common/auth/router-functions/manage-entity.guard';
import { PageContext } from '#root/renderer/types';

// https://vite-plugin-ssr.com/guard
export const guard = (pageContext: PageContext) => {
  const authorize = manageEntityGuard('subject');
  authorize(pageContext);
  // BUG: I'm supposed to write the entire route guard here for child routes but apparently,
  // this doesn't run on child routes like the documentation claims
};
