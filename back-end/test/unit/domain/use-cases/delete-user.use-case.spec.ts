import { Test } from '@nestjs/testing';
import { DeleteUserUseCase } from '../../../../src/modules/user-management/application/use-cases/delete-user.use-case';
import { IUserRepository } from '../../../../src/modules/user-management/domain/repositories/user-repository.interface';
import { NotFoundException } from '@nestjs/common';

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
    
    const result = await deleteUserUseCase.execute(userId);
    
    expect(result).toEqual({
      success: true,
      message: 'User deleted successfully',
      deletedId: userId,
    });
  });

  it('should throw NotFoundException when user not found', async () => {
    const userId = 999;
    jest.spyOn(userRepository, 'findById').mockResolvedValue(null);
    
    await expect(deleteUserUseCase.execute(userId)).rejects.toThrow(NotFoundException);
  });
});
