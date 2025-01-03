import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthRepository } from '../../domain/interfaces/auth.repository.interface';
import { UserOrmEntity } from 'src/modules/user-management/infrastructure/orm/user.entity.orm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { UserMapper } from 'src/modules/user-management/application/mapper/user.mapper';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async login(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
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
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }
}
