import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserRequest {
	name: string;
	email: string;
	password: string;
	admin?: boolean;
}

class CreateUserService {
	async list() {
		const usersRepositories = getCustomRepository(UsersRepositories);
		return usersRepositories.find();
	}
	async execute({ name, email, password, admin }: IUserRequest) {

		if (!email) {
			throw new Error('Incorrect Email');
		}

		const usersRepositories = getCustomRepository(UsersRepositories);

		const userAlreadyExists = await usersRepositories.findOne({
			email
		});

		if (userAlreadyExists) {
			throw new Error('User already exists');
		}

		const passwordHash = await hash(password, 10);

		const user = usersRepositories.create({
			name,
			email,
			password: passwordHash,
			admin
		});

		await usersRepositories.save(user);
		return user;
	}
};

export { CreateUserService };