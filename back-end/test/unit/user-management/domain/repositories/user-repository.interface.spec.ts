import { Test } from '@nestjs/testing';
import { IUserRepository } from '../../../../../src/modules/user-management/domain/repositories/user-repository.interface';
import { User } from '../../../../../src/modules/user-management/domain/entities/user.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('IUserRepository', () => {
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: 'IUserRepository',
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
            softDelete: jest.fn(),
            restore: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = moduleRef.get<IUserRepository>('IUserRepository');
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const user = new User('testuser', 'test@example.com', 'password123');
      jest.spyOn(userRepository, 'create').mockResolvedValue(user);

      const result = await userRepository.create(user);

      expect(result).toBe(user);
      expect(userRepository.create).toHaveBeenCalledWith(user);
    });

    it('should throw ConflictException when user with email already exists', async () => {
      const user = new User('testuser', 'test@example.com', 'password123');
      jest
        .spyOn(userRepository, 'create')
        .mockRejectedValue(new ConflictException('User with this email already exists'));

      await expect(userRepository.create(user)).rejects.toThrow(ConflictException);
    });
  });

  describe('findById', () => {
    it('should find user by id successfully', async () => {
      const user = new User('testuser', 'test@example.com', 'password123');
      jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

      const result = await userRepository.findById(1);

      expect(result).toBe(user);
      expect(userRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(userRepository, 'findById').mockRejectedValue(new NotFoundException('User not found'));

      await expect(userRepository.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete user successfully', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

      await userRepository.delete(1);

      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when user to delete not found', async () => {
      jest.spyOn(userRepository, 'delete').mockRejectedValue(new NotFoundException('User not found'));

      await expect(userRepository.delete(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDelete', () => {
    it('should soft delete user successfully', async () => {
      jest.spyOn(userRepository, 'softDelete').mockResolvedValue(undefined);

      await userRepository.softDelete(1);

      expect(userRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when user to soft delete not found', async () => {
      jest.spyOn(userRepository, 'softDelete').mockRejectedValue(new NotFoundException('User not found'));

      await expect(userRepository.softDelete(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('restore', () => {
    it('should restore deleted user successfully', async () => {
      jest.spyOn(userRepository, 'restore').mockResolvedValue(undefined);

      await userRepository.restore(1);

      expect(userRepository.restore).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when deleted user to restore not found', async () => {
      jest.spyOn(userRepository, 'restore').mockRejectedValue(new NotFoundException('Deleted user not found'));

      await expect(userRepository.restore(1)).rejects.toThrow(NotFoundException);
    });
  });
});
