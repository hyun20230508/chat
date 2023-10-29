import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import { Request, Response } from 'express';
import RedisService from '../service/redis.service';

const redisService = container.resolve(RedisService);

@singleton()
export default class ChatController {
  private redisService = redisService;

  //방 목록 불러오기
  findAllRoomList = async (req: Request, res: Response): Promise<void> => {
    const result = await this.redisService.findAllRoomList();
    res.status(200).json({
      result,
    });
  };
}
