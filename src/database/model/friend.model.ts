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
import { FriendAttributes, FriendCreationAttributes } from '../model.interface';
import User from './user.model';

@Table
export default class Friend extends Model<FriendAttributes, FriendCreationAttributes> {
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
