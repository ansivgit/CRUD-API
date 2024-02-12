import * as UserService from './users-service';
import { getUserIdFromUrl, getPostData } from './helpers';
import { User, NewUser } from './users-types';

// GET /users
export const getUsersList = async (_: any, res: any): Promise<void> => {
  try {
    const usersList: User[] = await UserService.getUsersList();
    console.log(usersList);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(JSON.stringify(usersList));
    res.end();
  }
  catch (err: any) {
    console.log(err);
    res.end();
  }
};

// GET /users/:id
export const getUserById = async (req: any, res: any): Promise<void> => {
  try {
    const userId: string = getUserIdFromUrl(req.url);
    const user: User = await UserService.getUserById(userId);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(JSON.stringify(user));
    res.end();
  }
  catch (err: any) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    console.log(err);
    res.end('User not found');
  }
};

// POST /users
export const createUser = async (req: any, res: any): Promise<void> => {
  try {
    const newUser: NewUser = await getPostData(req);
    await UserService.createUser(newUser);

    res.statusCode = 201;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`User created! ${JSON.stringify(newUser)}`);
  }
  catch (err: any) {
    console.log(err);
    res.end();
  }
};

// PATCH /users/:id
export const updateUser = async (req: any, res: any): Promise<void> => {
  try {
    const userId: string = getUserIdFromUrl(req.url);
    const newUserData: NewUser = await getPostData(req);

    await UserService.updateUser(userId, newUserData);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`User ${userId} updated! ${JSON.stringify(newUserData)}`);
  }
  catch (err: any) {
    console.log(err);
    res.end();
  }
};

// DELETE /users/:id
export const deleteUser = async (req: any, res: any): Promise<void> => {
  try {
    const userId: string = getUserIdFromUrl(req.url);
    await UserService.deleteUser(userId);

    res.statusCode = 204;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`User ${userId} deleted!`);
  }
  catch (err: any) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    console.log(err);
    res.end('User not found');
  }
};
