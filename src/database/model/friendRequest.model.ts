import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { FriendRequestAttributes, FriendRequestCreationAttributes } from '../model.interface';
import User from './user.model';

@Table
export default class FriendRequest extends Model<FriendRequestAttributes, FriendRequestCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @AllowNull(false)
  @Column
  friendId!: number;

  @BelongsTo(() => User)
  user!: User;
}
