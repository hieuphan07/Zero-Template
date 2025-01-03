import { Test } from '@nestjs/testing';
import { DeleteUserUseCase } from '../../../../../src/modules/user-management/application/use-cases/delete-user.use-case';
import { NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/modules/user-management/domain/repositories/user-repository.interface';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: 'IUserRepository',
          useValue: {
            findById: jest.fn(),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteUserUseCase = moduleRef.get<DeleteUserUseCase>(DeleteUserUseCase);
    userRepository = moduleRef.get<IUserRepository>('IUserRepository');
  });

  it('should delete user successfully', async () => {
    const userId = 1;
    jest.spyOn(userRepository, 'findById').mockResolvedValue({ id: userId } as any);
    jest.spyOn(userRepository, 'softDelete').mockResolvedValue(undefined);

    const result = await deleteUserUseCase.execute(userId);

    expect(userRepository.findById).toHaveBeenCalledWith(userId);
    expect(userRepository.softDelete).toHaveBeenCalledWith(userId);
    expect(result).toEqual({
      success: true,
      message: 'User deleted successfully',
      deletedId: userId,
    });
  });

  it('should throw NotFoundException when user not found', async () => {
    const userId = 1;
    jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

    await expect(deleteUserUseCase.execute(userId)).rejects.toThrow(
      new NotFoundException({
        success: false,
        message: `User not found with ID: ${userId}`,
        deletedId: userId,
      }),
    );
    expect(userRepository.findById).toHaveBeenCalledWith(userId);
    expect(userRepository.softDelete).not.toHaveBeenCalled();
  });
});
