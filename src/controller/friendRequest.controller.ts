import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import FriendRequestService from '../service/friendRequest.service';
import { Request, Response } from 'express';
import { friendInfo } from '../types/friend';

const friendRequestService = container.resolve(FriendRequestService);

@singleton()
export default class FriendRequestController {
  private friendRequestService = friendRequestService;

  //친구요청
  createFriendRequest = async (req: Request, res: Response): Promise<void> => {
    const userId: number = res.locals.user.id;
    const friendId: number = req.body.friendId;
    const data: friendInfo = {
      userId,
      friendId,
    };
    try {
      const checkFriendRequestData: any = await this.friendRequestService.checkFriendRequest(data);
      if (checkFriendRequestData[0] === undefined) {
        const result = await this.friendRequestService.createFriendRequest(data);
        res.status(result.status).json({ result: result.data });
      } else {
        res.status(400).json({ result: 'Error: 이미 친구요청을 보낸 유저입니다.' });
      }
    } catch (err) {
      res.status(400).json({ result: 'Error: 친구요청 실패' });
    }
  };

  //친구 요청 목록
  findFriendRequest = async (req: Request, res: Response): Promise<void> => {
    const userId: number = res.locals.user.id;
    try {
      const result = await this.friendRequestService.findFriendRequest(userId);
      res.status(result.status).json({ result: result.data });
    } catch (err) {
      res.status(400).json({ result: 'Error: 불러오기 실패' });
    }
  };

  //친구 요청 거절
  refuseFriend = async (req: Request, res: Response): Promise<void> => {
    const userId: number = req.body.userId;
    const friendId: number = res.locals.user.id;
    const data: friendInfo = {
      userId,
      friendId,
    };
    try {
      const result = await this.friendRequestService.deleteFriendRequest(data);
      res.status(result.status).json({ result: result.data });
    } catch (err) {
      res.status(400).json({ result: 'Error: 친구요청 거절 처리 실패' });
    }
  };
}
