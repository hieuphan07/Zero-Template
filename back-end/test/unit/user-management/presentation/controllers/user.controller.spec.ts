import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { UserController } from 'src/modules/user-management/presentation/controllers/user.controller';
import { GetUserUseCase } from 'src/modules/user-management/application/use-cases/get-user.usecase';
import { GetUsersUseCase } from 'src/modules/user-management/application/use-cases/get-users.usecase';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { PaginatedResult } from 'src/shared/types/paginated-result.interface';
import { DeleteUserUseCase } from 'src/modules/user-management/application/use-cases/delete-user.use-case';
import { CreateUserUseCase } from 'src/modules/user-management/application/use-cases/create-user.use-case';
import { CreateUserDto } from 'src/modules/user-management/presentation/dto/create-user.dto';
import { UserMapper } from 'src/modules/user-management/application/mapper/user.mapper';

describe('UserController', () => {
  let controller: UserController;
  let createUserUseCase: CreateUserUseCase;
  let getUserUseCase: GetUserUseCase;
  let getUsersUseCase: GetUsersUseCase;
  let deleteUserUseCase: DeleteUserUseCase;

  const mockUser = new User('john_doe', 'john@example.com', 'password', '+1234567890');
  const mockUserDto = UserMapper.toDto(mockUser);

  const mockPaginatedResult: PaginatedResult<User> = {
    data: [mockUser],
    meta: {
      total: 1,
      page: 1,
      lastPage: 1,
    },
  };

  const mockPaginatedDto = UserMapper.toPaginatedDTO(mockPaginatedResult);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCase,
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
        {
          provide: GetUsersUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
    getUsersUseCase = module.get<GetUsersUseCase>(GetUsersUseCase);
    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    const createUserDto: CreateUserDto = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      phoneNumber: '+1234567890',
    };

    it('should create a user successfully', async () => {
      jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(mockUser);

      const result = await controller.createUser(createUserDto);

      expect(result).toBe(mockUser);
      expect(createUserUseCase.execute).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw ConflictException when user already exists', async () => {
      jest.spyOn(createUserUseCase, 'execute').mockRejectedValue(new ConflictException());

      await expect(controller.createUser(createUserDto)).rejects.toThrow(ConflictException);
    });

    it('should throw BadRequestException for other errors', async () => {
      jest.spyOn(createUserUseCase, 'execute').mockRejectedValue(new Error('Some error'));

      await expect(controller.createUser(createUserDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('getUser', () => {
    it('should return a user when found', async () => {
      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(mockUser);

      const result = await controller.getUserById(1);

      expect(result).toEqual(mockUserDto);
      expect(getUserUseCase.execute).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(null);

      await expect(controller.getUserById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getUsers', () => {
    it('should return paginated users', async () => {
      jest.spyOn(getUsersUseCase, 'execute').mockResolvedValue(mockPaginatedResult);

      const result = await controller.listUsers({ page: 1, limit: 10 });

      expect(result).toEqual(mockPaginatedDto);
      expect(getUsersUseCase.execute).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });

    it('should throw NotFoundException when no users found', async () => {
      jest.spyOn(getUsersUseCase, 'execute').mockResolvedValue({
        data: [],
        meta: { total: 0, page: 1, lastPage: 1 },
      });

      await expect(controller.listUsers({ page: 1, limit: 10 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const mockResponse = { success: true, deletedId: 1, message: 'User deleted successfully' };
      jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue(mockResponse);

      const result = await controller.deleteUser(1);

      expect(result).toEqual(mockResponse);
      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(deleteUserUseCase, 'execute').mockRejectedValue(new NotFoundException());

      await expect(controller.deleteUser(999)).rejects.toThrow(NotFoundException);
    });
  });
});
