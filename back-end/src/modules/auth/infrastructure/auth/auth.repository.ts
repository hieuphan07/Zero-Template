import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthRepository } from '../../domain/interfaces/auth.repository.interface';
import { UserOrmEntity } from 'src/modules/user-management/infrastructure/orm/user.entity.orm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { UserMapper } from 'src/modules/user-management/application/mapper/user.mapper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('common:auth.invalid-credentials');
    }

    user.lastLogin = new Date();
    await this.userRepository.save(user);

    return UserMapper.toDomain(user);
  }

  async createUser(userData: User): Promise<User> {
    try {
      const user = UserMapper.toOrmEntity(userData);
      const savedUser = await this.userRepository.save(user);
      return UserMapper.toDomain(savedUser);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('common:auth.user-already-exists');
      }
      throw error;
    }
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }

  async refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      const decoded = this.jwtService.verify(refreshToken);

      const user = await this.userRepository.findOne({ where: { id: decoded.sub } });
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return user.refreshToken;
    } catch {
      return null;
    }
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    if (!user) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new UnauthorizedException('common:auth.invalid-credentials');
    }
    return UserMapper.toDomain(user);
  }
}
