import { Test } from '@nestjs/testing';
import { UpdateUserUseCase } from 'src/modules/user-management/application/use-cases/update-user.use-case';
import { IUserRepository } from 'src/modules/user-management/domain/repositories/user-repository.interface';
import { IPasswordHash } from 'src/shared/utils/password/password-hash.interface';
import { ConflictException } from '@nestjs/common';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { UpdateUserDto } from 'src/modules/user-management/presentation/dto/update-user.dto';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepository: IUserRepository;
  let passwordService: IPasswordHash;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: 'IUserRepository',
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: 'IPasswordHash',
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    updateUserUseCase = moduleRef.get<UpdateUserUseCase>(UpdateUserUseCase);
    userRepository = moduleRef.get<IUserRepository>('IUserRepository');
    passwordService = moduleRef.get<IPasswordHash>('IPasswordHash');
  });

  it('should update user successfully', async () => {
    const userId = 1;
    const updateUserDto: UpdateUserDto = {
      username: 'newTestUser',
      email: 'new.test@example.com',
      password: 'newPassword',
      phoneNumber: '+0987654321',
    };

    const existingUser = new User('oldUsername', 'oldEmail@example.com', 'oldPassword123', '+1234567890');

    jest.spyOn(userRepository, 'findById').mockResolvedValue(existingUser);
    jest.spyOn(passwordService, 'hash').mockResolvedValue('hashedNewPassword');
    jest.spyOn(userRepository, 'update').mockResolvedValue(existingUser);

    const result = await updateUserUseCase.execute(userId, updateUserDto);

    expect(result).toEqual(existingUser);
    expect(existingUser.getUsername()).toBe('newTestUser');
    expect(existingUser.getEmail()).toBe('new.test@example.com');
    expect(existingUser.getPassword()).toBe('hashedNewPassword');
    expect(existingUser.getPhoneNumber()).toBe('+0987654321');
    expect(passwordService.hash).toHaveBeenCalledWith('newPassword');
  });

  it('should throw ConflictException when user not found', async () => {
    const userId = 999;
    const updateUserDto: UpdateUserDto = { username: 'newUsername' };

    jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

    await expect(updateUserUseCase.execute(userId, updateUserDto)).rejects.toThrow(ConflictException);
  });
});
