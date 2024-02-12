import http from 'http';
import * as dotenv from 'dotenv';
import * as UsersController from './users-controller';
import { getUserIdFromUrl } from './helpers';

dotenv.config();

const PORT = process.env.DEV_PORT || '4000';
const ROOT_PATH = process.env.USERS_ROOT_PATH || '/api/users';

const server = http.createServer((req: any, res: any) => {
  if (!req.url.includes(ROOT_PATH)) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Try another API');
  }

  if (req.url === ROOT_PATH && req.method === 'GET') {
    UsersController.getUsersList(req, res);
  }
  else if (getUserIdFromUrl(req.url) && req.method === 'GET') {
    UsersController.getUserById(req, res);
  }
  else if (req.url === ROOT_PATH && req.method === 'POST') {
    UsersController.createUser(req, res);
  }
  else if (getUserIdFromUrl(req.url) && req.method === 'PATCH') {
    UsersController.updateUser(req, res);
  }
  else if (getUserIdFromUrl(req.url) && req.method === 'DELETE') {
    UsersController.deleteUser(req, res);
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Incorrect URL');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
