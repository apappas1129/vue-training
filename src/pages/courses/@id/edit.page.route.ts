import { PageContext } from '#root/renderer/types';
import updateEntityGuard from '#root/common/auth/router-functions/update-entity.guard';
import { Course } from '#root/common';

export const guard = async (pageContext: PageContext) => {
  const course: Course = await updateEntityGuard(
    {
      entity: 'course',
      redirectTo: '/courses',
      dataUrl: import.meta.env.VITE_WEB_API_URL + 'courses/' + pageContext.routeParams!.id,
    },
    pageContext,
  );

  console.log('UPDATE COURSE', course);

  // pass prefetched data to lighten up the processing load on client side
  pageContext.pageProps = { course };
};
