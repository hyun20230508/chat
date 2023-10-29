import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import UserService from '../service/user.service';
import { Request, Response } from 'express';

const userService = container.resolve(UserService);

@singleton()
export default class UserController {
  private userService = userService;

  //유저확인
  findUser = async (req: Request, res: Response): Promise<void> => {
    const loginId: string = res.locals.user.loginId;
    if (loginId) {
      res.status(200).json({
        result: loginId,
      });
    } else {
      res.status(401).json({
        result: '로그인 상태가 아닙니다.',
      });
    }
  };

  //전체 유저 불러오기
  findAllUser = async (req: Request, res: Response): Promise<void> => {
    const id = res.locals.user.id;
    try {
      const result = await this.userService.findAllUser(id);
      res.status(result.status).json({ result: result.data });
    } catch (err) {
      res.status(400).json({ result: 'Error: 불러오기 실패' });
    }
  };

  //회원가입
  signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.userService.createUser(req.body);
      res.status(result.status).json({ result: result.data });
    } catch (err) {
      res.status(412).json({ result: 'Error: 회원가입 실패' });
    }
  };

  //로그인
  signIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.userService.signIn(req.body);
      if (result) {
        res.cookie('Authorization', result?.data, { path: '/', httpOnly: false });
        res.status(result.status).json({ token: result.data });
      } else {
        throw new Error('로그인 실패');
      }
    } catch (err) {
      res.status(401).json({ result: 'Error: 로그인 실패' });
    }
  };

  //로그아웃
  logOut = (req: Request, res: Response): void => {
    res.clearCookie('Authorization');
    res.status(201).json({
      message: '로그아웃 되었습니다.',
    });
  };
}
