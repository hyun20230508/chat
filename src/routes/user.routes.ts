import { Router } from 'express';
import UserController from '../controller/user.controller';
import { container } from 'tsyringe';
import auth from '../middleware/auth';
import validator from '../middleware/validate';

const usercontroller = container.resolve(UserController);
const userRouter = Router();

/*
    GET '/users' 유저 인증
    GET '/users/list' 전체 유저 목록
    POST '/users/signup' 회원가입
    POST '/users/signin' 로그인
    POST '/users/logout' 로그아웃
*/

userRouter.get('/', auth.verifyUser, usercontroller.findUser);
userRouter.get('/list', auth.verifyUser, usercontroller.findAllUser);
userRouter.post('/signup', validator.sign, usercontroller.signUp);
userRouter.post('/signin', validator.sign, usercontroller.signIn);
userRouter.post('/logout', usercontroller.logOut);

export default userRouter;
