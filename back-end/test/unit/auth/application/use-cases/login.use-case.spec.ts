import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from 'src/modules/auth/application/use-cases/login.use-case';
import { LoginDto } from 'src/modules/auth/presentation/dtos/login.dto';
import { User } from 'src/modules/user-management/domain/entities/user.entity';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let authRepository: any;
  let jwtService: JwtService;
  let passwordService: any;

  const mockUser = new User('testuser', 'email@test.com', 'hashedPassword');
  mockUser.setId(1);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: 'IAuthRepository',
          useValue: {
            login: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: 'IPasswordHash',
          useValue: {
            compare: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
    authRepository = module.get('IAuthRepository');
    jwtService = module.get(JwtService) as jest.Mocked<JwtService>;
    passwordService = module.get('IPasswordHash');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    const loginDto: LoginDto = {
      username: 'testuser',
      password: 'password123',
    };

    it('should successfully login and return access token', async () => {
      authRepository.login.mockResolvedValue(mockUser);
      passwordService.compare.mockResolvedValue(true);
      (jwtService.sign as jest.Mock).mockReturnValue('mock-jwt-token');
      const result = await useCase.execute(loginDto);

      expect(result).toEqual({
        accessToken: 'mock-jwt-token',
        user: {
          id: '1',
          username: 'testuser',
        },
      });
      expect(authRepository.login).toHaveBeenCalledWith(loginDto.username);
      expect(passwordService.compare).toHaveBeenCalledWith(loginDto.password, mockUser.getPassword());
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: mockUser.getUsername(),
        sub: mockUser.getId(),
      });
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      authRepository.login.mockResolvedValue(null);

      await expect(useCase.execute(loginDto)).rejects.toThrow(new UnauthorizedException('Invalid username'));
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      authRepository.login.mockResolvedValue(mockUser);
      passwordService.compare.mockResolvedValue(false);

      await expect(useCase.execute(loginDto)).rejects.toThrow(new UnauthorizedException('Invalid password'));
    });
  });
});
