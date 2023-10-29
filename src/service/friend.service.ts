import { container, singleton } from 'tsyringe';
import FriendRepository from '../repository/friend.repository';
import FriendRequestService from './friendRequest.service';
import UserRepository from '../repository/user.repository';
import { friendInfo } from '../types/friend';

const friendRepository = container.resolve(FriendRepository);
const friendRequestService = container.resolve(FriendRequestService);
const uerRepository = container.resolve(UserRepository);

@singleton()
export default class FriendService {
  private friendRepository = friendRepository;
  private friendRequestService = friendRequestService;
  private uerRepository = uerRepository;

  createFriend = async (data: friendInfo) => {
    const { userId, friendId } = data;
    try {
      await this.friendRequestService.deleteFriendRequest(data);
      await this.uerRepository.addFriend(userId, friendId);
      const createFriendData = await this.friendRepository.createFriend(userId, friendId);
      return { status: 201, data: createFriendData };
    } catch (err) {
      return { status: 400, data: 'Error: 친구요청 승인 처리 실패' };
    }
  };

  findFriend = async (userId: number) => {
    try {
      const findFriendData = await this.friendRepository.findFriend(userId);
      return { status: 200, data: findFriendData };
    } catch (err) {
      return { status: 400, data: 'Error: 불러오기 실패' };
    }
  };

  checkFriend = async (data: friendInfo) => {
    const { userId, friendId } = data;
    try {
      const checkFriendData = await this.friendRepository.checkFriend(userId, friendId);
      return checkFriendData;
    } catch (err) {
      return { status: 400, data: 'Error: 친구요청 승인 처리 실패' };
    }
  };

  deleteFriend = async (data: friendInfo) => {
    const { userId, friendId } = data;
    try {
      await this.uerRepository.subFriend(userId, friendId);
      const deleteFriendData = await this.friendRepository.deleteFriend(userId, friendId);
      if (deleteFriendData === 1) {
        return { status: 201, data: '친구 삭제 성공' };
      } else {
        return { status: 400, data: '이미 삭제된 친구이거나 잘못된 접근입니다.' };
      }
    } catch (err) {
      return { status: 400, data: 'Error: 친구요청 승인 처리 실패' };
    }
  };
}
