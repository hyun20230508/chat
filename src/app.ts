import express from 'express';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { config } from './config';
import dbConnector from './database/sequlize.config';
import router from './routes';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import RedisService from './service/redis.service';
import { container } from 'tsyringe';
import updateFriends from './cron/cron.service';

const redisService = container.resolve(RedisService);

export default class ExpressApp {
  private app = express();
  private db = dbConnector;
  private server: http.Server;
  private io: Server;
  private redisService = redisService;
  private updateFriends = updateFriends;

  constructor() {
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);
  }

  async serverSetUp() {
    await this.redisService.connectRedis();

    this.app.use(express.static('assets'));
    this.app.use(express.static(path.join(__dirname, 'assets')));
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use('/', router);

    this.io.on('connection', socket => {
      socket.on('joinRoom', async data => {
        await socket.join(`${data.room}`);

        let userList = await this.redisService.findRoom(data);

        if (userList === '' || userList === null) {
          await this.redisService.setRoom(data);

          this.io.to(`${data.room}`).emit('userJoined', data.name);
          this.io.to(`${data.room}`).emit('changeUserList', `${data.name},`);
        } else {
          userList = userList.replace(`${data.name},`, '') + `${data.name},`;

          const updateData = {
            name: data.name,
            room: data.room,
            userList,
          };

          await this.redisService.updateRoom(updateData);
          this.io.to(`${data.room}`).emit('userJoined', data.name);
          this.io.to(`${data.room}`).emit('changeUserList', userList);
        }
      });

      socket.on('sendMessage', data => {
        this.io.to(`${data.room}`).emit('receiveMessage', data);
      });

      socket.on('leaveRoom', async data => {
        let userList = await this.redisService.findRoom(data);

        if (userList !== null) {
          userList = userList.replace(`${data.name},`, '');

          const updateData = {
            name: data.name,
            room: data.room,
            userList,
          };

          await this.redisService.updateRoom(updateData);

          this.io.to(`${data.room}`).emit('leaveMessage', data.name);
          this.io.to(`${data.room}`).emit('changeUserList', userList);
          socket.leave(data.room);
        }
      });
    });
  }

  runServer() {
    this.db.initDB();
    this.server.listen(config.server.port, () => {
      console.log(`Server is running on ${config.server.port}, http://localhost:${config.server.port}`);
    });
    this.updateFriends();
  }
}
