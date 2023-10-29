import { singleton } from 'tsyringe';
import { config } from '../config';
import * as redis from 'redis';
import { ChatUser } from '../types/redis';
import { RoomData } from '../types/redis';

@singleton()
export default class RedisService {
  private client = redis.createClient({ url: config.redis.url });
  private roomList: Array<RoomData>;

  constructor() {
    this.roomList = [];
  }

  connectRedis = async () => {
    await this.client.connect();
    return;
  };

  findAllRoomList = async () => {
    this.roomList = [];
    const keys = await this.client.keys('room:*');
    for (let i = 0; i < keys.length; i++) {
      const value = await this.client.get(keys[i]);
      if (value) {
        const roomData: RoomData = {
          participants: value.split(',').length - 1,
          room: Number(keys[i].replace('room:', '')),
        };
        this.roomList.push(roomData);
      } else {
        const roomData: RoomData = { participants: 0, room: Number(keys[i].replace('room:', '')) };
        this.roomList.push(roomData);
      }
    }
    return this.roomList;
  };

  findRoom = async (data: ChatUser) => {
    const userList: string | null = await this.client.get(`${data.room}`);
    return userList;
  };

  setRoom = async (data: ChatUser) => {
    await this.client.set(`${data.room}`, `${data.name},`);
    return;
  };

  updateRoom = async (data: ChatUser) => {
    await this.client.set(`${data.room}`, `${data.userList}`);
    if (data.room.includes('dm:')) {
      const roomData = await this.findRoom(data);
      if (roomData === '') {
        await this.client.del(`${data.room}`);
      }
      return;
    }
    return;
  };
}
