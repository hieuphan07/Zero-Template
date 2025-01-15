import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { SortDirection } from '../enum/sort-direction';

export class SearchDto {
  @ApiProperty({ description: 'Page number', required: false, example: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({ description: 'Limit', required: false, example: 10 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  limit: number;

  @ApiProperty({
    description: 'Search fields: username, email, phoneNumber',
    required: false,
    example: 'username,email',
  })
  @IsOptional()
  @IsString()
  searchFields?: string;

  @ApiProperty({ description: 'Search value', required: false, example: 'John Doe' })
  @IsOptional()
  @IsString()
  searchValue?: string;

  @ApiProperty({
    description: 'Sort by: createdAt, updatedAt, id, username, email, phoneNumber, lastLogin',
    required: false,
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({ description: 'Sort direction', required: false, example: 'ASC' })
  @IsOptional()
  @IsString()
  sortDirection?: SortDirection;
}
