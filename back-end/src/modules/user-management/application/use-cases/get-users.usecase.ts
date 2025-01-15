import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { PaginatedResult } from 'src/shared/types/paginated-result.interface';
import { SearchOptions } from 'src/shared/types/search-options';

@Injectable()
export class GetUsersUseCase {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async execute(searchOptions: SearchOptions): Promise<PaginatedResult<User>> {
    try {
      const result = await this.userRepository.findAll(searchOptions);

      if (result.data.length === 0) {
        throw new NotFoundException('No users found');
      }

      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
