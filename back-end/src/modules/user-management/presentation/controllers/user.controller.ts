import {
  Controller,
  Get,
  Param,
  HttpCode,
  Delete,
  HttpStatus,
  NotFoundException,
  Post,
  Body,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserResponseDto } from '../dto/delete-user.response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/presentation/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/presentation/guards/roles.guard';
import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-query.dto';
import { UserMapper } from '../../application/mapper/user.mapper';
import { ApiPaginatedRequest } from 'src/shared/decorator/api-paginate-request.decorator';
import { UserOrmEntity } from '../../infrastructure/orm/user.entity.orm';
import { PaginationParams } from 'src/shared/decorator/pagination-params.decorator';
import { GetUsersUseCase } from '../../application/use-cases/get-users.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('Users')
@Controller('api/v1/admin/users')
export class UserController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Get()
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'List all users' })
  @ApiPaginatedRequest(UserOrmEntity)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users',
    type: PaginatedResponseDto<UserResponseDto>,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Users not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request, invalid parameters',
  })
  async getUsers(
    @PaginationParams(UserOrmEntity) query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    try {
      const result = await this.getUsersUseCase.execute(query);
      if (!result || result.data.length === 0) {
        throw new NotFoundException('Users not found');
      }
      return UserMapper.toPaginatedDTO(result);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Users not found');
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard, RolesGuard)
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
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.createUserUseCase.execute(createUserDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Users not found',
  })
  async getUser(@Param('id') id: number): Promise<UserResponseDto> {
    const user = await this.getUserUseCase.execute(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserMapper.toDto(user);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Existing User' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User was successfully updated',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.updateUserUseCase.execute(id, updateUserDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`User ${id} not found`);
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred while updating the user');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User was successfully deleted',
    type: DeleteUserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async deleteUser(@Param('id') id: number): Promise<DeleteUserResponseDto> {
    try {
      return await this.deleteUserUseCase.execute(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          success: false,
          message: `No user found with ID: ${id}`,
          deletedId: id,
        });
      }
      throw error;
    }
  }
}
