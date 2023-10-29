import { Model } from 'sequelize-typescript';

export type ResponseData<T extends Model> = {
  isSuccessful: boolean;
  data: T[] | T | null;
};
