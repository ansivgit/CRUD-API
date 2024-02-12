import process from 'process';
import { NewUser, User } from './users-types';
import users from '../data/users.json';

export class DbService {
  list: User[] | [];

  constructor() {
    this.list = users || [];
    process.on('message', (data: []) => {
      this.list = data;
    });
  }

  sendList() {
    process.send && process.send(this.list);
  }

  async getUsersList(): Promise<User[] | []> {
    this.sendList();
    return this.list;
  }

  async getUserById(id: string): Promise<User | null> {
    const user: User | undefined = this.list.find((user) => user?.id === id);
    this.sendList();
    return user || null;
  }

  async createUser(user: User): Promise<User> {
    // @ts-ignore
    this.list.push(user);
    this.sendList();
    return user;
  }

  async updateUser(updatedUser: User): Promise<User> {
    const user = this.getUserById(updatedUser.id);
    const newList = this.list.filter((user) => user.id !== updatedUser.id);
    this.list = [...newList, updatedUser];
    this.sendList();
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<string> {
    const newList = this.list.filter((user) => user.id !== userId);
    this.list = newList;
    this.sendList();
    return `Entity id = ${userId} is deleted`;
  }
};
