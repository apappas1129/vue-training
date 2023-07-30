import { PageContext } from '#root/renderer/types';
import updateEntityGuard from '#root/common/auth/router-functions/update-entity.guard';
import { Subject } from '#root/common';

export const guard = async (pageContext: PageContext) => {
  const subject: Subject = await updateEntityGuard(
    {
      entity: 'subject',
      redirectTo: '/subjects',
      dataUrl: import.meta.env.VITE_WEB_API_URL + 'subjects/' + pageContext.routeParams!.id,
    },
    pageContext,
  );

  // pass prefetched data to lighten up the processing load on client side
  pageContext.pageProps = { subject };
};
