import { singleton } from 'tsyringe';
import dbConnector from '../database/sequlize.config';
import Friend from '../database/model/friend.model';
import User from '../database/model/user.model';

@singleton()
export default class FriendRepository {
  private friendRepository = dbConnector.sequlize.getRepository(Friend);

  createFriend = async (userId: number, friendId: number): Promise<Friend> => {
    try {
      const Adata = await this.friendRepository.create({
        userId,
        friendId,
      });

      const Bdata = await this.friendRepository.create({
        userId: friendId,
        friendId: userId,
      });

      return Adata;
    } catch (err) {
      throw new Error('Repository Error');
    }
  };

  findFriend = async (userId: number): Promise<Friend[]> => {
    try {
      const data = await this.friendRepository.findAll({
        include: [
          {
            model: User,
            attributes: ['loginId'],
          },
        ],
        where: { friendId: userId },
        order: ['createdAt'],
      });

      return data;
    } catch (err) {
      throw new Error('Repository Error');
    }
  };

  checkFriend = async (userId: number, friendId: number): Promise<Friend[]> => {
    try {
      const data = await this.friendRepository.findAll({
        where: {
          userId,
          friendId,
        },
      });

      return data;
    } catch (err) {
      throw new Error('Repository Error');
    }
  };

  deleteFriend = async (userId: number, friendId: number): Promise<number> => {
    try {
      const aData = await this.friendRepository.destroy({
        where: {
          userId,
          friendId,
        },
      });

      await this.friendRepository.destroy({
        where: {
          userId: friendId,
          friendId: userId,
        },
      });

      return aData;
    } catch (err) {
      throw new Error('Repository Error');
    }
  };
}
