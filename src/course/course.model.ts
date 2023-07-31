import { Category } from 'src/category/category.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cadet } from 'src/cadet/cadet.model';

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

  @ApiProperty({ example: 'Course previous price' })
  @Column({ allowNull: false, defaultValue: 0 })
  discountedPrice: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Category)
  @Column({ allowNull: false })
  categoryId: number;

  @ApiProperty({ type: () => Category })
  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({ type: () => [Cadet] })
  @HasMany(() => Cadet)
  cadets: Cadet;
}
