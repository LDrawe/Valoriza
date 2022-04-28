import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';

interface IAuthenticateUserRequest {
    email: string;
    password: string;
}

export class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateUserRequest) {

        if (!email) {
            throw new Error('You must provide your E-Mail!');
        }

        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne({
            email
        });

        const isPasswordCorrect = compareSync(password, user.password);

        if (!user.password || !isPasswordCorrect) {
            throw new Error('E-Mail or Password incorrect');
        }

        const token = sign({
            email: user.email
        },
            process.env.API_PRIVATE_KEY, {
            subject: user.id,
            expiresIn: 3600
        });

        return token;

    }
}