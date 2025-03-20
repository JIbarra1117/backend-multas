import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class AuthenticateUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            throw new Error('❌ Credenciales incorrectas');
        }

        const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return token;
    }
}
