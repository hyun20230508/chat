import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table, Unique, HasMany } from 'sequelize-typescript';
import { UserAttributes, UserCreationAttributes } from '../model.interface';
import FriendRequest from './friendRequest.model';
import Friend from './friend.model';

@Table
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id!: number;

  @AllowNull(false)
  @Unique
  @Column
  loginId!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @Column
  friends!: number;

  @HasMany(() => FriendRequest)
  friendRequest!: FriendRequest[];

  @HasMany(() => Friend)
  friend!: Friend[];
}
