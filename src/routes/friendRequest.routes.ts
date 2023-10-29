import { Router } from 'express';
import FriendRequestController from '../controller/friendRequest.controller';
import { container } from 'tsyringe';
import auth from '../middleware/auth';

const friendRequestController = container.resolve(FriendRequestController);
const friendRequestRouter = Router();

/*
    GET '/friendRequests' 친구요청 목록
    POST '/friendRequests' 친구요청
    DELETE '/friendRequests' 친구요청 거절
*/

friendRequestRouter.get('/', auth.verifyUser, friendRequestController.findFriendRequest);
friendRequestRouter.post('/', auth.verifyUser, friendRequestController.createFriendRequest);
friendRequestRouter.delete('/', auth.verifyUser, friendRequestController.refuseFriend);

export default friendRequestRouter;
