import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
} from 'class-validator';

export class CreateCadetDto {
  @IsNotEmpty()
  @IsAlpha()
  @ApiProperty({ example: 'Arman' })
  name: string;

  @IsNotEmpty()
  @IsAlpha()
  @ApiProperty({ example: 'Mkrtchyan' })
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'armanmkrtchyan440@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ example: '+3755970980' })
  tel: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: false })
  isOnline: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: false })
  isdIndividual: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  courseId: number;
}
