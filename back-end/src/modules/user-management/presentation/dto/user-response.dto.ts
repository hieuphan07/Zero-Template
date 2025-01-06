import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'JohnDoe',
  })
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '1234567890',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'The date and time the user was last logged in',
    example: '2021-01-01T00:00:00Z',
  })
  lastLogin: string;

  @ApiProperty({
    description: 'The date and time the user was created',
    example: '2021-01-01T00:00:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'The date and time the user was last updated',
    example: '2021-01-01T00:00:00Z',
  })
  updatedAt: string;
}
