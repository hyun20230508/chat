import { Optional } from 'sequelize';

// User
export interface UserAttributes {
  id: number;
  loginId: string;
  password: string;
  friends: number;
}

// FriendRequest
export interface FriendRequestAttributes {
  id: number;
  userId: number;
  friendId: number;
}

// Friend
export interface FriendAttributes {
  id: number;
  userId: number;
  friendId: number;
}

// Chat
export interface ChatAttributes {
  id: number;
  userList: string;
  roomNumber: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
export interface FriendRequestCreationAttributes extends Optional<FriendRequestAttributes, 'id'> {}
export interface FriendCreationAttributes extends Optional<FriendAttributes, 'id'> {}
export interface ChatCreationAttributes extends Optional<ChatAttributes, 'id'> {}
