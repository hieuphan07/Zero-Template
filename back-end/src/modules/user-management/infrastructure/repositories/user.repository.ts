import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../orm/user.entity.orm';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { UserMapper } from '../../application/mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<User> {
    try {
      const ormUser = UserMapper.toOrmEntity(user);
      const savedUser = await this.repository.save(ormUser);
      return UserMapper.toDomain(savedUser);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${id}`);
    }
    return UserMapper.toDomain(user);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.repository.update({ id }, { deletedAt: new Date() });
    if (result.affected === 0) {
      throw new NotFoundException(`User not found with ID: ${id}`);
    }
  }

  async restore(id: number): Promise<void> {
    const result = await this.repository.update({ id }, { deletedAt: null });
    if (result.affected === 0) {
      throw new NotFoundException(`Deleted user not found with ID: ${id}`);
    }
  }
}
