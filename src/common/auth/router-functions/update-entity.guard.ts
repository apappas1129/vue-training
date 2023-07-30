import { PageContext } from '#root/renderer/types';
import { Subject } from '../../../../casl/types';
import manageEntityGuard from './manage-entity.guard';
import { RenderErrorPage } from 'vite-plugin-ssr/RenderErrorPage';
import { FetchOptions, ofetch } from 'ofetch';
import { subject as subjectHelper } from '@casl/ability';

export default async function updateEntityGuard(
  { entity, dataUrl, redirectTo }: { entity: `${Subject}`; redirectTo: string; dataUrl: string },
  pageContext: PageContext,
) {
  const authorize = manageEntityGuard(entity);
  const ability = authorize(pageContext);

  if (!ability) {
    throw RenderErrorPage({ pageContext: { redirectTo } });
  }

  const options: FetchOptions = {};
  let data;
  if (pageContext.headers?.cookie) {
    options.headers = { cookie: pageContext.headers.cookie };
    options.credentials = 'include';
  }
  try {
    data = await ofetch(dataUrl, options);

    if (!ability.can('update', subjectHelper(entity, data))) {
      throw RenderErrorPage({ pageContext: { redirectTo } });
    }
  } catch (err) {
    console.log('Error fetching for subject', err);
    throw RenderErrorPage({ pageContext: { redirectTo } });
  }

  return data;
}
