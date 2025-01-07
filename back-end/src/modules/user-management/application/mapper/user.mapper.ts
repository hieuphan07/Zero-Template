import { User } from '../../domain/entities/user.entity';
import { UserOrmEntity } from '../../infrastructure/orm/user.entity.orm';
import { PaginatedResult } from 'src/shared/types/paginated-result.interface';
import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { UserResponseDto } from '../../presentation/dto/user-response.dto';
import { FormatHelper } from '../../presentation/helper/format.helper';

export class UserMapper {
  // Domain -> DTO
  static toDto(user: User): UserResponseDto {
    return {
      id: user.getId(),
      username: user.getUsername(),
      email: user.getEmail(),
      password: user.getPassword(),
      phoneNumber: user.getPhoneNumber(),
      lastLogin: user.getLastLogin() ? FormatHelper.formatDateTime(user.getLastLogin()) : '',
      createdAt: user.getCreatedAt() ? FormatHelper.formatDateTime(user.getCreatedAt()) : '',
      updatedAt: user.getUpdatedAt() ? FormatHelper.formatDateTime(user.getUpdatedAt()) : '',
    };
  }

  static toDTOList(entities: User[]): UserResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }

  // Domain -> ORM Entity
  static toOrmEntity(user: User): UserOrmEntity {
    const ormUser = new UserOrmEntity();
    ormUser.id = user.getId();
    ormUser.username = user.getUsername();
    ormUser.email = user.getEmail();
    ormUser.password = user.getPassword();
    ormUser.phoneNumber = user.getPhoneNumber();
    ormUser.lastLogin = user.getLastLogin();
    return ormUser;
  }

  // ORM Entity -> Domain
  static toDomain(ormUser: UserOrmEntity): User {
    const user = new User(ormUser.username, ormUser.email, ormUser.password, ormUser.phoneNumber);
    user.setId(ormUser.id);
    user.setUuid(ormUser.uuid);
    user.setLastLogin(ormUser.lastLogin);
    return user;
  }

  static toDomainList(entities: UserOrmEntity[]): User[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  static toPaginatedDTO(paginatedResult: PaginatedResult<User>): PaginatedResponseDto<UserResponseDto> {
    return {
      data: this.toDTOList(paginatedResult.data),
      meta: {
        total: paginatedResult.meta.total,
        page: paginatedResult.meta.page,
        lastPage: paginatedResult.meta.lastPage,
      },
    };
  }
}
