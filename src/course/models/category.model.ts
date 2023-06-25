import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Course } from './course.model';

interface ICategory {
  value: string;
}

@Table({
  tableName: 'categories',
})
export class Category extends Model<Category, ICategory> {
  @ApiProperty({ example: 1 })
  @Column({
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Web - Front-end' })
  @Column({ allowNull: false })
  value: string;

  @HasMany(() => Course)
  courses: Course[];
}
