import http from 'http';
import * as dotenv from 'dotenv';
import { UsersController } from './users-controller';
import { getUserIdFromUrl } from './helpers';

dotenv.config();

const PORT = process.env.DEV_PORT || '4000';
const ROOT_PATH = process.env.USERS_ROOT_PATH || '/api/users';

const usersController = new UsersController();

const server = http.createServer((req: any, res: any) => {
  if (!req.url.includes(ROOT_PATH)) {
    res.statusCode = 404;
    res.end('Incorrect endpoint');
  }

  else if (!getUserIdFromUrl(req.url) && req.url !== ROOT_PATH) {
    res.statusCode = 400;
    res.end('Sorry, incorrect ID');
  }

  if (req.url === ROOT_PATH && req.method === 'GET') {
    usersController.getUsersList(req, res);
  }
  else if (req.method === 'GET') {
    usersController.getUserById(req, res);
  }
  else if (req.url === ROOT_PATH && req.method === 'POST') {
    usersController.createUser(req, res);
  }
  else if (req.method === 'PUT') {
    usersController.updateUser(req, res);
  }
  else if (req.method === 'DELETE') {
    usersController.deleteUser(req, res);
  }
  else {
    res.statusCode = 404;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Incorrect URL');
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
