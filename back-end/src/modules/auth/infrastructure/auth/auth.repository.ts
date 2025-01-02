import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthRepository } from '../../domain/interfaces/auth.repository.interface';
import { UserOrmEntity } from 'src/modules/user-management/infrastructure/orm/user.entity.orm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { UserMapper } from 'src/modules/user-management/application/mapper/user.mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository implements IAuthRepository {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) { }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  // Optional: Add method to verify password
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    user.lastLogin = new Date();
    await this.userRepository.save(user);

    return UserMapper.toDomain(user);
  }

  async createUser(userData: User): Promise<User> {
    try {
      const hashedPassword = await this.hashPassword(userData.getPassword());
      userData.setPassword(hashedPassword);

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

  async findUserByUsername(username: string): Promise<UserOrmEntity | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }
}
