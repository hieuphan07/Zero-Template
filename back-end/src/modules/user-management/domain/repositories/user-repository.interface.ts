import { User } from '../entities/user.entity';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-query.dto';
import { PaginatedResult } from 'src/shared/types/paginated-result.interface';

export interface IUserRepository {
  create(user: User): Promise<User>;
  update(id: number, user: Partial<User>): Promise<User>;
  findById(id: number): Promise<User>;
  delete(id: number): Promise<void>;
  softDelete(id: number): Promise<void>;
  restore(id: number): Promise<void>;
  findAll(query: PaginationQueryDto): Promise<PaginatedResult<User>>;
  findByEmail(email: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  exists(
    email: string,
    username: string,
    phoneNumber: string,
  ): Promise<{ email: boolean; username: boolean; phoneNumber: boolean }>;
}
