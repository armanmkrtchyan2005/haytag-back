import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: '12345678' })
  password: string;
}
