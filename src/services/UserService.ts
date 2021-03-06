import { getConnection, Connection, getRepository, Repository, QueryRunner } from "typeorm";
import { User } from "@models/User";
import { IUser } from "./../interfaces";
import { sign, verify } from "jsonwebtoken";

class UserService {
  async getUsers() {
    const userRepository: Repository<User> = getRepository(User);
    const usersData: User[] = await userRepository.find({ order: { id: "ASC" } });

    const users = usersData.map((data) => {
      delete data.password;
      return data;
    });

    return users;
  }

  async getUser(userId: string) {
    const userRepository: Repository<User> = getRepository(User);
    const user: User = await userRepository.findOne(userId);

    delete user.password;

    return user;
  }

  async addUser(userData: IUser) {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const userRepository: Repository<User> = getRepository(User);
      const user: User = userRepository.create(userData);

      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      delete user.password;

      return user;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async updateUser(userId: string, { name, email, password, homeTeam, age, height }: IUser) {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const userRepository: Repository<User> = getRepository(User);
      const userEntity = new User();

      userEntity.name = name;
      userEntity.email = email;
      userEntity.homeTeam = homeTeam;
      userEntity.age = age;
      userEntity.height = height;

      const userData = await userRepository.findOne(userId);
      const isEquals = await userData.comparePassword(password);

      if (!isEquals) userEntity.password = password;

      await userRepository.update(userId, userEntity);

      await queryRunner.commitTransaction();

      const user: User = await this.getUser(userId);

      delete user.password;

      return user;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async deleteUser(userId: string) {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      const userRepository: Repository<User> = getRepository(User);

      await userRepository.delete(userId);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      const userRepository: Repository<User> = getRepository(User);

      const user = await userRepository.findOne({ email });

      if (!user) return null;

      const isEquals = user.comparePassword(password);

      if (!isEquals) return null;

      const token = sign({ id: user.id }, process.env.JWT_TOKEN);

      return token;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async getProfile(token: string) {
    try {
      const userRepository: Repository<User> = getRepository(User);

      const payload = verify(token, process.env.JWT_TOKEN);

      const user: User = await userRepository.findOne((<any>payload).id);

      delete user.password;

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new UserService();
