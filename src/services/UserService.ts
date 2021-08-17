import { getRepository, Repository } from 'typeorm';
import { User } from '@models/User';

class UserService {
  async getUsers() {
    const userRepository: Repository<User> = getRepository(User);
    const users: User[] = await userRepository.find();

    return users;
  }

  async getUser(userId: string) {
    const userRepository: Repository<User> = getRepository(User);
    const user: User = await userRepository.findOne(userId);

    return user;
  }
}

export default new UserService();