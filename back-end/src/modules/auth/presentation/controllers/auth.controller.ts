import {
  Controller,
  Post,
  Body,
  BadRequestException,
  ConflictException,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
  Get,
} from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { CurrentUserResponseDto, LoginDto, LoginResponseDto } from '../dtos/login.dto';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { ApiResponse, ApiOperation, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RefreshDto, RefreshResponseDto } from '../dtos/refresh.dto';
import { CurrentUser } from '@/shared/decorator/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
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
    description: 'common:auth.invalid-input',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'common:auth.user-already-exists',
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
  @ApiResponse({
    status: 404,
    description: 'common:auth.user-not-found',
  })
  @ApiResponse({
    status: 400,
    description: 'common:auth.invalid-credentials',
  })
  @ApiQuery({
    name: 'rememberMe',
    type: String,
    example: 'false',
  })
  async login(
    @Body() loginDto: LoginDto,
    @Query('rememberMe') rememberMe: string = 'false',
  ): Promise<LoginResponseDto> {
    try {
      const rememberMeBool = rememberMe === 'true';
      return await this.loginUseCase.execute(loginDto, rememberMeBool);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Post('refresh-access-token')
  async refreshAccessToken(@Body() refreshDto: RefreshDto): Promise<RefreshResponseDto> {
    return await this.loginUseCase.refreshAccessToken(refreshDto.refreshToken);
  }

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async getCurrentUser(@CurrentUser() user: CurrentUserResponseDto): Promise<CurrentUserResponseDto> {
    return user;
  }
}
