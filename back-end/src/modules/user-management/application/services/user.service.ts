import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { CreateUserDto } from '../../presentation/dto/create-user.dto';
import { UpdateUserDto } from '../../presentation/dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User(
            createUserDto.username,
            createUserDto.email,
            createUserDto.password
        );
        return this.userRepository.create(user);
    }

    async getUser(id: number): Promise<User> {
        return this.userRepository.findById(id);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userRepository.update(id, updateUserDto);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}
