import { container, singleton } from 'tsyringe';
import FriendRequestRepository from '../repository/friendRequest.repository';
import { friendInfo } from '../types/friend';

const friendRequestRepository = container.resolve(FriendRequestRepository);

@singleton()
export default class FriendRequestService {
  private friendRequestRepository = friendRequestRepository;

  createFriendRequest = async (data: friendInfo) => {
    const { userId, friendId } = data;
    try {
      const createFriendRequestData = await this.friendRequestRepository.createFriendRequest(userId, friendId);
      return { status: 201, data: createFriendRequestData };
    } catch (err) {
      return { status: 400, data: 'Error: 친구요청 실패' };
    }
  };

  deleteFriendRequest = async (data: friendInfo) => {
    const { userId, friendId } = data;
    try {
      const deleteFriendData = await this.friendRequestRepository.deleteFriendRequest(userId, friendId);
      return { status: 201, data: deleteFriendData };
    } catch (err) {
      return { status: 400, data: 'Error: 친구요청 거절 처리 실패' };
    }
  };

  findFriendRequest = async (userId: number) => {
    try {
      const findFriendRequestData = await this.friendRequestRepository.findFriendRequest(userId);
      return { status: 200, data: findFriendRequestData };
    } catch (err) {
      return { status: 400, data: 'Error: 불러오기 실패' };
    }
  };

  checkFriendRequest = async (data: friendInfo) => {
    const { userId, friendId } = data;
    try {
      const checkFriendRequestData = await this.friendRequestRepository.checkFriendRequest(userId, friendId);
      return checkFriendRequestData;
    } catch (err) {
      return { status: 400, data: 'Error: 친구요청 실패' };
    }
  };
}
