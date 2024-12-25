import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) {}

    async execute(userData: { username: string; email: string; password: string }): Promise<User> {
        const user = new User(
            userData.username,
            userData.email,
            userData.password
        );
        
        return this.userRepository.create(user);
    }
}