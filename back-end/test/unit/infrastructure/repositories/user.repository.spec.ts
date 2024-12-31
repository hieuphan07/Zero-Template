import { Test } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { UserRepository } from '../../../../src/modules/user-management/infrastructure/repositories/user.repository';
import { User } from '../../../../src/modules/user-management/domain/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let typeormRepository: Repository<User>;
  let dataSource: DataSource;

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
