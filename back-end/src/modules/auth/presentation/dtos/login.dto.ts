import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'The username of the user', example: 'JohnDoe' })
  username: string;

  @IsString()
  @ApiProperty({ description: 'The password of the user', example: 'Password@123' })
  password: string;
}

export class LoginResponseDto {
  payload: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      username: string;
    };
  };
}

export class CurrentUserResponseDto {
  payload: {
    id: string;
    username: string;
  };
}
