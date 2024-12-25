import { User } from '../entities/user.entity';

export interface IUserRepository {
    create(user: User): Promise<User>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findAll(): Promise<User[]>;
    update(id: number, user: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}