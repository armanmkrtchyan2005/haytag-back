import { Category } from 'src/course/models/category.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';



interface ICourse {
  name: string;
  description: string;
  img: string;
  price: number;
  category: string;
}

@Table({
  tableName: 'courses',
})
export class Course extends Model<Course, ICourse> {
  @ApiProperty({ example: 1 })
  @Column({
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Course name' })
  @Column({ allowNull: false })
  name: string;

  @ApiProperty({ example: 'Description for course' })
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @ApiProperty({ example: 'Image file link' })
  @Column({ allowNull: false })
  img: string;

  @ApiProperty({ example: 'Course price' })
  @Column({ allowNull: false })
  price: number;

  @ApiProperty({example: 1})
  @ForeignKey(() => Category)
  @Column({allowNull: false})
  categoryId: number

  @BelongsTo(() => Category)
  category: Category;
}
