import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { CreateUserDto } from '../../presentation/dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User(
        createUserDto.username,
        createUserDto.email,
        createUserDto.password,
        createUserDto.phoneNumber,
      );
      return await this.userRepository.create(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }
}
