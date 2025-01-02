import { UserOrmEntity } from 'src/modules/user-management/infrastructure/orm/user.entity.orm';
import { User } from 'src/modules/user-management/domain/entities/user.entity';

export interface IAuthRepository {
  findUserByUsername(username: string): Promise<UserOrmEntity | null>;
  createUser(user: User): Promise<User>;
  login(username: string, password: string): Promise<User>;
}
