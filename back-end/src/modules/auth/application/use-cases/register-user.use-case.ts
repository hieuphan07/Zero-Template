import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { RegisterDto } from '../../presentation/dtos/register.dto';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from '../../domain/interfaces/auth.repository.interface';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(registerDto: RegisterDto): Promise<User> {
    try {
      const user = new User(registerDto.username, registerDto.email, registerDto.password, registerDto.phoneNumber);
      return await this.authRepository.createUser(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }
}
