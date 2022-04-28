import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
	async handle(request: Request, response: Response) {

		const createUserService = new CreateUserService();

		const users = await createUserService.list();

		return response.json(users);
	}
	
	async create(request: Request, response: Response) {
		const { name, email, password, admin = false } = request.body;

		const createUserService = new CreateUserService();

		const user = await createUserService.execute({ name, email, password, admin });

		return response.json(user);
	}
}

export { CreateUserController };