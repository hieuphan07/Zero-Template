import { IsString, IsEmail, Length, Matches, IsOptional, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'JohnDoe',
    minLength: 2,
    maxLength: 150,
  })
  @IsString()
  @Length(2, 150, { message: 'Username must be between 2 and 150 characters' })
  @Matches(/^[a-zA-Z0-9_-]*$/, {
    message: 'Username can only contain letters, numbers, underscores and hyphens',
  })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
    maxLength: 255,
  })
  @Length(5, 255, { message: 'Email must be between 5 and 255 characters' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password@123',
    minLength: 8,
    maxLength: 32,
  })
  @IsString()
  @Length(8, 32, { message: 'Password must be between 8 and 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+84903567890',
    required: false,
    minLength: 10,
    maxLength: 15,
  })
  @IsOptional()
  @IsString()
  @ValidateIf((object, value) => value !== '')
  @Matches(/^\+?[0-9]{10,15}$/, {
    message: 'Please provide a valid phone number',
  })
  phoneNumber?: string | null;
}
