import { v4 } from 'uuid';
import { NewUser, User } from './users-types';
import { DbService } from './db-service';
import { getUserIdFromUrl, getPostData, validateNewUserData } from './helpers';
import users from '../data/users.json';

class UsersService {
  dbService;

  constructor() {
    this.dbService = new DbService();
  }

  async getUsersList(): Promise<User[] | []> {
    return await this.dbService.getUsersList();
  }

  async getUserById(userId: string): Promise<User> {
    if (!userId) {
      throw new Error('Sorry, incorrect ID!', { cause: 400 });
    }

    const userById: User | null = await this.dbService.getUserById(userId);
    if (!userById) {
      throw new Error('Sorry, user not found!', { cause: 404 });
    }

    return userById;
  };

  async createUser(userData: NewUser): Promise<User> {
    await validateNewUserData(userData);

    const userId: string = v4();
    const { name, age, hobbies } = userData;

    const newUser: User = { id: userId, name, age, hobbies };

    return await this.dbService.createUser(newUser);
  };

  async updateUser(userId: string, newUserData: Record<string, string | number>): Promise<User> {
    const updatedUser: User = await this.getUserById(userId);

    await validateNewUserData(newUserData);

    for (const userProp in newUserData) {
      if (updatedUser[userProp] !== newUserData[userProp]) {
        updatedUser[userProp] = newUserData[userProp];
      }
    }

    return await this.dbService.updateUser(updatedUser);
  };

  async deleteUser(userId: string): Promise<string> {
    const deletedUser: User = await this.getUserById(userId);

    return await this.dbService.deleteUser(userId);
  };
};

export default new UsersService();
