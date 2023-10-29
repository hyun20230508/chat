import { Sequelize } from 'sequelize-typescript';
import { config } from '../config';
import User from './model/user.model';
import FriendRequest from './model/friendRequest.model';
import Friend from './model/friend.model';

class DBConnector {
  public sequlize = new Sequelize({
    dialect: 'mysql',
    database: config.db.database,
    host: config.db.host,
    password: config.db.password,
    username: config.db.username,
    models: [User, FriendRequest, Friend],
    logging: false,
  });

  async initDB() {
    await this.sequlize.sync().then(() => {
      console.log('DB 연결 성공');
    });
  }
}
const dbConnector = new DBConnector();

export default dbConnector;
