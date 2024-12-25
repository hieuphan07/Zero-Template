import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';


@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    return user;
  }
}