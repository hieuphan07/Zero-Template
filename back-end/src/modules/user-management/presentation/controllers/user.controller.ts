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
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { DeleteUserResponseDto } from '../dto/delete-user.response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../../application/services/user.service';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post()
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
  async getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
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
