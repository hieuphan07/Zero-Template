import { User } from '../../domain/entities/user.entity';
import { UserDto } from '../dtos/user.dto';
import { UserOrmEntity } from '../../infrastructure/orm/user.entity.orm';

export class UserMapper {
  // Domain -> DTO
  static toDto(user: User): UserDto {
    return {
      username: user.getUsername(),
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber(),
      lastLogin: user.getLastLogin()?.toISOString(),
    };
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
}
