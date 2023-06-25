import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;
}
