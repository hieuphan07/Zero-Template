import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthRepository } from '../../domain/interfaces/auth.repository.interface';
import { LoginDto, LoginResponseDto } from '../../presentation/dtos/login.dto';
import { IPasswordHash } from 'src/shared/utils/password/password-hash.interface';
import { RefreshResponseDto } from '../../presentation/dtos/refresh.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    @Inject('IPasswordHash')
    private readonly passwordService: IPasswordHash,
  ) {}

  async execute(loginDto: LoginDto, rememberMe: boolean): Promise<LoginResponseDto> {
    const user = await this.authRepository.login(loginDto.username);

    if (!user) {
      throw new UnauthorizedException('common:auth.invalid-credentials');
    }

    const isValidPassword = await this.passwordService.compare(loginDto.password, user.getPassword());
    if (!isValidPassword) {
      throw new UnauthorizedException('common:auth.invalid-credentials');
    }
    const payload = { username: user.getUsername(), sub: user.getId() };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: rememberMe ? process.env.ACCESS_TOKEN_EXPIRATION_TIME_2 : process.env.ACCESS_TOKEN_EXPIRATION_TIME_1,
    });

    let refreshToken = null;
    if (rememberMe) {
      refreshToken = this.jwtService.sign(payload, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME });
      // Save refresh token to database
      await this.authRepository.saveRefreshToken(user.getId().toString(), refreshToken);
    }

    return {
      payload: {
        accessToken,
        refreshToken,
        user: {
          id: user.getId().toString(),
          username: user.getUsername(),
        },
      },
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<RefreshResponseDto> {
    const user = await this.authRepository.refreshAccessToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return {
      payload: {
        refreshToken,
        accessToken: this.jwtService.sign(
          { username: user, sub: user },
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME_2 },
        ),
      },
    };
  }
}
