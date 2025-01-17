import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'The username of the user', example: 'JohnDoe' })
  username: string;

  @IsString()
  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  password: string;
}

export class LoginResponseDto {
  accessToken: string;
  user: {
    id: string;
    username: string;
  };
}
