import cron from 'node-cron';
import UserRepository from '../repository/user.repository';
import { container } from 'tsyringe';

const userRepository = container.resolve(UserRepository);

function updateFriends() {
  cron.schedule('0 0 */1 * * *', async () => {
    const data = await userRepository.updateFriends();
  });
}

export default updateFriends;
