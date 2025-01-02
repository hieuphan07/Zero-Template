import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'The username of the user', example: 'JohnDoe' })
  username: string;

  @IsEmail()
  @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  password: string;

  @IsString()
  @ApiProperty({ description: 'The phone number of the user', example: '+1234567890' })
  phoneNumber?: string;
}
