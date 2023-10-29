import { Router } from 'express';
import ChatController from '../controller/chat.controller';
import { container } from 'tsyringe';
import auth from '../middleware/auth';

const chatController = container.resolve(ChatController);
const chatRouter = Router();

/*
    GET '/chats' 유저 인증
*/

chatRouter.get('/', auth.verifyUser, chatController.findAllRoomList);

export default chatRouter;
