import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import FriendService from '../service/friend.service';
import { Request, Response } from 'express';
import { friendInfo } from '../types/friend';

const friendService = container.resolve(FriendService);

@singleton()
export default class FriendController {
  private friendService = friendService;

  //친구 수락
  createFriend = async (req: Request, res: Response): Promise<void> => {
    const userId: number = req.body.userId;
    const friendId: number = res.locals.user.id;
    const data: friendInfo = {
      userId,
      friendId,
    };
    try {
      const checkFriendData: any = await this.friendService.checkFriend(data);
      if (checkFriendData[0] === undefined) {
        const result = await this.friendService.createFriend(data);
        res.status(result.status).json({ result: result.data });
      } else {
        res.status(400).json({ result: 'Error: 이미 친구 상태인 유저입니다.' });
      }
    } catch (err) {
      res.status(400).json({ result: 'Error: 친구요청 승인 처리 실패' });
    }
  };

  //친구 목록 불러오기
  findFriend = async (req: Request, res: Response): Promise<void> => {
    const userId: number = res.locals.user.id;
    try {
      const result = await this.friendService.findFriend(userId);
      res.status(result.status).json({ result: result.data });
    } catch (err) {
      res.status(400).json({ result: 'Error: 불러오기 실패' });
    }
  };

  //친구 삭제
  deleteFriend = async (req: Request, res: Response): Promise<void> => {
    const userId: number = res.locals.user.id;
    const friendId: number = req.body.friendId;
    const data: friendInfo = {
      userId,
      friendId,
    };
    try {
      const result = await this.friendService.deleteFriend(data);
      res.status(result.status).json({ result: result.data });
    } catch (err) {
      res.status(400).json({ result: 'Error: 불러오기 실패' });
    }
  };
}
