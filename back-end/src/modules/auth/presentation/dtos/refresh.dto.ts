import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @IsString()
  @ApiProperty({
    description: 'The refresh token to get new access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;
}

export class RefreshResponseDto {
  payload: {
    refreshToken: string;
    accessToken: string;
  };
}
