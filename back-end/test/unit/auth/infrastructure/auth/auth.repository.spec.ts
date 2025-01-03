import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { IAuthRepository } from 'src/modules/auth/domain/interfaces/auth.repository.interface';
describe('AuthRepository', () => {
  let moduleRef: TestingModule;
  let authRepository: IAuthRepository;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: 'IAuthRepository',
          useValue: {
            login: jest.fn(),
            logout: jest.fn(),
            refreshToken: jest.fn(),
            validateToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authRepository = moduleRef.get<IAuthRepository>('IAuthRepository');
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      const expectedToken = { accessToken: 'token123', refreshToken: 'refresh123' };

      jest.spyOn(authRepository, 'login').mockResolvedValue(expectedToken as any);

      const result = await authRepository.login(JSON.stringify(credentials), undefined);

      expect(result).toBe(expectedToken);
      expect(authRepository.login).toHaveBeenCalledWith(JSON.stringify(credentials), undefined);
    });

    it('should throw NotFoundException when user not found', async () => {
      const credentials = { email: 'nonexistent@example.com', password: 'password123' };

      jest.spyOn(authRepository, 'login').mockRejectedValue(new NotFoundException('User not found'));

      await expect(authRepository.login(JSON.stringify(credentials), undefined)).rejects.toThrow(NotFoundException);
    });
  });
});
