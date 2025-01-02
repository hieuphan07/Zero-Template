import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthRepository } from '../../domain/interfaces/auth.repository.interface';
import { LoginDto, LoginResponseDto } from '../../presentation/dtos/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.authRepository.login(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: user.getUsername(), sub: user.getId() };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.getId().toString(),
        username: user.getUsername(),
      },
    };
  }
}
