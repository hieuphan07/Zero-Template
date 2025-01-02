import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../../../src/modules/user-management/infrastructure/repositories/user.repository';
import { UserOrmEntity } from '../../../../../src/modules/user-management/infrastructure/orm/user.entity.orm';
import { User } from '../../../../../src/modules/user-management/domain/entities/user.entity';

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
});
