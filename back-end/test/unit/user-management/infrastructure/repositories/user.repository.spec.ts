import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../../../src/modules/user-management/infrastructure/repositories/user.repository';
import { UserOrmEntity } from '../../../../../src/modules/user-management/infrastructure/orm/user.entity.orm';
import { User } from '../../../../../src/modules/user-management/domain/entities/user.entity';
import { Like } from 'typeorm';
import { SortDirection } from 'src/shared/enum/sort-direction';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let ormRepository: Repository<UserOrmEntity>;

  const mockUser = new User('testuser', 'test@example.com', 'hashedpassword', '1234567890');

  const mockOrmUser = new UserOrmEntity();
  mockOrmUser.username = 'testuser';
  mockOrmUser.email = 'test@example.com';
  mockOrmUser.password = 'hashedpassword';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserOrmEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    ormRepository = module.get<Repository<UserOrmEntity>>(getRepositoryToken(UserOrmEntity));
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      jest.spyOn(ormRepository, 'save').mockResolvedValue(mockOrmUser);

      const result = await userRepository.create(mockUser);

      expect(result).toBeDefined();
      expect(result.getId()).toBe(mockUser.getId());
      expect(result.getUsername()).toBe(mockUser.getUsername());
    });

    it('should throw ConflictException when duplicate entry', async () => {
      jest.spyOn(ormRepository, 'save').mockRejectedValue({ code: 'ER_DUP_ENTRY' });

      await expect(userRepository.create(mockUser)).rejects.toThrow(ConflictException);
    });
  });

  describe('findById', () => {
    it('should successfully find a user by id', async () => {
      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(mockOrmUser);

      const result = await userRepository.findById(1);
      expect(result).toBeDefined();
      expect(result.getId()).toBe(mockUser.getId());
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(null);

      await expect(userRepository.findById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should successfully delete a user', async () => {
      jest.spyOn(ormRepository, 'delete').mockResolvedValue({ raw: [], affected: 1 });

      await expect(userRepository.delete(1)).resolves.not.toThrow();
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(ormRepository, 'delete').mockResolvedValue({ raw: [], affected: 0 });

      await expect(userRepository.delete(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDelete', () => {
    it('should successfully soft delete a user', async () => {
      jest.spyOn(ormRepository, 'update').mockResolvedValue({ raw: [], affected: 1, generatedMaps: [] });

      await expect(userRepository.softDelete(1)).resolves.not.toThrow();
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(ormRepository, 'update').mockResolvedValue({ raw: [], affected: 0, generatedMaps: [] });

      await expect(userRepository.softDelete(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('restore', () => {
    it('should successfully restore a deleted user', async () => {
      jest.spyOn(ormRepository, 'update').mockResolvedValue({ raw: [], affected: 1, generatedMaps: [] });

      await expect(userRepository.restore(1)).resolves.not.toThrow();
    });

    it('should throw NotFoundException when deleted user not found', async () => {
      jest.spyOn(ormRepository, 'update').mockResolvedValue({ raw: [], affected: 0, generatedMaps: [] });

      await expect(userRepository.restore(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updatedUser = new User('updateduser', 'updated@example.com', 'hashedpassword', '9876543210');

    const mockUpdatedOrmUser = new UserOrmEntity();
    mockUpdatedOrmUser.id = 1;
    mockUpdatedOrmUser.username = updatedUser.getUsername();
    mockUpdatedOrmUser.email = updatedUser.getEmail();
    mockUpdatedOrmUser.phoneNumber = updatedUser.getPhoneNumber();
    mockUpdatedOrmUser.updatedAt = new Date();

    it('should successfully update a user', async () => {
      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(mockOrmUser);
      jest.spyOn(ormRepository, 'save').mockResolvedValue(mockUpdatedOrmUser);

      const result = await userRepository.update(1, updatedUser);

      expect(result).toBeDefined();
      expect(result.getUsername()).toBe(updatedUser.getUsername());
      expect(result.getEmail()).toBe(updatedUser.getEmail());
      expect(result.getPhoneNumber()).toBe(updatedUser.getPhoneNumber());
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(null);

      await expect(userRepository.update(999, updatedUser)).rejects.toThrow(NotFoundException);
    });

    it('should throw Error when save operation fails', async () => {
      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(mockOrmUser);
      jest.spyOn(ormRepository, 'save').mockRejectedValue(new Error('Database error'));

      await expect(userRepository.update(1, updatedUser)).rejects.toThrow('Failed to update user: Database error');
    });

    it('should update only provided fields', async () => {
      const partialUser = new User(
        'newusername',
        mockUser.getEmail(),
        mockUser.getPassword(),
        mockUser.getPhoneNumber(),
      );

      const mockPartialOrmUser = new UserOrmEntity();
      Object.assign(mockPartialOrmUser, mockOrmUser);
      mockPartialOrmUser.username = partialUser.getUsername();

      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(mockOrmUser);
      jest.spyOn(ormRepository, 'save').mockResolvedValue(mockPartialOrmUser);

      const result = await userRepository.update(1, partialUser);

      expect(result).toBeDefined();
      expect(result.getUsername()).toBe(partialUser.getUsername());
      expect(result.getEmail()).toBe(mockUser.getEmail());
    });

    it('should set updatedAt timestamp when updating', async () => {
      const beforeUpdate = new Date();
      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(mockOrmUser);
      jest.spyOn(ormRepository, 'save').mockImplementation(async (data) => {
        const savedData = data as UserOrmEntity;
        expect(savedData.updatedAt).toBeDefined();
        // Compare timestamps as numbers
        const updatedAtTime = savedData.updatedAt instanceof Date ? savedData.updatedAt.getTime() : savedData.updatedAt;
        expect(updatedAtTime).toBeGreaterThanOrEqual(beforeUpdate.getTime());
        return mockUpdatedOrmUser;
      });

      await userRepository.update(1, updatedUser);
    });
  });

  describe('findAll', () => {
    const mockUsers = [
      { id: 1, username: 'user1', email: 'user1@example.com', phoneNumber: '1234567890' },
      { id: 2, username: 'user2', email: 'user2@example.com', phoneNumber: '0987654321' },
    ].map((u) => Object.assign(new UserOrmEntity(), u));

    // Define sortDirection as a type-safe literal to match the expected type
    // Without 'as const', sortDirection would be inferred as string
    // With 'as const', TypeScript knows it can only be 'ASC' or 'DESC'
    const defaultQuery = {
      page: 1,
      limit: 10,
      searchFields: [],
      searchValue: '',
      sortBy: 'createdAt',
      sortDirection: SortDirection.DESC, // Ensures type safety for sort direction
    };

    it('should return paginated results', async () => {
      jest.spyOn(ormRepository, 'findAndCount').mockResolvedValue([mockUsers, 2]);

      const result = await userRepository.findAll(defaultQuery);

      expect(result.data).toBeDefined();
      expect(result.meta).toEqual({
        total: 2,
        page: 1,
        lastPage: 1,
      });
      expect(ormRepository.findAndCount).toHaveBeenCalledWith({
        where: {},
        skip: 0,
        take: 10,
        order: { createdAt: 'DESC' },
      });
    });

    it('should handle search with specific fields', async () => {
      const searchQuery = {
        ...defaultQuery,
        searchFields: ['username', 'email'],
        searchValue: 'test',
      };

      jest.spyOn(ormRepository, 'findAndCount').mockResolvedValue([mockUsers, 2]);

      await userRepository.findAll(searchQuery);

      expect(ormRepository.findAndCount).toHaveBeenCalledWith({
        where: [{ username: Like('%test%') }, { email: Like('%test%') }],
        skip: 0,
        take: 10,
        order: { createdAt: 'DESC' },
      });
    });

    it('should throw BadRequestException for invalid search fields', async () => {
      const invalidQuery = {
        ...defaultQuery,
        searchFields: ['invalidField'],
        searchValue: 'test',
      };

      await expect(userRepository.findAll(invalidQuery)).rejects.toThrow('Invalid search fields: invalidField');
    });

    it('should throw BadRequestException for invalid sort field', async () => {
      const invalidSortQuery = {
        ...defaultQuery,
        sortBy: 'invalidField',
      };

      await expect(userRepository.findAll(invalidSortQuery)).rejects.toThrow('Invalid sort field');
    });

    it('should handle custom pagination values', async () => {
      const paginationQuery = {
        ...defaultQuery,
        page: 2,
        limit: 5,
      };

      jest.spyOn(ormRepository, 'findAndCount').mockResolvedValue([mockUsers, 7]);

      const result = await userRepository.findAll(paginationQuery);

      expect(result.meta).toEqual({
        total: 7,
        page: 2,
        lastPage: 2,
      });
      expect(ormRepository.findAndCount).toHaveBeenCalledWith({
        where: {},
        skip: 5,
        take: 5,
        order: { createdAt: 'DESC' },
      });
    });
  });
});
