import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './presentation/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../user-management/infrastructure/orm/user.entity.orm';
import { AuthRepository } from './infrastructure/auth/auth.repository';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserOrmEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: 'IAuthRepository',
      useClass: AuthRepository,
    },
    LoginUseCase,
    RegisterUserUseCase,
  ],
})
export class AuthModule {}
