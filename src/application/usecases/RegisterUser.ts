import bcrypt from 'bcryptjs';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class RegisterUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(nombre: string, email: string, password: string, rol: 'admin' | 'usuario') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(0, nombre, email, hashedPassword, rol);
        // console.log(newUser);
        await this.userRepository.create(newUser);
    }
}
