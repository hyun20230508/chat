import { singleton } from 'tsyringe';
import dbConnector from '../database/sequlize.config';
import FriendRequest from '../database/model/friendRequest.model';
import User from '../database/model/user.model';
import { Transaction } from 'sequelize';

@singleton()
export default class FriendRequestRepository {
  private friendRequestRepository = dbConnector.sequlize.getRepository(FriendRequest);

  createFriendRequest = async (userId: number, friendId: number): Promise<FriendRequest> => {
    try {
      const data = await this.friendRequestRepository.create({
        userId,
        friendId,
      });

      return data;
    } catch (err) {
      throw new Error('Repository Error');
    }
  };

  findFriendRequest = async (userId: number): Promise<FriendRequest[]> => {
    try {
      const data = await this.friendRequestRepository.findAll({
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

  checkFriendRequest = async (userId: number, friendId: number): Promise<FriendRequest[]> => {
    try {
      const data = await this.friendRequestRepository.findAll({
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

  deleteFriendRequest = async (userId: number, friendId: number): Promise<number> => {
    try {
      const data = await this.friendRequestRepository.destroy({
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
}
