import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user-management/application/use-cases/create-user.use-case';
import { IUserRepository } from 'src/modules/user-management/domain/repositories/user-repository.interface';
import { User } from 'src/modules/user-management/domain/entities/user.entity';
import { IPasswordHash } from 'src/shared/utils/password/password-hash.interface';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: IUserRepository;
  let passwordService: IPasswordHash;

  const mockCreateUserDto = {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    phoneNumber: '+1234567890',
  };

  const mockUser = new User(
    mockCreateUserDto.username,
    mockCreateUserDto.email,
    'hashedPassword',
    mockCreateUserDto.phoneNumber,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'IUserRepository',
          useValue: {
            exists: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: 'IPasswordHash',
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<IUserRepository>('IUserRepository');
    passwordService = module.get<IPasswordHash>('IPasswordHash');
  });

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined();
  });

  it('should create a user successfully', async () => {
    jest.spyOn(userRepository, 'exists').mockResolvedValue({
      email: false,
      username: false,
      phoneNumber: false,
    });
    jest.spyOn(passwordService, 'hash').mockResolvedValue('hashedPassword');
    jest.spyOn(userRepository, 'create').mockResolvedValue(mockUser);

    const result = await createUserUseCase.execute(mockCreateUserDto);

    expect(userRepository.exists).toHaveBeenCalledWith(
      mockCreateUserDto.email,
      mockCreateUserDto.username,
      mockCreateUserDto.phoneNumber,
    );
    expect(passwordService.hash).toHaveBeenCalledWith(mockCreateUserDto.password);
    expect(userRepository.create).toHaveBeenCalledWith(expect.any(User));
    expect(result).toEqual(mockUser);
  });

  it('should throw ConflictException when email already exists', async () => {
    jest.spyOn(userRepository, 'exists').mockResolvedValue({
      email: true,
      username: false,
      phoneNumber: false,
    });

    await expect(createUserUseCase.execute(mockCreateUserDto)).rejects.toThrow(
      new ConflictException('Email already exists'),
    );
  });

  it('should throw ConflictException when username already exists', async () => {
    jest.spyOn(userRepository, 'exists').mockResolvedValue({
      email: false,
      username: true,
      phoneNumber: false,
    });

    await expect(createUserUseCase.execute(mockCreateUserDto)).rejects.toThrow(
      new ConflictException('Username already exists'),
    );
  });

  it('should throw ConflictException when phone number already exists', async () => {
    jest.spyOn(userRepository, 'exists').mockResolvedValue({
      email: false,
      username: false,
      phoneNumber: true,
    });

    await expect(createUserUseCase.execute(mockCreateUserDto)).rejects.toThrow(
      new ConflictException('Phone number already exists'),
    );
  });
});
