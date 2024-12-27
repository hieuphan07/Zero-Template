import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User>;
  delete(id: number): Promise<void>;
  softDelete(id: number): Promise<void>;
  restore(id: number): Promise<void>;
}
