export { onBeforeRender };
import createEntityGuard from '#root/common/auth/router-functions/create-entity.guard';
const onBeforeRender = createEntityGuard('course', '/courses');
