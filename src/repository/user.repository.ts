import { singleton } from 'tsyringe';
import dbConnector from '../database/sequlize.config';
import User from '../database/model/user.model';
import { QueryTypes } from 'sequelize';

@singleton()
export default class UserRepository {
  private userRepository = dbConnector.sequlize.getRepository(User);

  findAllUser = async (id: number) => {
    try {
      const query = `SELECT * FROM Users u2
        WHERE u2.id NOT IN (SELECT f.friendId FROM Users u
        left JOIN Friends f 
        ON u.id = f.userId 
        WHERE f.userId = ${id})`;
      const userList = await this.userRepository.sequelize?.query(query, { type: QueryTypes.SELECT });
      return userList;
    } catch (err) {
      throw new Error('Repository Error');
    }
  };

  createUser = async (loginId: string, password: string): Promise<User> => {
    try {
      const data = await User.create({
        loginId,
        password,
        friends: 0,
      });

      return data;
    } catch (err) {
      throw new Error('Repository Error');
    }
  };

  addFriend = async (userId: number, friendId: number): Promise<any> => {
    try {
      const query = `UPDATE Users SET friends = friends + 1 WHERE id IN (${userId}, ${friendId})`;
      const data = await this.userRepository.sequelize?.query(query);
      return data;
    } catch (err) {
      throw new Error('Repository Error');
    }
  };

  subFriend = async (userId: number, friendId: number): Promise<any> => {
    try {
      const query = `UPDATE Users SET friends = friends - 1 WHERE id IN (${userId}, ${friendId})`;
      const data = await this.userRepository.sequelize?.query(query);
      return data;
    } catch (err) {
      throw new Error('Repository Error');
    }
  };

  findByLoginId = async (loginId: string): Promise<User> => {
    try {
      const user = await this.userRepository.findOne({ where: { loginId } });
      if (user) {
        return user;
      } else {
        throw new Error('Repository Error');
      }
    } catch (err) {
      throw new Error('Repository Error');
    }
  };

  updateFriends = async () => {
    try {
      const query = `UPDATE Users u
      SET friends = (
          SELECT COUNT(*) 
          FROM Friends f
          WHERE u.id = f.userId
      )`;
      const data = await this.userRepository.sequelize?.query(query);
      return data;
    } catch (err) {
      throw new Error('Repository Error');
    }
  };
}
