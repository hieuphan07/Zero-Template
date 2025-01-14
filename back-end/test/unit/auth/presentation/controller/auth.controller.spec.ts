import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { AuthController } from 'src/modules/auth/presentation/controllers/auth.controller';
import { LoginUseCase } from 'src/modules/auth/application/use-cases/login.use-case';
import { RegisterUserUseCase } from 'src/modules/auth/application/use-cases/register-user.use-case';
import { LoginDto, LoginResponseDto } from 'src/modules/auth/presentation/dtos/login.dto';
import { RegisterDto } from 'src/modules/auth/presentation/dtos/register.dto';
import { User } from 'src/modules/user-management/domain/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let loginUseCase: LoginUseCase;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: LoginUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: RegisterUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto: RegisterDto = {
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com',
      };
      const expectedUser = new User('testuser', 'test@example.com', 'password123');

      jest.spyOn(registerUserUseCase, 'execute').mockResolvedValue(expectedUser);

      const result = await controller.register(registerDto);

      expect(result).toBe(expectedUser);
      expect(registerUserUseCase.execute).toHaveBeenCalledWith(registerDto);
    });

    it('should throw ConflictException when user already exists', async () => {
      const registerDto: RegisterDto = {
        username: 'existinguser',
        password: 'password123',
        email: 'existing@example.com',
      };

      jest.spyOn(registerUserUseCase, 'execute').mockRejectedValue(new ConflictException('User already exists'));

      await expect(controller.register(registerDto)).rejects.toThrow(ConflictException);
      await expect(controller.register(registerDto)).rejects.toThrow(new ConflictException('User already exists'));
    });

    it('should throw BadRequestException for invalid data', async () => {
      const registerDto: RegisterDto = {
        username: '',
        password: 'short',
        email: 'invalid-email', // Email không hợp lệ
      };

      // Mô phỏng rằng use case sẽ ném ra BadRequestException do email không hợp lệ
      jest.spyOn(registerUserUseCase, 'execute').mockRejectedValue(new BadRequestException('Invalid email format'));

      // Mong đợi controller ném ra ngoại lệ đúng
      await expect(controller.register(registerDto)).rejects.toThrow(BadRequestException);
      await expect(controller.register(registerDto)).rejects.toThrow('Invalid email format');
    });
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'password123',
      };
      const expectedResponse: LoginResponseDto = {
        payload: {
          accessToken: 'test-token',
          refreshToken: 'test-refresh-token',
          user: {
            id: 'test-id',
            username: 'testuser',
          },
        },
      };

      jest.spyOn(loginUseCase, 'execute').mockResolvedValue(expectedResponse);

      const result = await controller.login(loginDto);

      expect(result).toBe(expectedResponse);
      expect(loginUseCase.execute).toHaveBeenCalledWith(loginDto, false);
    });
  });
});
