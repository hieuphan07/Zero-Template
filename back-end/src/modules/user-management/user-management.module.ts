import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserEntity } from './infrastructure/orm/user.entity.orm';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    DeleteUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserManagementModule {}
