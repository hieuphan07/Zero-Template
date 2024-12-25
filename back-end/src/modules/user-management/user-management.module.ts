import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { TypeOrmUserRepository } from './infrastructure/repositories/typeorm-user.repository';
import { UserEntity } from './infrastructure/orm/user.entity.orm';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [
        UserService,
        CreateUserUseCase,
        {
            provide: 'IUserRepository',
            useClass: TypeOrmUserRepository
        }
    ],
    exports: [UserService]
})
export class UserManagementModule {}