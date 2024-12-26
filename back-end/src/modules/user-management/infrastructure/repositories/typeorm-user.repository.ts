import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../orm/user.entity.orm';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const userEntity = this.repository.create({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    await this.repository.save(userEntity);
    return this.toDomain(userEntity);
  }

  async findById(id: number): Promise<User> {
    const userEntity = await this.repository.findOne({ where: { id } });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  async findByEmail(email: string): Promise<User> {
    const userEntity = await this.repository.findOne({ where: { email } });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.repository.find();
    return userEntities.map((entity) => this.toDomain(entity));
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.repository.update(id, userData);
    const updatedUser = await this.repository.findOne({ where: { id } });
    return this.toDomain(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(entity: UserEntity): User {
    const user = new User(entity.username, entity.email, entity.password);
    user.id = entity.id;
    return user;
  }
}
