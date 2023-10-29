import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ChatAttributes, ChatCreationAttributes } from '../model.interface';

@Table
export default class Chat extends Model<ChatAttributes, ChatCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id!: number;

  @Column
  userList!: string;

  @Column
  roomNumber!: string;
}
