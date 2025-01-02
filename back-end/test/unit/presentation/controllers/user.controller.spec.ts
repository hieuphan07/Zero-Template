import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../../src/modules/user-management/presentation/controllers/user.controller';
import { DeleteUserUseCase } from '../../../../src/modules/user-management/application/use-cases/delete-user.use-case';
import { GetUserUseCase } from 'src/modules/user-management/application/use-cases/get-user.usecase';
import { GetUsersUseCase } from 'src/modules/user-management/application/use-cases/get-users.usecase';
import { UserDto } from 'src/modules/user-management/application/dtos/user.dto';
import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { PaginatedResult } from 'src/shared/types/paginated-result.interface';
import { User } from 'src/modules/user-management/domain/entities/user.entity';

const mockUserResponseDto: UserDto = {
  id: 1,
  username: 'John Doe',
  email: 'john.doe@example.com',
  phoneNumber: '',
  lastLogin: null,
};

const mockPaginatedResponseDto: PaginatedResponseDto<UserDto> = {
  data: [mockUserResponseDto],
  meta: {
    total: 1,
    page: 1,
    lastPage: 1,
  },
};

describe('UserController', () => {
  let controller: UserController;
  let deleteUserUseCase: DeleteUserUseCase;
  let getUsersUseCase: GetUsersUseCase;
  let getUserUseCase: GetUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: DeleteUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
    getUsersUseCase = module.get<GetUsersUseCase>(GetUsersUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return a paginated list of users', async () => {
      // Arrange: mock the use case
      jest
        .spyOn(getUsersUseCase, 'execute')
        .mockResolvedValue(mockPaginatedResponseDto as unknown as PaginatedResult<User>);

      // Act: simulate the controller method
      const result = await controller.listUsers({ page: 1, limit: 10 });

      // Assert: check that the response is correct
      expect(result).toEqual(mockPaginatedResponseDto);
      expect(getUsersUseCase.execute).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
    });
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      // Arrange: mock the use case
      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(mockUserResponseDto as unknown as User);

      // Act: simulate the controller method
      const result = await controller.getUserById(1);

      // Assert: check that the response is correct
      expect(result).toEqual(mockUserResponseDto);
      expect(getUserUseCase.execute).toHaveBeenCalledWith(1);
    });

    it('should throw error when user not found', async () => {
      // Arrange: mock the use case to throw an error
      jest.spyOn(getUserUseCase, 'execute').mockRejectedValue(new Error('User not found'));

      // Act & Assert: check if the error is handled correctly
      await expect(controller.getUserById(999)).rejects.toThrow('User not found');
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      const userId = 1;
      const expectedResult = {
        success: true,
        message: 'Xóa người dùng thành công',
        deletedId: userId,
      };

      jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue(expectedResult);

      const result = await controller.deleteUser(userId);

      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(userId.toString());
      expect(result).toEqual(expectedResult);
    });
  });
});
