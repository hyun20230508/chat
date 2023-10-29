import userRouter from './user.routes';
import chatRouter from './chat.routes';
import friendRequestRouter from './friendRequest.routes';
import friendRouter from './friend.routes';

import { Router } from 'express';

const router = Router();

const defaultRouter = [
  {
    path: '/users',
    router: userRouter,
  },
  {
    path: '/chats',
    router: chatRouter,
  },
  {
    path: '/friendRequests',
    router: friendRequestRouter,
  },
  {
    path: '/friends',
    router: friendRouter,
  },
];

defaultRouter.forEach(item => {
  router.use(item.path, item.router);
});

export default router;
