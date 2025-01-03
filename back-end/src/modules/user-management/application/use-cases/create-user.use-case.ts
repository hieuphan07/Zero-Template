import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { CreateUserDto } from '../../presentation/dto/create-user.dto';
import { IPasswordHash } from '../../../../shared/utils/password/password-hash.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHash')
    private readonly passwordService: IPasswordHash,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    // Check existing user
    const exists = await this.userRepository.exists(
      createUserDto.email,
      createUserDto.username,
      createUserDto.phoneNumber,
    );
    if (exists.email) {
      throw new ConflictException('Email already exists');
    }
    if (exists.username) {
      throw new ConflictException('Username already exists');
    }
    if (exists.phoneNumber) {
      throw new ConflictException('Phone number already exists');
    }

    // Hash password from input
    const hashedPassword = await this.passwordService.hash(createUserDto.password);

    // Create new user with hashed password
    const user = new User(createUserDto.username, createUserDto.email, hashedPassword, createUserDto.phoneNumber);

    return this.userRepository.create(user);
  }
}
