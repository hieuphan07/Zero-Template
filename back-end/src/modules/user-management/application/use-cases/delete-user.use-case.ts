import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { DeleteUserResponseDto } from '../../presentation/dto/delete-user.response.dto';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<DeleteUserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`No user found with ID: ${id}`);
    }
    await this.userRepository.softDelete(id);

    return {
      success: true,
      message: 'User deleted successfully',
      deletedId: id,
    };
  }
}
