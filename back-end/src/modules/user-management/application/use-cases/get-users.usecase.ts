import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { PaginatedResult } from 'src/shared/types/paginated-result.interface';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-query.dto';

@Injectable()
export class GetUsersUseCase {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async execute(query: PaginationQueryDto): Promise<PaginatedResult<User>> {
    return await this.userRepository.findAll(query);
  }
}
