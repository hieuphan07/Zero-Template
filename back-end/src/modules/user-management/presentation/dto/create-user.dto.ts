import { IsString, IsEmail, Length, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @Length(2, 150, { message: 'Username must be between 2 and 150 characters' })
  @Matches(/^[a-zA-Z0-9_-]*$/, {
    message: 'Username can only contain letters, numbers, underscores and hyphens',
  })
  @ApiProperty({
    description: 'The username of the user',
    example: 'JohnDoe',
    minLength: 2,
    maxLength: 150,
  })
  username: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Length(5, 255, { message: 'Email must be between 5 and 255 characters' })
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
    maxLength: 255,
  })
  email: string;

  @IsString()
  @Length(8, 32, { message: 'Password must be between 8 and 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  @ApiProperty({
    description: 'The password of the user',
    example: 'Password@123',
    minLength: 8,
    maxLength: 32,
  })
  password: string;

  @IsOptional()
  @IsString()
  @Length(10, 15, { message: 'Phone number must be between 10 and 15 characters' })
  @Matches(/^\+?[1-9][0-9\s-]{8,13}[0-9]$/, {
    message: 'Please provide a valid phone number',
  })
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+84903567890',
    required: false,
    minLength: 10,
    maxLength: 15,
  })
  phoneNumber?: string;
}
