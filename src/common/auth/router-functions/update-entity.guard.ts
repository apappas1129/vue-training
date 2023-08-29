import { RenderErrorPage } from 'vite-plugin-ssr/RenderErrorPage';
import { FetchOptions, ofetch } from 'ofetch';
import { subject as subjectHelper, createMongoAbility } from '@casl/ability';
import { unpackRules } from '@casl/ability/extra';
import { PageContext } from '#root/renderer/types';
import { Subject } from '#casl/types';

export default async function updateEntityGuard(
  { entity, dataUrl, redirectTo }: { entity: `${Subject}`; redirectTo: string; dataUrl: string },
  pageContext: PageContext,
) {
  if (!pageContext.ability) {
    throw RenderErrorPage({ pageContext: { redirectTo: '/signin' } });
  }

  const unpackedRules = unpackRules(pageContext.ability);
  const ability = createMongoAbility(unpackedRules as any);
  if (!ability) {
    throw RenderErrorPage({ pageContext: { redirectTo } });
  }

  const options: FetchOptions = {};
  if (pageContext.headers?.cookie) {
    options.headers = { cookie: pageContext.headers.cookie };
    options.credentials = 'include';
  }

  try {
    const data = await ofetch(dataUrl, options);

    if (!ability.can('update', subjectHelper(entity, data))) {
      throw RenderErrorPage({ pageContext: { redirectTo } });
    }

    return data;
  } catch (err) {
    console.log('Error fetching for subject', err);
    throw RenderErrorPage({ pageContext: { redirectTo } });
  }
}
