import { PageContext } from '#root/renderer/types';

export { onBeforeRender };

const onBeforeRender = (pageContext: PageContext) => {
  return { pageContext: {} };
};
