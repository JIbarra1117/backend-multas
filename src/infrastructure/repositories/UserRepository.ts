import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { connectDB } from '../../config/db';

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const db = await connectDB();
        const [rows]: any = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) return null;
        return new User(rows[0].id, rows[0].nombre, rows[0].email, rows[0].password_hash, rows[0].rol);
    }

    async create(user: User): Promise<void> {
        const db = await connectDB();
        await db.execute('INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)', 
            [user.nombre, user.email, user.password_hash, user.rol]);
    }

    async findAll(): Promise<User[]> {
        const db = await connectDB();
        const [rows] = await db.execute("SELECT id, nombre, email, rol FROM usuarios");
        return rows as User[];
    }   
}
