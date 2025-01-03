import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { RegisterDto } from '../../presentation/dtos/register.dto';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from '../../domain/interfaces/auth.repository.interface';
import { IPasswordHash } from 'src/shared/utils/password/password-hash.interface';
import { IUserRepository } from 'src/modules/user-management/domain/repositories/user-repository.interface';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHash')
    private readonly passwordService: IPasswordHash,
  ) {}

  async execute(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.userRepository.exists(
      registerDto.email,
      registerDto.username,
      registerDto.phoneNumber,
    );

    if (existingUser.email) {
      throw new ConflictException('Email already exists');
    }
    if (existingUser.username) {
      throw new ConflictException('Username already exists');
    }
    if (existingUser.phoneNumber) {
      throw new ConflictException('Phone number already exists');
    }

    const hashedPassword = await this.passwordService.hash(registerDto.password);

    const user = new User(registerDto.username, registerDto.email, hashedPassword, registerDto.phoneNumber);

    return await this.authRepository.createUser(user);
  }
}
