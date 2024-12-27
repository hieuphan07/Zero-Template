import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserOrmEntity } from './infrastructure/orm/user.entity.orm';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserUseCase,
    DeleteUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserManagementModule {}
