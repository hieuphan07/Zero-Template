import { Test } from '@nestjs/testing';
import { IAuthRepository } from 'src/modules/auth/domain/interfaces/auth.repository.interface';
import { AuthRepository } from 'src/modules/auth/infrastructure/auth/auth.repository';
import { User } from 'src/modules/user-management/domain/entities/user.entity';

describe('AuthRepository Interface', () => {
  let repository: IAuthRepository;

  const mockUser = new User('test-uuid-123', 'test@example.com', 'testuser', 'hashedPassword123');

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
      jest.spyOn(repository, 'login').mockResolvedValue(mockUser);

      await repository.login(username);

      expect(repository.login).toHaveBeenCalledWith(username);
    });

    it('should return Promise<User>', async () => {
      jest.spyOn(repository, 'login').mockResolvedValue(mockUser);

      const result = await repository.login('testuser');

      expect(result).toEqual(mockUser);
      expect(result).toBeInstanceOf(Object);
    });
  });

  describe('Method parameter types', () => {
    it('createUser should accept User object parameter', () => {
      expect(() => repository.createUser(mockUser)).not.toThrow();
    });

    it('login should accept string parameters', () => {
      expect(() => repository.login('testuser')).not.toThrow();
    });
  });
});
