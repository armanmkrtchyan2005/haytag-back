import { ApiProperty } from '@nestjs/swagger';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Course } from '../course/course.model';

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

  @ApiProperty({ example: 'Category name' })
  @Column({ allowNull: false })
  value: string;

  @ApiProperty({ isArray: true })
  @HasMany(() => Course)
  courses: Course;
}
