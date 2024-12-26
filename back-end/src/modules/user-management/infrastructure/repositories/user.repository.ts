import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../orm/user.entity.orm';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found with ID: ${id}`);
    }
    return this.toDomain(user);
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
      throw new NotFoundException(`No user found with ID: ${id}`);
    }
  }

  async restore(id: number): Promise<void> {
    const result = await this.repository.update({ id }, { deletedAt: null });

    if (result.affected === 0) {
      throw new NotFoundException(`Deleted user not found with ID: ${id}`);
    }
  }

  private toDomain(entity: UserEntity): User {
    const user = new User(entity.username, entity.email, entity.password, entity.phoneNumber);
    user.id = entity.id;
    user.lastLogin = entity.lastLogin;
    return user;
  }
}
