import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class EditAdminDto {
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: '12345678' })
  password: string;
}
