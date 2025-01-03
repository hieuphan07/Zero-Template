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

  describe('update', () => {
    const existingUserOrmEntity = new UserOrmEntity();
    existingUserOrmEntity.id = 1;
    existingUserOrmEntity.username = 'oldname';
    existingUserOrmEntity.email = 'old@example.com';
    existingUserOrmEntity.password = 'password123';
    existingUserOrmEntity.phoneNumber = '+1234567890';
    existingUserOrmEntity.updatedAt = new Date();

    const updatedUserOrmEntity = new UserOrmEntity();
    updatedUserOrmEntity.id = 1;
    updatedUserOrmEntity.username = 'newname';
    updatedUserOrmEntity.email = 'new@example.com';
    updatedUserOrmEntity.password = 'newpassword';
    updatedUserOrmEntity.phoneNumber = '+9876543210';
    updatedUserOrmEntity.updatedAt = new Date();

    it('should update user successfully', async () => {
      const initialUpdatedAt = new Date('2025-01-02T09:30:00.000Z');
      const newUpdatedAt = new Date(initialUpdatedAt.getTime() + 1000); // Simulate 1 second later

      const existingUserOrmEntity = new UserOrmEntity();
      existingUserOrmEntity.id = 1;
      existingUserOrmEntity.username = 'oldname';
      existingUserOrmEntity.email = 'old@example.com';
      existingUserOrmEntity.password = 'password123';
      existingUserOrmEntity.phoneNumber = '+1234567890';
      existingUserOrmEntity.updatedAt = initialUpdatedAt;
      existingUserOrmEntity.createdAt = new Date('2025-01-01T12:00:00.000Z');

      const updatedUserOrmEntity = {
        ...existingUserOrmEntity,
        username: 'newname',
        email: 'new@example.com',
        password: 'newpassword',
        phoneNumber: '+9876543210',
        updatedAt: newUpdatedAt, // Simulate update
      };

      const updatedUser = new User('newname', 'new@example.com', 'newpassword', '+9876543210');
      updatedUser.setId(1);

      // Mock findOne to return the existing user
      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(existingUserOrmEntity);

      // Mock save to simulate updating the user
      jest.spyOn(ormRepository, 'save').mockImplementation(async (entity) => {
        return {
          ...entity,
          updatedAt: newUpdatedAt, // Simulate updated timestamp
        } as UserOrmEntity;
      });

      const result = await userRepository.update(1, updatedUser);

      // Validate fields
      expect(result.getId()).toEqual(updatedUser.getId());
      expect(result.getUsername()).toEqual(updatedUser.getUsername());
      expect(result.getEmail()).toEqual(updatedUser.getEmail());
      expect(result.getPhoneNumber()).toEqual(updatedUser.getPhoneNumber());

      // Validate updatedAt timestamp
      expect(result.getUpdatedAt()).toBeDefined();
      expect(result.getUpdatedAt().getTime()).toBeGreaterThan(initialUpdatedAt.getTime());

      // Verify repository methods
      expect(ormRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(ormRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: updatedUserOrmEntity.id,
          username: updatedUserOrmEntity.username,
          email: updatedUserOrmEntity.email,
          password: updatedUserOrmEntity.password,
          phoneNumber: updatedUserOrmEntity.phoneNumber,
        }),
      );
    });

    it('should handle partial updates', async () => {
      const partialUpdate = new User('newname', 'old@example.com', 'password123', '+1234567890');
      const partialUpdateOrmEntity = new UserOrmEntity();
      partialUpdateOrmEntity.id = 1;
      partialUpdateOrmEntity.username = 'newname';
      partialUpdateOrmEntity.email = 'old@example.com';
      partialUpdateOrmEntity.password = 'password123';
      partialUpdateOrmEntity.phoneNumber = '+1234567890';
      partialUpdateOrmEntity.updatedAt = new Date();

      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(existingUserOrmEntity);
      jest.spyOn(ormRepository, 'save').mockResolvedValue(partialUpdateOrmEntity);

      const result = await userRepository.update(1, partialUpdate);

      expect(result.getUsername()).toEqual(partialUpdate.getUsername());
      expect(result.getEmail()).toEqual(partialUpdate.getEmail());
      expect(result.getPassword()).toEqual(partialUpdate.getPassword());

      // Expect the timestamps to be similar, but not exactly the same.
      expect(result.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(existingUserOrmEntity.updatedAt.getTime());

      expect(ormRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(ormRepository.save).toHaveBeenCalledWith(expect.objectContaining(partialUpdateOrmEntity));
    });

    it('should update user with same email (no change in email)', async () => {
      const sameEmailUpdate = new User('newname', 'old@example.com', 'newpassword', '+9876543210');
      const sameEmailUpdateOrmEntity = new UserOrmEntity();
      sameEmailUpdateOrmEntity.id = 1;
      sameEmailUpdateOrmEntity.username = 'newname';
      sameEmailUpdateOrmEntity.email = 'old@example.com';
      sameEmailUpdateOrmEntity.password = 'newpassword';
      sameEmailUpdateOrmEntity.phoneNumber = '+9876543210';
      sameEmailUpdateOrmEntity.updatedAt = new Date();

      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(existingUserOrmEntity);
      jest.spyOn(ormRepository, 'save').mockResolvedValue(sameEmailUpdateOrmEntity);

      const result = await userRepository.update(1, sameEmailUpdate);

      expect(result.getUsername()).toEqual(sameEmailUpdate.getUsername());
      expect(result.getEmail()).toEqual(sameEmailUpdate.getEmail());
      expect(result.getPassword()).toEqual(sameEmailUpdate.getPassword());

      // Expect the timestamps to be similar, but not exactly the same.
      expect(result.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(existingUserOrmEntity.updatedAt.getTime());

      expect(ormRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(ormRepository.save).toHaveBeenCalledWith(expect.objectContaining(sameEmailUpdateOrmEntity));
    });

    it('should update timestamp when user is updated', async () => {
      const beforeUpdate = new Date();
      const updatedUserWithTimestamp = new User('newname', 'new@example.com', 'newpassword', '+9876543210');
      const updatedUserWithTimestampOrmEntity = new UserOrmEntity();
      updatedUserWithTimestampOrmEntity.id = 1;
      updatedUserWithTimestampOrmEntity.username = 'newname';
      updatedUserWithTimestampOrmEntity.email = 'new@example.com';
      updatedUserWithTimestampOrmEntity.password = 'newpassword';
      updatedUserWithTimestampOrmEntity.phoneNumber = '+9876543210';
      updatedUserWithTimestampOrmEntity.updatedAt = new Date();

      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(existingUserOrmEntity);
      jest.spyOn(ormRepository, 'save').mockResolvedValue(updatedUserWithTimestampOrmEntity);

      const result = await userRepository.update(1, updatedUserWithTimestamp);

      // Allow for small variations in the timestamp.
      expect(result.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());

      expect(ormRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(ormRepository.save).toHaveBeenCalledWith(expect.objectContaining(updatedUserWithTimestampOrmEntity));
    });
  });
});
