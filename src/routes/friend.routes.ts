import { Router } from 'express';
import FriendController from '../controller/friend.controller';
import { container } from 'tsyringe';
import auth from '../middleware/auth';

const friendController = container.resolve(FriendController);
const friendRouter = Router();

/*
    GET '/friends' 친구목록
    POST '/friends' 친구요청 수락
    DELETE '/friends' 친구삭제
*/

friendRouter.get('/', auth.verifyUser, friendController.findFriend);
friendRouter.post('/', auth.verifyUser, friendController.createFriend);
friendRouter.delete('/', auth.verifyUser, friendController.deleteFriend);

export default friendRouter;
