import {
  Controller,
  Get,
  Param,
  HttpCode,
  Delete,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteUserResponseDto } from '../dto/delete-user.response.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

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
