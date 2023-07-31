import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from '../course/course.model';

interface ICadet {
  name: string;
  surname: string;
  email: string;
  tel: string;
  isOnline: boolean;
  isdIndividual: boolean;
  courseId: number;
}

@Table({
  tableName: 'cadets',
  timestamps: true,
})
export class Cadet extends Model<Cadet, ICadet> {
  @ApiProperty({ example: 1 })
  @Column({
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Cadet name' })
  @Column({
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'Cadet surname' })
  @Column({
    allowNull: false,
  })
  surname: string;

  @ApiProperty({ example: 'Cadet email' })
  @Column({
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'Cadet phone number' })
  @Column({
    allowNull: false,
  })
  tel: string;

  @ApiProperty({ example: 'Online or offline' })
  @Column({
    allowNull: false,
  })
  isOnline: boolean;

  @ApiProperty({ example: 'Individual or group' })
  @Column({
    allowNull: false,
  })
  isdIndividual: boolean;

  @ApiProperty({ example: 'Cadet course id' })
  @ForeignKey(() => Course)
  @Column({
    allowNull: false,
  })
  courseId: number;

  @ApiProperty({
    type: () => Course,
  })
  @BelongsTo(() => Course)
  course: Course;
}
