import { Controller, Post, Body, BadRequestException, ConflictException, HttpStatus, HttpCode } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginDto, LoginResponseDto } from '../dtos/login.dto';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User was successfully created',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    try {
      return await this.registerUserUseCase.execute(registerDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      return await this.loginUseCase.execute(loginDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
