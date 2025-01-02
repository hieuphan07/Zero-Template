import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { UserRepository } from '../../../../src/modules/user-management/infrastructure/repositories/user.repository';
import { User } from '../../../../src/modules/user-management/domain/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UserOrmEntity } from 'src/modules/user-management/infrastructure/orm/user.entity.orm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-query.dto';
import { UserMapper } from 'src/modules/user-management/application/mapper/user.mapper';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let typeormRepository: Repository<User>;
  let dataSource: DataSource;

  let repository: Repository<UserOrmEntity>;

  const mockUserEntity: UserOrmEntity = {
    id: 1,
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'hashedPassword123',
    phoneNumber: '+1234567890',
    lastLogin: new Date('2024-01-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    deletedAt: null,
  };

  const mockQueryBuilder = {
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserOrmEntity),
          useValue: {
            findOne: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    repository = module.get<Repository<UserOrmEntity>>(getRepositoryToken(UserOrmEntity));
  });

  describe('findById', () => {
    it('should return a user when found', async () => {
      // Arrange
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUserEntity);

      // Act
      const result = await userRepository.findById(1);

      // Assert
      expect(result).toBeDefined();
      expect(result.getId()).toBe(mockUserEntity.id);
      expect(result.getUsername()).toBe(mockUserEntity.username);
      expect(result.getEmail()).toBe(mockUserEntity.email);
      expect(result.getPhoneNumber()).toBe(mockUserEntity.phoneNumber);
      expect(result.getLastLogin()).toEqual(mockUserEntity.lastLogin);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when user not found', async () => {
      // Arrange
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      // Act & Assert
      await expect(userRepository.findById(999)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('findAll', () => {
    const mockPaginationQuery: PaginationQueryDto = {
      page: 1,
      limit: 10,
      searchParams: { username: 'john', email: 'john@example.com' },
      sortParams: { createdAt: 'DESC' },
    };

    const mockUsers = [
      mockUserEntity,
      { ...mockUserEntity, id: 2, username: 'janedoe' },
      // Add more users here
    ];
    const mockTotal = mockUsers.length;

    beforeEach(() => {
      mockQueryBuilder.getManyAndCount.mockResolvedValue([mockUsers, mockTotal]);
      jest.spyOn(UserMapper, 'toDomainList').mockReturnValue([
        {
          _id: mockUserEntity.id,
          _username: mockUserEntity.username,
          _email: mockUserEntity.email,
          _phoneNumber: mockUserEntity.phoneNumber,
          _lastLogin: mockUserEntity.lastLogin,
          _createdAt: mockUserEntity.createdAt,
          _updatedAt: mockUserEntity.updatedAt,
        } as unknown as User,
      ]);
    });

    it('should return paginated results with search and sort params', async () => {
      // Act
      const result = await userRepository.findAll(mockPaginationQuery);

      // Assert
      expect(result).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({
        total: mockTotal,
        page: mockPaginationQuery.page,
        lastPage: Math.ceil(mockTotal / mockPaginationQuery.limit),
      });

      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(mockPaginationQuery.limit);
      expect(mockQueryBuilder.getManyAndCount).toHaveBeenCalled();
    });

    it('should handle phone number search param', async () => {
      // Arrange
      const queryWithPhone: PaginationQueryDto = {
        page: 1,
        limit: 10,
        searchParams: { phoneNumber: '+1234567890' },
      };

      // Act
      await userRepository.findAll(queryWithPhone);

      // Assert
      expect(mockQueryBuilder.andWhere).toHaveBeenCalled();
    });
  });

  beforeEach(async () => {
    const mockTypeormRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      softDelete: jest.fn(),
    };

    const mockDataSource = {
      getRepository: jest.fn().mockReturnValue(mockTypeormRepository),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    dataSource = moduleRef.get<DataSource>(DataSource);
    typeormRepository = dataSource.getRepository(User);
  });

  describe('findById', () => {
    it('should find and return a user by id', async () => {
      const mockUser = new User('testuser', 'test@example.com', 'password');
      mockUser.setId(1);

      jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(mockUser);

      const result = await userRepository.findById(1);

      expect(result).toEqual(mockUser);
      expect(typeormRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(null);

      await expect(userRepository.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a user successfully', async () => {
      const userId = '1';
      jest.spyOn(typeormRepository, 'softDelete').mockResolvedValue(undefined);

      await userRepository.softDelete(Number(userId));

      expect(typeormRepository.softDelete).toHaveBeenCalledWith(Number(userId));
    });
  });
});
