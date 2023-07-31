import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
} from 'class-validator';

export class CreateCadetDto {
  @IsAlpha()
  @ApiProperty({ example: 'Arman' })
  name: string;

  @IsAlpha()
  @ApiProperty({ example: 'Mkrtchyan' })
  surname: string;

  @IsEmail()
  @ApiProperty({ example: 'armanmkrtchyan440@gmail.com' })
  email: string;

  @IsPhoneNumber()
  @ApiProperty({ example: '+3755970980' })
  tel: string;

  @IsBoolean()
  @ApiProperty({ example: false })
  isOnline: boolean;

  @IsBoolean()
  @ApiProperty({ example: false })
  isdIndividual: boolean;

  @IsNumber()
  @ApiProperty({ example: 1 })
  courseId: number;
}
