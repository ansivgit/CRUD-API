import { v4 } from 'uuid';
import { NewUser, User } from './users-types';
import users from '../data/users.json';

export const getUsersList = async (): Promise<User[] | []> => users || [];

export const getUserById = async (userId: string): Promise<User> => {
  if (!userId) {
    throw new Error('Sorry, incorrect ID!', { cause: 400 });
  }

  const userById = users.find((user) => user.id === userId);

  if (!userById) {
    throw new Error('Sorry, user not found!', { cause: 404 });
  }
  return userById;
};

export const createUser = async (user: NewUser): Promise<void> => {
  const userId: string = v4();
  const { name, age, hobbies } = user;

  const newUser: User = { id: userId, name, age, hobbies };
  users.push(newUser);
};

export const updateUser = async (userId: string, newUserData: Record<string, string | number>): Promise<User> => {
  const updatedUser: User = await getUserById(userId);

  for (const userProp in newUserData) {
    if (updatedUser[userProp] !== newUserData[userProp]) {
      updatedUser[userProp] = newUserData[userProp];
    }
  }

  return updatedUser;
};

export const deleteUser = async (userId: string): Promise<void> => {
  const deletedUser: User = await getUserById(userId);

  [...users].splice(users.indexOf(deletedUser), 1);
};
