import can from '#root/common/auth/router-functions/can';
import { Action, Subject } from '#casl/types';

export { onBeforeRender };

const onBeforeRender = can(Action.manage, Subject.subject, '/signin');
