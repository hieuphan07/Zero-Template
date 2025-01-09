import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthRepository } from '../../domain/interfaces/auth.repository.interface';
import { LoginDto, LoginResponseDto } from '../../presentation/dtos/login.dto';
import { IPasswordHash } from 'src/shared/utils/password/password-hash.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    @Inject('IPasswordHash')
    private readonly passwordService: IPasswordHash,
  ) {}

  async execute(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.authRepository.login(loginDto.username);

    if (!user) {
      throw new UnauthorizedException('common:auth.invalid-credentials');
    }

    const isValidPassword = await this.passwordService.compare(loginDto.password, user.getPassword());
    if (!isValidPassword) {
      throw new UnauthorizedException('common:auth.invalid-credentials');
    }
    const payload = { username: user.getUsername(), sub: user.getId() };
    const accessToken = this.jwtService.sign(payload);

    return {
      payload: {
        accessToken,
        user: {
          id: user.getId().toString(),
          username: user.getUsername(),
        },
      },
    };
  }
}
