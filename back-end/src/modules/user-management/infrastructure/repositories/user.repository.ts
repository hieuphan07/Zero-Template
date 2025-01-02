import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../orm/user.entity.orm';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { UserMapper } from '../../application/mapper/user.mapper';
import { PaginatedResult } from 'src/shared/types/paginated-result.interface';
import { AbstractRepository } from 'src/shared/infrastructure/repositories/abstract.repository';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-query.dto';

@Injectable()
export class UserRepository extends AbstractRepository<UserOrmEntity> implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    repository: Repository<UserOrmEntity>,
  ) {
    super(repository);
  }

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

  async findAll(query: PaginationQueryDto): Promise<PaginatedResult<User>> {
    const { page, limit, searchParams, sortParams } = query;
    const queryBuilder = this.repository.createQueryBuilder('user');
    if (searchParams) {
      this.applySearchParams(queryBuilder, searchParams);
    }
    if (sortParams) {
      this.applySortParams(queryBuilder, sortParams);
    }
    const [users, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return {
      data: UserMapper.toDomainList(users),
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
