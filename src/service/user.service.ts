import { container, singleton } from 'tsyringe';
import UserRepository from '../repository/user.repository';
import bcrypt from 'bcrypt';
import { config } from '../config';
import auth from '../middleware/auth';
import { LoginInfo } from '../types/user';
import { ResponseData } from '../types/response';
import User from '../database/model/user.model';

const userRepository = container.resolve(UserRepository);

@singleton()
export default class UserService {
  private userRepository = userRepository;

  findAllUser = async (id: number) => {
    try {
      const findAllUserData = await this.userRepository.findAllUser(id);
      return { status: 200, data: findAllUserData };
    } catch (err) {
      return { status: 400, data: 'Error: 불러오기 실패' };
    }
  };

  signIn = async (data: LoginInfo) => {
    try {
      const { loginId, password } = data;
      const user = await this.userRepository.findByLoginId(loginId);
      const comparePassword = user.password;

      if (comparePassword) {
        const result = bcrypt.compareSync(password, comparePassword);
        if (result) {
          const token = auth.getToken(user.id, user.loginId);
          return { status: 201, data: token };
        } else {
          throw new Error('비밀번호 불일치');
        }
      }
    } catch (err) {
      return { status: 400, data: 'Error: 로그인 실패' };
    }
  };

  createUser = async (data: LoginInfo) => {
    const { loginId } = data;
    try {
      const password = bcrypt.hashSync(data.password, Number(config.bcrypt.salt));
      const createUserData = await this.userRepository.createUser(loginId, password);
      return { status: 201, data: createUserData };
    } catch (err) {
      return { status: 412, data: 'Error: 회원가입 실패' };
    }
  };
}
