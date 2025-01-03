import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/modules/user-management/domain/repositories/user-repository.interface';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { GetUserUseCase } from 'src/modules/user-management/application/use-cases/get-user.usecase';

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
  let userRepository: IUserRepository;

  const mockUser = new User('john_doe', 'john@example.com', 'password', '+1234567890');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserUseCase,
        {
          provide: 'IUserRepository',
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
    userRepository = module.get<IUserRepository>('IUserRepository');
  });

  describe('execute', () => {
    it('should return a user when found by ID', async () => {
      // Arrange
      const userId = 1;
      jest.spyOn(userRepository, 'findById').mockResolvedValue(mockUser);

      // Act
      const result = await getUserUseCase.execute(userId);

      // Assert
      expect(result).toBe(mockUser);
      expect(userRepository.findById).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException when user not found', async () => {
      // Arrange
      const userId = 999;
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      // Act & Assert
      await expect(getUserUseCase.execute(userId)).rejects.toThrow(NotFoundException);
      expect(userRepository.findById).toHaveBeenCalledWith(userId);
    });
  });
});
