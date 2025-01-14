import { User } from 'src/modules/user-management/domain/entities/user.entity';

export interface IAuthRepository {
  createUser(user: User): Promise<User>;
  login(username: string): Promise<User>;
  saveRefreshToken(userId: string, refreshToken: string): Promise<void>;
  refreshAccessToken(refreshToken: string): Promise<string | null>;
}
