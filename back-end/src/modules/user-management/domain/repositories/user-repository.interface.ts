import { User } from '../entities/user.entity';
import { PaginatedResult } from 'src/shared/types/paginated-result.interface';
import { SearchOptions } from 'src/shared/types/search-options';

export interface IUserRepository {
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  findById(id: number): Promise<User>;
  delete(id: number): Promise<void>;
  softDelete(id: number): Promise<void>;
  restore(id: number): Promise<void>;
  findAll(query: SearchOptions): Promise<PaginatedResult<User>>;
  findByEmail(email: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  exists(
    email: string,
    username: string,
    phoneNumber?: string,
  ): Promise<{ email: boolean; username: boolean; phoneNumber?: boolean }>;
}
