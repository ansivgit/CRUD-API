import usersService from './users-service';
import { getUserIdFromUrl, getPostData } from './helpers';
import { User, NewUser } from './users-types';

export class UsersController {
  constructor() { }

  // GET /users
  async getUsersList(_: any, res: any): Promise<void> {
    try {
      const usersList: User[] = await usersService.getUsersList();

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.write(JSON.stringify(usersList));
      res.end();
    }
    catch (err: any) {
      console.log(err);
      res.end();
    }
  }

  // GET /users/:id
  async getUserById(req: any, res: any): Promise<void> {
    try {
      const userId: string = getUserIdFromUrl(req.url);
      console.log(555, userId);

      const user: User = await usersService.getUserById(userId);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.write(JSON.stringify(user));
      res.end();
    }
    catch (err: any) {
      res.statusCode = err.cause;
      res.end(err.message);
    }
  };

  // POST /users
  async createUser(req: any, res: any): Promise<void> {
    try {
      const newUserData: NewUser = await getPostData(req);
      const user: User = await usersService.createUser(newUserData);

      res.statusCode = 201;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`User created! ${JSON.stringify(user)}`);
    }
    catch (err: any) {
      res.statusCode = err.cause;
      res.end(err.message);
    }
  };

  // PUT /users/:id
  async updateUser(req: any, res: any): Promise<void> {
    try {
      const userId: string = getUserIdFromUrl(req.url);
      const newUserData: NewUser = await getPostData(req);

      const user: User = await usersService.updateUser(userId, newUserData);

      console.log(222, user);


      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`User ${userId} updated! ${JSON.stringify(user)}`);
    }
    catch (err: any) {
      res.statusCode = err.cause;
      res.end(err.message);
    }
  };

  // DELETE /users/:id
  async deleteUser(req: any, res: any): Promise<void> {
    try {
      const userId: string = getUserIdFromUrl(req.url);
      await usersService.deleteUser(userId);

      res.statusCode = 204;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`User ${userId} deleted!`);
    }
    catch (err: any) {
      res.statusCode = err.cause;
      res.end(err.message);
    }
  };
};
