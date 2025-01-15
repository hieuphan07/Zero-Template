import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SortDirection } from 'typeorm';
import { UserOrmEntity } from '../orm/user.entity.orm';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { UserMapper } from '../../application/mapper/user.mapper';
import { PaginatedResult } from 'src/shared/types/paginated-result.interface';
import { AbstractRepository } from 'src/shared/infrastructure/repositories/abstract.repository';
import { SearchOptions } from 'src/shared/types/search-options';

@Injectable()
export class UserRepository extends AbstractRepository<UserOrmEntity> implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    repository: Repository<UserOrmEntity>,
  ) {
    super(repository, {
      searchableFields: ['username', 'email', 'phoneNumber'],
      sortableFields: ['createdAt', 'updatedAt', 'id', 'username', 'email', 'phoneNumber', 'lastLogin'],
    });
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

  async update(id: number, user: User): Promise<User> {
    const userOrmEntity = await this.repository.findOne({ where: { id } });
    if (!userOrmEntity) {
      throw new NotFoundException(`User not found with ID: ${id}`);
    }

    try {
      const updatedUserOrmEntity = await this.repository.save({
        ...user,
        updatedAt: new Date(),
      });
      return UserMapper.toDomain(updatedUserOrmEntity);
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
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

  async findAll(query: SearchOptions): Promise<PaginatedResult<User>> {
    const { searchFields, searchValue, page, limit, sortBy, sortDirection } = query;
    if (searchFields.length > 0) {
      this.validateSearchFields(searchFields);
    }
    if (sortBy) {
      this.validateSortFields(sortBy);
    }
    const skip = (page - 1) * limit;
    const where = searchValue ? this.buildWhereConditions(searchFields, searchValue) : {};
    const [users, total] = await this.repository.findAndCount({
      where,
      skip,
      take: limit,
      order: { [sortBy]: sortDirection as unknown as SortDirection },
    });

    const lastPage = Math.ceil(total / limit);
    return {
      data: UserMapper.toDomainList(users),
      meta: {
        total,
        page,
        lastPage,
      },
    };
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User not found with email: ${email}`);
    }
    return UserMapper.toDomain(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User not found with username: ${username}`);
    }
    return UserMapper.toDomain(user);
  }

  async exists(
    email: string,
    username: string,
    phoneNumber?: string,
  ): Promise<{ email: boolean; username: boolean; phoneNumber?: boolean }> {
    if (phoneNumber) {
      const [emailExists, usernameExists, phoneNumberExists] = await Promise.all([
        this.repository.findOne({ where: { email } }),
        this.repository.findOne({ where: { username } }),
        this.repository.findOne({ where: { phoneNumber } }),
      ]);
      return { email: !!emailExists, username: !!usernameExists, phoneNumber: !!phoneNumberExists };
    } else {
      const [emailExists, usernameExists] = await Promise.all([
        this.repository.findOne({ where: { email } }),
        this.repository.findOne({ where: { username } }),
      ]);
      return { email: !!emailExists, username: !!usernameExists };
    }
  }
}
