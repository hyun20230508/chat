export type ChatUser = {
  name: string;
  room: string;
  userList?: string;
};

export type RoomData = {
  participants: number;
  room: number;
};
