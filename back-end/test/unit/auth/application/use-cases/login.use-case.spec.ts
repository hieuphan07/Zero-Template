import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from '../../../../../src/modules/auth/application/use-cases/login.use-case';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../../../../../src/modules/user-management/domain/entities/user.entity';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let authRepository: any;
  let jwtService: JwtService;

  const mockAuthRepository = {
    login: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: 'IAuthRepository',
          useValue: mockAuthRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
    authRepository = module.get('IAuthRepository');
    jwtService = module.get<JwtService>(JwtService);
  });

  // Add a simple test to verify the setup
  it('should be defined', () => {
    expect(loginUseCase).toBeDefined();
  });

  describe('execute', () => {
    const loginDto = {
      username: 'test2',
      password: 'test@123',
    };

    const mockUser = new User('test2', 'test2@gmail.com', 'test@123');
    mockUser.getId = jest.fn().mockReturnValue('123'); // Mock getId() to return a valid ID
    mockUser.getUsername = jest.fn().mockReturnValue('test2'); // Mock getUsername()

    it('should successfully login and return access token', async () => {
      mockAuthRepository.login.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await loginUseCase.execute(loginDto);

      expect(authRepository.login).toHaveBeenCalledWith(loginDto.username, loginDto.password);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.getId(),
        username: mockUser.getUsername(),
      });
      expect(result).toEqual({
        accessToken: 'mock-jwt-token',
        user: {
          id: mockUser.getId().toString(),
          username: mockUser.getUsername(),
        },
      });
    });

    it('should throw UnauthorizedException when login fails', async () => {
      const loginDto = { username: 'test2', password: 'test@123' };
      authRepository.login = jest.fn().mockResolvedValue(null); // Mô phỏng đăng nhập thất bại
      jwtService.sign = jest.fn();

      await expect(loginUseCase.execute(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(authRepository.login).toHaveBeenCalledWith(loginDto.username, loginDto.password);
      expect(jwtService.sign).not.toHaveBeenCalled(); // Đảm bảo JWT sign không được gọi
    });
  });
});
