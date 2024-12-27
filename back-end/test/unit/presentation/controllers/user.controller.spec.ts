import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../../src/modules/user-management/presentation/controllers/user.controller';
import { DeleteUserUseCase } from '../../../../src/modules/user-management/application/use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from '../../../../src/modules/user-management/application/use-cases/get-user.use-case';

describe('UserController', () => {
  let controller: UserController;
  let deleteUserUseCase: DeleteUserUseCase;
  let getUserUseCase: GetUserByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: DeleteUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetUserByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    getUserUseCase = module.get<GetUserByIdUseCase>(GetUserByIdUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      const userId = 1;
      const expectedResult = {
        success: true,
        message: 'Xóa người dùng thành công',
        deletedId: userId,
      };

      jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue(expectedResult);

      const result = await controller.deleteUser(userId);

      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getUser', () => {
    it('should get a user successfully', async () => {
      const userId = 1;
      const expectedResult = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
      };

      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(expectedResult as any);

      const result = await controller.getUser(userId);

      expect(getUserUseCase.execute).toHaveBeenCalledWith(userId.toString());
      expect(result).toEqual(expectedResult);
    });
  });
});
