import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Js course' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'This course for js' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  @ApiProperty({ example: 45000 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  categoryId: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  img: any;
}
