import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { UserOrmEntity } from './infrastructure/orm/user.entity.orm';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetUsersUseCase } from './application/use-cases/get-users.usecase';
import { GetUserUseCase } from './application/use-cases/get-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    GetUsersUseCase,
    GetUserUseCase,
    DeleteUserUseCase,
    CreateUserUseCase,
  ],
})
export class UserManagementModule {}
