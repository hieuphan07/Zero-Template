import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../presentation/dto/update-user.dto';
import { IPasswordHash } from 'src/shared/utils/password/password-hash.interface';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHash')
    private readonly passwordService: IPasswordHash,
  ) {}

  async execute(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Find the existing user
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new ConflictException('User not found');
    }

    // Update only the provided fields
    if (updateUserDto.username) {
      existingUser.setUsername(updateUserDto.username);
    }
    if (updateUserDto.email) {
      existingUser.setEmail(updateUserDto.email);
    }
    if (updateUserDto.password) {
      // Hash password from input
      const hashedPassword = await this.passwordService.hash(updateUserDto.password);
      existingUser.setPassword(hashedPassword);
    }
    if (updateUserDto.phoneNumber) {
      existingUser.setPhoneNumber(updateUserDto.phoneNumber);
    }

    // Save the updated user back to the repository
    return this.userRepository.update(id, existingUser);
  }
}
