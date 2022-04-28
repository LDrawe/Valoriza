import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { CreateComplimentController } from './controllers/CreateComplimentController';

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

routes.get('/users', createUserController.handle);
routes.post('/users', createUserController.create);
routes.post('/tags', ensureAdmin, createTagController.handle);
routes.post('/session', authenticateUserController.handle);
routes.post('/compliment', createComplimentController.handle);

export { routes };