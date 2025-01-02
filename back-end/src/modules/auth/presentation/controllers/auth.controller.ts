import { Controller, Post, Body, BadRequestException, ConflictException } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginDto, LoginResponseDto } from '../dtos/login.dto';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    try {
      return await this.registerUserUseCase.execute(registerDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('User already exists');
      }
      // Handle email validation error specifically
      if (error.message && error.message.includes('Invalid email')) {
        throw new BadRequestException('Invalid registration data');
      }

      throw new BadRequestException('Invalid registration data');
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.loginUseCase.execute(loginDto);
  }
}
