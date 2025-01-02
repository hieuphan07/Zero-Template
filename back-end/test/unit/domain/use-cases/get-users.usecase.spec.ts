import { Test, TestingModule } from '@nestjs/testing';
import { PaginatedResult } from 'src/shared/types/paginated-result.interface';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-query.dto';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { IUserRepository } from 'src/modules/user-management/domain/repositories/user-repository.interface';
import { GetUsersUseCase } from 'src/modules/user-management/application/use-cases/get-users.usecase';

// Mock data
const mockUsers: User[] = [
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

describe('ListUsersUseCase', () => {
  let listUsersUseCase: GetUsersUseCase;
  let userRepository: IUserRepository;

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

    listUsersUseCase = module.get<GetUsersUseCase>(GetUsersUseCase);
    userRepository = module.get<IUserRepository>('IUserRepository');
  });

  it('should be defined', () => {
    expect(listUsersUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return paginated result when users are found', async () => {
      // Arrange
      const query: PaginationQueryDto = {
        page: 1,
        limit: 10,
        searchParams: {},
        sortParams: {},
      };
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(mockPaginatedResult);

      // Act
      const result = await listUsersUseCase.execute(query);

      // Assert
      expect(result).toEqual(mockPaginatedResult);
      expect(userRepository.findAll).toHaveBeenCalledWith(query);
    });

    it('should handle an empty user list', async () => {
      // Arrange
      const query: PaginationQueryDto = {
        page: 1,
        limit: 10,
        searchParams: {},
        sortParams: {},
      };
      const emptyPaginatedResult: PaginatedResult<User> = {
        data: [],
        meta: {
          total: 0,
          page: 1,
          lastPage: 0,
        },
      };
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(emptyPaginatedResult);

      // Act
      const result = await listUsersUseCase.execute(query);

      // Assert
      expect(result).toEqual(emptyPaginatedResult);
      expect(userRepository.findAll).toHaveBeenCalledWith(query);
    });
  });
});
