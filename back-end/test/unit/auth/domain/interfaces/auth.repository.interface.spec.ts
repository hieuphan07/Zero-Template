import { Test } from '@nestjs/testing';
import { IAuthRepository } from 'src/modules/auth/domain/interfaces/auth.repository.interface';
import { AuthRepository } from 'src/modules/auth/infrastructure/auth/auth.repository';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { UserOrmEntity } from 'src/modules/user-management/infrastructure/orm/user.entity.orm';

describe('AuthRepository Interface', () => {
  let repository: IAuthRepository;

  const mockUser = new User('test-uuid-123', 'test@example.com', 'testuser', 'hashedPassword123');

  const mockUserOrm: UserOrmEntity = {
    id: 1,
    uuid: 'test-uuid-123',
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedPassword123',
    phoneNumber: '+1234567890',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: AuthRepository,
          useValue: {
            findUserByUsername: jest.fn(),
            createUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<AuthRepository>(AuthRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findUserByUsername', () => {
    it('should be defined', () => {
      expect(repository.findUserByUsername).toBeDefined();
    });

    it('should accept username parameter', async () => {
      const username = 'testuser';
      jest.spyOn(repository, 'findUserByUsername').mockResolvedValue(mockUserOrm);

      await repository.findUserByUsername(username);

      expect(repository.findUserByUsername).toHaveBeenCalledWith(username);
    });

    it('should return Promise<UserOrmEntity | null>', async () => {
      jest.spyOn(repository, 'findUserByUsername').mockResolvedValue(mockUserOrm);

      const result = await repository.findUserByUsername('testuser');

      expect(result).toEqual(mockUserOrm);
      expect(result).toBeInstanceOf(Object);
    });

    it('should return null when user not found', async () => {
      jest.spyOn(repository, 'findUserByUsername').mockResolvedValue(null);

      const result = await repository.findUserByUsername('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should be defined', () => {
      expect(repository.createUser).toBeDefined();
    });

    it('should accept user parameter', async () => {
      jest.spyOn(repository, 'createUser').mockResolvedValue(mockUser);

      await repository.createUser(mockUser);

      expect(repository.createUser).toHaveBeenCalledWith(mockUser);
    });

    it('should return Promise<User>', async () => {
      jest.spyOn(repository, 'createUser').mockResolvedValue(mockUser);

      const result = await repository.createUser(mockUser);

      expect(result).toEqual(mockUser);
      expect(result).toBeInstanceOf(Object);
    });
  });

  describe('login', () => {
    it('should be defined', () => {
      expect(repository.login).toBeDefined();
    });

    it('should accept username and password parameters', async () => {
      const username = 'testuser';
      const password = 'password123';
      jest.spyOn(repository, 'login').mockResolvedValue(mockUser);

      await repository.login(username, password);

      expect(repository.login).toHaveBeenCalledWith(username, password);
    });

    it('should return Promise<User>', async () => {
      jest.spyOn(repository, 'login').mockResolvedValue(mockUser);

      const result = await repository.login('testuser', 'password123');

      expect(result).toEqual(mockUser);
      expect(result).toBeInstanceOf(Object);
    });
  });

  describe('Method parameter types', () => {
    it('findUserByUsername should accept string parameter', () => {
      expect(() => repository.findUserByUsername('testuser')).not.toThrow();
    });

    it('createUser should accept User object parameter', () => {
      expect(() => repository.createUser(mockUser)).not.toThrow();
    });

    it('login should accept string parameters', () => {
      expect(() => repository.login('testuser', 'password123')).not.toThrow();
    });
  });
});
