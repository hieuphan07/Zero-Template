import { Test, TestingModule } from '@nestjs/testing';
import { PaginatedResult } from 'src/shared/types/paginated-result.interface';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { IUserRepository } from 'src/modules/user-management/domain/repositories/user-repository.interface';
import { GetUsersUseCase } from 'src/modules/user-management/application/use-cases/get-users.usecase';
import { NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { SearchOptions } from 'src/shared/types/search-options';
import { SortDirection } from 'src/shared/enum/sort-direction';

describe('GetUsersUseCase', () => {
  let getUsersUseCase: GetUsersUseCase;
  let userRepository: IUserRepository;

  const mockUsers = [
    new User('johndoe', 'john@example.com', 'hashedPassword123', '+1234567890'),
    new User('janedoe', 'jane@example.com', 'hashedPassword456', '+0987654321'),
  ];

  const mockPaginatedResult: PaginatedResult<User> = {
    data: mockUsers,
    meta: {
      total: 2,
      page: 1,
      lastPage: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUsersUseCase,
        {
          provide: 'IUserRepository',
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    getUsersUseCase = module.get<GetUsersUseCase>(GetUsersUseCase);
    userRepository = module.get<IUserRepository>('IUserRepository');
  });

  it('should be defined', () => {
    expect(getUsersUseCase).toBeDefined();
  });

  describe('execute', () => {
    const defaultSearchOptions: SearchOptions = {
      page: 1,
      limit: 10,
      searchFields: [],
      searchValue: '',
      sortBy: 'createdAt',
      sortDirection: SortDirection.DESC,
    };

    it('should return paginated result when users are found', async () => {
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(mockPaginatedResult);

      const result = await getUsersUseCase.execute(defaultSearchOptions);

      expect(result).toEqual(mockPaginatedResult);
      expect(userRepository.findAll).toHaveBeenCalledWith(defaultSearchOptions);
    });

    it('should throw NotFoundException when no users are found', async () => {
      const emptyResult: PaginatedResult<User> = {
        data: [],
        meta: {
          total: 0,
          page: 1,
          lastPage: 0,
        },
      };
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(emptyResult);

      await expect(getUsersUseCase.execute(defaultSearchOptions)).rejects.toThrow(
        new NotFoundException('No users found'),
      );
    });

    it('should propagate BadRequestException from repository', async () => {
      jest.spyOn(userRepository, 'findAll').mockRejectedValue(new BadRequestException('Invalid search field'));

      await expect(getUsersUseCase.execute(defaultSearchOptions)).rejects.toThrow(
        new BadRequestException('Invalid search field'),
      );
    });

    it('should throw InternalServerErrorException for unexpected errors', async () => {
      jest.spyOn(userRepository, 'findAll').mockRejectedValue(new Error('Unexpected error'));

      await expect(getUsersUseCase.execute(defaultSearchOptions)).rejects.toThrow(
        new InternalServerErrorException('An unexpected error occurred'),
      );
    });

    it('should handle search with specific fields', async () => {
      const searchOptions: SearchOptions = {
        ...defaultSearchOptions,
        searchFields: ['username', 'email'],
        searchValue: 'test',
      };

      jest.spyOn(userRepository, 'findAll').mockResolvedValue(mockPaginatedResult);

      const result = await getUsersUseCase.execute(searchOptions);

      expect(result).toEqual(mockPaginatedResult);
      expect(userRepository.findAll).toHaveBeenCalledWith(searchOptions);
    });

    it('should handle custom sorting', async () => {
      const sortOptions: SearchOptions = {
        ...defaultSearchOptions,
        sortBy: 'username',
        sortDirection: SortDirection.ASC,
      };

      jest.spyOn(userRepository, 'findAll').mockResolvedValue(mockPaginatedResult);

      const result = await getUsersUseCase.execute(sortOptions);

      expect(result).toEqual(mockPaginatedResult);
      expect(userRepository.findAll).toHaveBeenCalledWith(sortOptions);
    });
  });
});
